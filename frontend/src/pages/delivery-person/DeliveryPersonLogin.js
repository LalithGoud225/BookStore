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
import api from "../../utils/api";
import { primaryObj } from "../../utils/colors";
import { useAuth } from "../../contexts/AuthContext";

const DeliveryPersonLogin = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    // Reset errors
    setErrors({ email: "", password: "" });

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
      const response = await api.post("/delivery-personnel/login", credentials);
      const { token, ...rest } = response?.data;
      login(token, { ...rest });
      // Handle successful login
      setLoading(false);
      navigate("/delivery-person/orders"); // Redirect to delivery dashboard
    } catch (error) {
      setLoading(false);
      console.error("Login error:", error);
      // Display appropriate error message
      setErrors({
        email: "Invalid email or password",
        password: "Invalid email or password",
      });
    }
  };

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 400 }}>
        <Segment raised style={{ borderRadius: 10 }}>
          <Header
            as="h2"
            textAlign="center"
            style={{ color: primaryObj.color }}
          >
            Delivery Person Login
          </Header>
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
              style={{ borderRadius: 10 }}
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
              style={{ borderRadius: 10 }}
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
                borderRadius: 10,
              }}
            >
              Login
            </Button>
          </Form>
          <div style={{ marginTop: 10 }}>
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

export default DeliveryPersonLogin;
