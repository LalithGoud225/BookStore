import React, { useState, useEffect } from "react";
import { Button, Form, Grid, Header, Dropdown } from "semantic-ui-react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../utils/api";

const CreateStore = () => {
  const [storeData, setStoreData] = useState({
    name: "",
    location: "",
    city: "",
    zipcode: "",
    phone_number: "",
    staff_id: "",
  });
  const [staffOptions, setStaffOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const storesResponse = await api.get("/stores");

        const staffIds =
          storesResponse.data
            ?.filter((store) => Boolean(store.staff_id))
            .map((store) => {
              return store.staff_id;
            }) || [];

        const response = await api.get("/staff");
        const filteredStaff = response.data.filter(
          (staff) => !staffIds.includes(staff.store_id)
        );
        const staffOptions = filteredStaff.map((staff) => ({
          key: staff._id,
          text: `${staff.first_name} ${staff.last_name}`,
          value: staff._id,
        }));
        setStaffOptions(staffOptions);
      } catch (error) {
        console.error("Error fetching staff:", error);
      }
    };
    fetchStaff();
  }, []);

  const handleChange = (e, { name, value }) => {
    setStoreData({ ...storeData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/stores", storeData);
      setLoading(false);
      navigate("/admin/stores");
    } catch (error) {
      setLoading(false);
      console.error("Error creating store:", error);
    }
  };

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 400 }}>
        <Header as="h2" color="blue" textAlign="center">
          Create Store
        </Header>
        <Form size="large" onSubmit={handleSubmit}>
          <Form.Input
            fluid
            placeholder="Store Name"
            name="name"
            value={storeData.name}
            onChange={handleChange}
          />
          <Form.Input
            fluid
            placeholder="Location"
            name="location"
            value={storeData.location}
            onChange={handleChange}
          />
          <Form.Input
            fluid
            placeholder="City"
            name="city"
            value={storeData.city}
            onChange={handleChange}
          />
          <Form.Input
            fluid
            placeholder="Zipcode"
            name="zipcode"
            value={storeData.zipcode}
            onChange={handleChange}
          />
          <Form.Input
            fluid
            placeholder="Phone Number"
            name="phone_number"
            value={storeData.phone_number}
            onChange={handleChange}
          />
          <Form.Field>
            <Dropdown
              fluid
              selection
              placeholder="Select Staff"
              options={staffOptions}
              name="staff_id"
              value={storeData.staff_id}
              onChange={handleChange}
            />
          </Form.Field>
          <Button
            color="blue"
            fluid
            size="large"
            type="submit"
            loading={loading}
          >
            Create
          </Button>
        </Form>
        <Button
          as={Link}
          to="/admin/stores"
          color="grey"
          fluid
          size="large"
          style={{ marginTop: "1rem" }}
        >
          Cancel
        </Button>
      </Grid.Column>
    </Grid>
  );
};

export default CreateStore;
