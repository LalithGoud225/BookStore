import React, { useState, useEffect } from "react";
import { Container, Header, Table, Message, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import api from "../../utils/api";
import moment from "moment";

const StaffOrderList = () => {
  const [orders, setOrders] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get("/orders");
        setOrders(response.data);
      } catch (error) {
        setErrorMessage("Failed to fetch orders. Please try again later.");
        console.error("Fetch orders error:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <Container style={{ marginTop: "2rem" }}>
      <Header as="h2">Staff Order List</Header>
      {errorMessage && <Message negative>{errorMessage}</Message>}
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Order Date</Table.HeaderCell>
            <Table.HeaderCell>Total Amount</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {orders.map((order) => (
            <Table.Row key={order._id}>
              <Table.Cell>
                {moment(order.order_date).format("MMMM Do YYYY, h:mm a")}
              </Table.Cell>
              <Table.Cell>${order.total_amount}</Table.Cell>
              <Table.Cell>{order.order_status}</Table.Cell>
              <Table.Cell>
                <Button primary as={Link} to={`/staff/orders/${order._id}`}>
                  View
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Container>
  );
};

export default StaffOrderList;
