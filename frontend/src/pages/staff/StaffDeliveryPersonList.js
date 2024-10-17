import React, { useState, useEffect } from "react";
import { Container, Header, Table, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import api from "../../utils/api";

const StaffDeliveryPersonList = () => {
  const [personnelList, setPersonnelList] = useState([]);

  useEffect(() => {
    const fetchPersonnel = async () => {
      try {
        const response = await api.get("/delivery-personnel");
        setPersonnelList(response.data);
      } catch (error) {
        console.error("Error fetching delivery personnel:", error);
      }
    };
    fetchPersonnel();
  }, []);

  return (
    <Container style={{ marginTop: "2rem" }}>
      <Header as="h2">Delivery Personnel List</Header>
      <Link to="/staff/delivery-persons/create">
        <Button primary>Create Delivery Person</Button>
      </Link>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>First Name</Table.HeaderCell>
            <Table.HeaderCell>Last Name</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>Type</Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {personnelList.map((person) => (
            <Table.Row key={person._id}>
              <Table.Cell>{person.first_name}</Table.Cell>
              <Table.Cell>{person.last_name}</Table.Cell>
              <Table.Cell>{person.email}</Table.Cell>
              <Table.Cell>{person.type}</Table.Cell>
              <Table.Cell>
                <Link to={`/staff/delivery-persons/${person._id}/edit`}>
                  <Button primary>Edit</Button>
                </Link>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Container>
  );
};

export default StaffDeliveryPersonList;
