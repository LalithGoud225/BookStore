import React, { useState, useEffect } from "react";
import {
  Container,
  Header,
  Table,
  Message,
  Dropdown,
  Button,
} from "semantic-ui-react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../utils/api";
import moment from "moment";

const StaffOrderDetails = () => {
  const [order, setOrder] = useState(null);
  const [staffList, setStaffList] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState("");
  const [selectedOrderStatus, setSelectedOrderStatus] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { orderId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await api.get(`/orders/${orderId}`);
        setOrder(response.data);
        setSelectedStaff(response.data?.agent_id);
        setSelectedOrderStatus(response.data?.order_status);
      } catch (error) {
        setErrorMessage(
          "Failed to fetch order details. Please try again later."
        );
        console.error("Fetch order details error:", error);
      }
    };

    const fetchDeliveryPersonnel = async () => {
      try {
        const response = await api.get("/delivery-personnel");
        const personnelOptions = response.data.map((person) => ({
          key: person._id,
          text: person.first_name + " " + person.last_name,
          value: person._id,
        }));
        setStaffList(personnelOptions);
      } catch (error) {
        console.error("Fetch delivery personnel error:", error);
      }
    };

    fetchOrderDetails();
    fetchDeliveryPersonnel();
  }, [orderId]);

  const handleAssignOrder = async () => {
    try {
      await api.put(`/orders/${orderId}/status`, {
        agent_id: selectedStaff,
        order_status: selectedOrderStatus,
      });
      setSuccessMessage("Order assigned successfully!");
      setTimeout(() => {
        navigate("/staff/orders");
      }, 2000); // Redirect after 2 seconds
    } catch (error) {
      console.error("Assign order error:", error);
      setErrorMessage("Failed to assign order. Please try again later.");
    }
  };

  return (
    <Container style={{ marginTop: "2rem", width: "60%" }}>
      <Header as="h2">Order Details</Header>
      {errorMessage && <Message negative>{errorMessage}</Message>}
      {successMessage && <Message positive>{successMessage}</Message>}
      {order && (
        <>
          <Table definition>
            <Table.Body>
              <Table.Row>
                <Table.Cell>Order Date</Table.Cell>
                <Table.Cell>
                  {moment(order.order_date).format("MMMM Do YYYY, h:mm a")}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Total Amount</Table.Cell>
                <Table.Cell>${order.total_amount}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Status</Table.Cell>
                <Table.Cell>{order.order_status}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Payment Status</Table.Cell>
                <Table.Cell>{order.payment_status}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Customer ID</Table.Cell>
                <Table.Cell>{order.customer_id}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Books Ordered</Table.Cell>
                <Table.Cell>
                  <ul>
                    {order.books_ordered.map((book) => (
                      <li key={book._id}>
                        {book.title} - Quantity: {book.quantity} - Price: $
                        {book.price}
                      </li>
                    ))}
                  </ul>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
          <Dropdown
            placeholder="Select Delivery Personnel"
            style={{ width: "30%", marginBottom: 16 }}
            fluid
            selection
            options={staffList}
            onChange={(e, { value }) => setSelectedStaff(value)}
            value={selectedStaff}
          />
          <Dropdown
            placeholder="Select Order Status"
            style={{ width: "30%", marginBottom: 16 }}
            fluid
            selection
            options={[
              { key: "Pending", text: "Pending", value: "Pending" },
              { key: "Processing", text: "Processing", value: "Processing" },
              { key: "Shipped", text: "Shipped", value: "Shipped" },
              { key: "Delivered", text: "Delivered", value: "Delivered" },
            ]}
            onChange={(e, { value }) => setSelectedOrderStatus(value)}
            value={selectedOrderStatus}
          />
          <Button primary onClick={handleAssignOrder}>
            Assign Order
          </Button>
        </>
      )}
    </Container>
  );
};

export default StaffOrderDetails;
