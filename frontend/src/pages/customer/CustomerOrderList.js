import React, { useState, useEffect } from "react";
import { Container, Header, Table, Message, Button } from "semantic-ui-react";
import api from "../../utils/api";
import moment from "moment";
import { Link } from "react-router-dom";

const CustomerOrderList = () => {
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
      <Header as="h2">My Orders</Header>
      {errorMessage && <Message negative>{errorMessage}</Message>}
      {orders.length > 0 ? (
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Order ID</Table.HeaderCell>
              <Table.HeaderCell>Order Date</Table.HeaderCell>
              <Table.HeaderCell>Total Amount</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {orders.map((order) => (
              <Table.Row key={order._id}>
                <Table.Cell>{order._id}</Table.Cell>
                <Table.Cell>
                  {moment(order.order_date).format("MMMM Do YYYY, h:mm a")}
                </Table.Cell>
                <Table.Cell>${order.total_amount}</Table.Cell>
                <Table.Cell>{order.order_status}</Table.Cell>
                <Table.Cell>
                  <Button
                    as={Link}
                    to={`/customer/orders/${order._id}`}
                    primary
                  >
                    View
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      ) : (
        <p>No orders found.</p>
      )}
    </Container>
  );
};

export default CustomerOrderList;
