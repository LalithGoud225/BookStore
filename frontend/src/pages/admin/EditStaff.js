import React, { useState, useEffect } from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
} from "semantic-ui-react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../utils/api";

const EditStaff = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    phone_number: "", // Added phone_number field
    city: "", // Added city field
    state: "", // Added state field
    zipcode: "", // Added zipcode field
    ssn: "", // Added ssn field
    dob: "", // Added dob field
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const response = await api.get(`/staff/${id}`);
        setFormData(response.data);
      } catch (error) {
        console.log("Error fetching staff:", error);
      }
    };
    fetchStaff();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await api.put(`/staff/${id}`, formData);
      setLoading(false);
      navigate("/admin/staff");
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
            Edit Staff
          </Header>
          <Form size="large" onSubmit={handleSubmit}>
            <Form.Input
              fluid
              placeholder="First Name"
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
            />
            <Form.Input
              fluid
              placeholder="Last Name"
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
            />
            <Form.Input
              fluid
              placeholder="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <Form.Input
              fluid
              placeholder="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <Form.Input
              fluid
              placeholder="Phone Number"
              type="text"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
            />
            <Form.Input
              fluid
              placeholder="City"
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
            />
            <Form.Input
              fluid
              placeholder="State"
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
            />
            <Form.Input
              fluid
              placeholder="Zipcode"
              type="text"
              name="zipcode"
              value={formData.zipcode}
              onChange={handleChange}
            />
            <Form.Input
              fluid
              placeholder="SSN"
              type="text"
              name="ssn"
              value={formData.ssn}
              onChange={handleChange}
            />
            <Form.Input
              fluid
              placeholder="Date of Birth"
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              max={new Date().toISOString().split("T")[0]} // Set max to current date
            />
            {error && <Message negative content={error} />}
            <Button
              color="blue"
              fluid
              size="large"
              type="submit"
              loading={loading}
              style={{ marginTop: "1rem" }}
            >
              Save Changes
            </Button>
          </Form>
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default EditStaff;
