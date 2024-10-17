import React, { useState, useEffect } from "react";
import { Button, Form, Grid, Header, Dropdown } from "semantic-ui-react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../utils/api";

const EditStore = () => {
  const { id } = useParams();
  const [storeData, setStoreData] = useState({
    name: "",
    location: "",
    city: "", // Added city field
    zipcode: "", // Added zipcode field
    phone_number: "", // Added phone number field
    staff_id: "",
  });
  const [staffOptions, setStaffOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storesResponse = await api.get("/stores");

        const staffIds =
          storesResponse.data
            ?.filter((store) => Boolean(store.staff_id))
            .map((store) => {
              return store.staff_id;
            }) || [];

        const staffResponse = await api.get("/staff");
        const filteredStaff = staffResponse.data.filter(
          (staff) =>
            !staffIds.includes(staff.store_id) ||
            staff._id === storeData.staff_id
        );
        const staffOptions = filteredStaff.map((staff) => ({
          key: staff._id,
          text: `${staff.first_name} ${staff.last_name}`,
          value: staff._id,
        }));
        setStaffOptions(staffOptions);

        const storeResponse = await api.get(`/stores/${id}`);
        setStoreData(storeResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e, { name, value }) => {
    setStoreData({ ...storeData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.put(`/stores/${id}`, storeData);
      setLoading(false);
      navigate("/admin/stores");
    } catch (error) {
      setLoading(false);
      console.error("Error updating store:", error);
    }
  };

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 400 }}>
        <Header as="h2" color="blue" textAlign="center">
          Edit Store
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
            placeholder="City" // Added city field
            name="city"
            value={storeData.city}
            onChange={handleChange}
          />
          <Form.Input
            fluid
            placeholder="Zipcode" // Added zipcode field
            name="zipcode"
            value={storeData.zipcode}
            onChange={handleChange}
          />
          <Form.Input
            fluid
            placeholder="Phone Number" // Added phone number field
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
            Update
          </Button>
        </Form>
        <Button
          color="grey"
          fluid
          size="large"
          onClick={() => navigate("/admin/stores")}
          style={{ marginTop: "1rem" }}
        >
          Cancel
        </Button>
      </Grid.Column>
    </Grid>
  );
};

export default EditStore;
