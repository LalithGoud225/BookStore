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
import { useAuth } from "../../contexts/AuthContext";

const StaffChangePassword = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      if (formData.newPassword !== formData.confirmPassword) {
        setError("Passwords do not match.");
        setLoading(false);
        return;
      }

      await api.put(`/staff/${user?._id}/change-password`, {
        password: formData.newPassword,
      });

      setTimeout(() => {
        navigate("/staff/books");
      }, 1000);
      setLoading(false);
      setSuccess(true);
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 400 }}>
        <Segment raised style={{ borderRadius: 10 }}>
          <Header as="h2" textAlign="center" color="blue">
            Change Password
          </Header>
          <Form size="large" onSubmit={handleSubmit}>
            <Form.Input
              fluid
              placeholder="New Password"
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
            />
            <Form.Input
              fluid
              placeholder="Confirm New Password"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {error && <Message negative content={error} />}
            {success && (
              <Message positive>
                <Message.Header>Password changed successfully!</Message.Header>
              </Message>
            )}
            <Button
              color="blue"
              fluid
              size="large"
              type="submit"
              loading={loading}
              style={{ marginTop: "1rem" }}
            >
              Change Password
            </Button>
          </Form>
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default StaffChangePassword;
