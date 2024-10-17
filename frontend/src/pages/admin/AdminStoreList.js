import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Grid, Header, Table } from "semantic-ui-react";
import api from "../../utils/api";

const AdminStoreList = () => {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await api.get("/stores");
        setStores(response.data);
      } catch (error) {
        console.log("Error fetching stores:", error);
      }
    };
    fetchStores();
  }, []);

  return (
    <Grid textAlign="center" style={{ height: "100vh", marginTop: "3em" }}>
      <Grid.Column style={{ maxWidth: 800 }}>
        <Header as="h2" textAlign="center" color="blue">
          Store List
        </Header>
        <Button
          as={Link}
          to="/admin/stores/create"
          color="blue"
          size="large"
          style={{ marginTop: "1rem" }}
        >
          Create Store
        </Button>
        <Table celled striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Location</Table.HeaderCell>
              <Table.HeaderCell>City</Table.HeaderCell> {/* Added City */}
              <Table.HeaderCell>Zipcode</Table.HeaderCell> {/* Added Zipcode */}
              <Table.HeaderCell>Phone Number</Table.HeaderCell>{" "}
              {/* Added Phone Number */}
              <Table.HeaderCell>Staff Name</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {stores.map((store) => (
              <Table.Row key={store._id}>
                <Table.Cell>{store.name}</Table.Cell>
                <Table.Cell>{store.location}</Table.Cell>
                <Table.Cell>{store.city}</Table.Cell> {/* Added City */}
                <Table.Cell>{store.zipcode}</Table.Cell> {/* Added Zipcode */}
                <Table.Cell>{store.phone_number}</Table.Cell>{" "}
                {/* Added Phone Number */}
                <Table.Cell>{`${store.staff_id?.first_name} ${store.staff_id?.last_name}`}</Table.Cell>
                <Table.Cell>
                  <Button
                    as={Link}
                    to={`/admin/stores/${store._id}/edit`}
                    color="blue"
                    size="small"
                  >
                    Edit
                  </Button>
                  {/* <Button
                    as={Link}
                    to={`/admin/stores/${store._id}/books`}
                    color="green"
                    size="small"
                    style={{ marginLeft: "0.5rem" }}
                  >
                    View Books
                  </Button> */}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Grid.Column>
    </Grid>
  );
};

export default AdminStoreList;
