import React, { useState } from "react";
import {
  Container,
  Header,
  Form,
  Button,
  Message,
  Dropdown,
} from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import { useAuth } from "../../contexts/AuthContext";

const deliveryTypeOptions = [
  { key: "delivery", value: "delivery", text: "Delivery" },
  { key: "pickup", value: "pickup", text: "Pickup" },
];

const CreateDeliveryPerson = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    type: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleChange = (e, { name, value }) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const payload = { ...formData, store_id: user?.store_id?._id };
    try {
      await api.post("/delivery-personnel", payload);
      setLoading(false);
      setTimeout(() => {
        navigate("/staff/delivery-persons");
      }, 1000);
    } catch (error) {
      setLoading(false);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <Container style={{ marginTop: "4rem", width: "30%" }}>
      <Header as="h2" style={{ marginBottom: "2rem" }}>
        Create Delivery Person
      </Header>
      {errorMessage && <Message negative>{errorMessage}</Message>}
      <Form size="large" onSubmit={handleSubmit}>
        <Form.Input
          fluid
          label="First Name"
          placeholder="First Name"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          required
        />
        <Form.Input
          fluid
          label="Last Name"
          placeholder="Last Name"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          required
        />
        <Form.Input
          fluid
          label="Email"
          placeholder="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <Form.Input
          fluid
          label="Password"
          placeholder="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <Form.Field>
          <label>Type</label>
          <Dropdown
            fluid
            selection
            placeholder="Select Type"
            options={deliveryTypeOptions}
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
          />
        </Form.Field>
        <Button
          color="blue"
          fluid
          size="large"
          type="submit"
          loading={loading}
          style={{ marginTop: "1rem" }}
        >
          Create
        </Button>
      </Form>
    </Container>
  );
};

export default CreateDeliveryPerson;
