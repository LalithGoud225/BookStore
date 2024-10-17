import React, { useState } from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
} from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import api from "../../utils/api";

const StaffLogin = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    // Reset errors and message
    setErrors({ email: "", password: "" });
    setMessage(null);

    // Validation
    let formIsValid = true;
    const updatedErrors = {};

    if (!credentials.email) {
      updatedErrors.email = "Email is required";
      formIsValid = false;
    }

    if (!credentials.password) {
      updatedErrors.password = "Password is required";
      formIsValid = false;
    }

    if (!formIsValid) {
      setErrors(updatedErrors);
      setLoading(false);
      return;
    }

    // Handle login logic here
    try {
      const response = await api.post("/staff/login", credentials);
      const { token, is_password_changed, ...rest } = response?.data;
      login(token, { ...rest });
      setLoading(false);
      if (is_password_changed === "yes") {
        navigate("/staff/books");
      } else {
        navigate("/staff/change-password");
      }
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.status === 401) {
        setMessage({ type: "error", content: "Invalid email or password" });
      } else {
        setMessage({
          type: "error",
          content: "An error occurred. Please try again later.",
        });
      }
    }
  };

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 400 }}>
        <Segment raised style={{ borderRadius: 10 }}>
          <Header as="h2" textAlign="center" style={{ color: "#1b6ec2" }}>
            Staff Login
          </Header>
          {message && <Message negative>{message.content}</Message>}
          <Form size="large" onSubmit={handleSubmit}>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="E-mail address"
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              error={errors.email ? true : false}
              style={{ borderRadius: 5 }}
            />
            {errors.email && (
              <p style={{ color: "red", margin: 0 }}>{errors.email}</p>
            )}

            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              error={errors.password ? true : false}
              style={{ borderRadius: 5 }}
            />
            {errors.password && (
              <p style={{ color: "red", margin: 0 }}>{errors.password}</p>
            )}

            <Button
              color="blue"
              fluid
              size="large"
              type="submit"
              loading={loading}
              style={{
                backgroundColor: "#1b6ec2",
                color: "white",
                borderRadius: 5,
              }}
            >
              Login
            </Button>
          </Form>
          <div>
            Login as Customer <a href="/login">here</a>
          </div>
          <div style={{ marginTop: 10 }}>
            Login as Admin <a href="/admin/login">here</a>
          </div>
          <div>
            Login as Delivery person <a href="/delivery-person/login">here</a>
          </div>
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default StaffLogin;
