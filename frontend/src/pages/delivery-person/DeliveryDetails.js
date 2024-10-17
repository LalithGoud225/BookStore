import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Container,
  Dropdown,
  Header,
  Message,
  Table,
} from "semantic-ui-react";
import api from "../../utils/api";

const DeliveryDetails = () => {
  const [delivery, setDelivery] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { orderId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDeliveryDetails = async () => {
      try {
        const response = await api.get(`/orders/${orderId}`);
        setDelivery(response.data);
      } catch (error) {
        setErrorMessage(
          "Failed to fetch delivery details. Please try again later."
        );
        console.error("Fetch delivery details error:", error);
      }
    };

    fetchDeliveryDetails();
  }, [orderId]);

  const handleStatusChange = async () => {
    try {
      await api.put(`/orders/${orderId}/status`, {
        order_status: selectedStatus,
      });
      setSuccessMessage("Delivery status updated successfully!");
      setTimeout(() => {
        navigate("/delivery-person/orders");
      }, 2000); // Redirect to orders page after 2 seconds
    } catch (error) {
      console.error("Update delivery status error:", error);
      setErrorMessage(
        "Failed to update delivery status. Please try again later."
      );
    }
  };

  return (
    <Container style={{ marginTop: "2rem", width: "60%" }}>
      <Header as="h2">Delivery Details</Header>
      {errorMessage && <Message negative>{errorMessage}</Message>}
      {successMessage && <Message positive>{successMessage}</Message>}
      {delivery && (
        <>
          <Table definition>
            <Table.Body>
              <Table.Row>
                <Table.Cell>Delivery Date</Table.Cell>
                <Table.Cell>
                  {moment(delivery.order_date).format("MMMM Do YYYY, h:mm a")}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Total Amount</Table.Cell>
                <Table.Cell>${delivery.total_amount}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Order Status</Table.Cell>
                <Table.Cell>{delivery.order_status}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Payment Status</Table.Cell>
                <Table.Cell>{delivery.payment_status}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Customer ID</Table.Cell>
                <Table.Cell>{delivery.customer_id}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Books Ordered</Table.Cell>
                <Table.Cell>
                  <ul>
                    {delivery.books_ordered.map((book) => (
                      <li key={book._id}>
                        {book.title} - Quantity: {book.quantity} - Price: $
                        {book.price}
                      </li>
                    ))}
                  </ul>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Status</Table.Cell>
                <Table.Cell>
                  <Dropdown
                    placeholder="Select Status"
                    fluid
                    selection
                    options={[
                      { key: "Pending", text: "Pending", value: "Pending" },
                      {
                        key: "In Progress",
                        text: "In Progress",
                        value: "In Progress",
                      },
                      {
                        key: "Delivered",
                        text: "Delivered",
                        value: "Delivered",
                      },
                      {
                        key: "Cancelled",
                        text: "Cancelled",
                        value: "Cancelled",
                      },
                    ]}
                    onChange={(e, { value }) => setSelectedStatus(value)}
                    value={selectedStatus}
                  />
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
          <Button primary onClick={handleStatusChange}>
            Update Status
          </Button>
        </>
      )}
    </Container>
  );
};

export default DeliveryDetails;
