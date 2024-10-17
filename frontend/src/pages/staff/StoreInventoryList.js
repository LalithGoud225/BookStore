import React, { useState, useEffect } from "react";
import { Container, Header, Table, Button, Icon } from "semantic-ui-react";
import api from "../../utils/api";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";

const StoreInventoryList = () => {
  const [inventory, setInventory] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await api.get(
          "/store-inventory/store/" + user?.store_id?._id
        );
        setInventory(response.data);
      } catch (error) {
        console.error("Error fetching store inventory:", error);
      }
    };
    fetchInventory();
  }, []);

  return (
    <Container style={{ marginTop: "2rem" }}>
      <Header as="h2">Store Inventory List</Header>
      <Link to="/staff/inventory/create">
        <Button primary style={{ marginBottom: "1rem" }}>
          Create Inventory
        </Button>
      </Link>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Book Title</Table.HeaderCell>
            <Table.HeaderCell>Cost</Table.HeaderCell>
            <Table.HeaderCell>Genre</Table.HeaderCell>
            <Table.HeaderCell>ISBN</Table.HeaderCell>
            <Table.HeaderCell>Total Copies</Table.HeaderCell>
            <Table.HeaderCell>Available Copies</Table.HeaderCell>
            <Table.HeaderCell>Rack Details</Table.HeaderCell>
            <Table.HeaderCell>Edit</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {inventory.map((item) => (
            <Table.Row key={item._id}>
              <Table.Cell>{item.book_id?.title}</Table.Cell>
              <Table.Cell>${item.cost}</Table.Cell>
              <Table.Cell>{item.book_id?.genre}</Table.Cell>
              <Table.Cell>{item.book_id?.isbn}</Table.Cell>
              <Table.Cell>{item.total_copies}</Table.Cell>
              <Table.Cell>{item.available_copies}</Table.Cell>
              <Table.Cell>
                Shelf: {item.rack_details.shelf}, Level:{" "}
                {item.rack_details.level}
              </Table.Cell>
              <Table.Cell>
                <Link to={`/staff/inventory/${item._id}/edit`}>
                  <Button icon primary>
                    <Icon name="edit" />
                  </Button>
                </Link>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Container>
  );
};

export default StoreInventoryList;
