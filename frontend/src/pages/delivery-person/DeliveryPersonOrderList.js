import React, { useState, useEffect } from "react";
import { Container, Header, Table, Message, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import api from "../../utils/api";
import moment from "moment";
import { useAuth } from "../../contexts/AuthContext";

const DeliveryPersonOrderList = () => {
  const [orders, setOrders] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get(
          "/orders/delivery-personnel/" + user?._id
        );
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
                  <Button
                    as={Link}
                    to={`/delivery-person/orders/${order._id}`}
                    primary
                  >
                    View Details
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

export default DeliveryPersonOrderList;
