import React, { useState, useEffect } from "react";
import {
  Container,
  Header,
  Table,
  Message,
  Button,
  Divider,
  Form,
  TextArea,
} from "semantic-ui-react";
import { useParams } from "react-router-dom";
import api from "../../utils/api";
import moment from "moment";

const OrderDetails = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [returnReason, setReturnReason] = useState("");
  const [returnRequestError, setReturnRequestError] = useState("");
  const [returnRequestSuccess, setReturnRequestSuccess] = useState("");

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await api.get(`/orders/${orderId}`);
        setOrder(response.data);
      } catch (error) {
        setErrorMessage(
          "Failed to fetch order details. Please try again later."
        );
        console.error("Fetch order details error:", error);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  const handleReturnRequest = async () => {
    try {
      await api.post(`/return-requests`, {
        order_id: orderId,
        customer_id: order.customer_id,
        return_reason: returnReason,
        status: "Pending",
        store_id: order.store_id,
      });
      setReturnRequestSuccess("Return request raised successfully!");
      setReturnRequestError(""); // Clear any previous error messages
      console.log("Return request raised successfully!");
    } catch (error) {
      setReturnRequestError(
        "Failed to raise return request. Please try again later."
      );
      console.error("Raise return request error:", error);
    }
  };

  const isEligibleForReturn = () => {
    // Check if the order date is less than 2 days from the current date
    if (order && moment().diff(moment(order.order_date), "days") < 2) {
      return true;
    }
    return false;
  };

  return (
    <Container style={{ marginTop: "2rem" }}>
      {errorMessage && <Message negative>{errorMessage}</Message>}
      {returnRequestError && <Message negative>{returnRequestError}</Message>}
      {returnRequestSuccess && (
        <Message positive>{returnRequestSuccess}</Message>
      )}
      {order && (
        <>
          <Header as="h2">Order Details</Header>
          <Table definition>
            <Table.Body>
              <Table.Row>
                <Table.Cell width={4}>Order Date</Table.Cell>
                <Table.Cell>
                  {moment(order.order_date).format("MMMM Do YYYY, h:mm a")}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Total Amount</Table.Cell>
                <Table.Cell>${order.total_amount}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Order Status</Table.Cell>
                <Table.Cell>{order.order_status}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Payment Status</Table.Cell>
                <Table.Cell>{order.payment_status}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Books Ordered</Table.Cell>
                <Table.Cell>
                  <ul>
                    {order.books_ordered.map((book) => (
                      <li key={book._id}>
                        <strong>Title:</strong> {book.title}
                        <br />
                        <strong>Quantity:</strong> {book.quantity}
                        <br />
                        <strong>Price:</strong> ${book.price}
                        <br />
                        <Divider />
                      </li>
                    ))}
                  </ul>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
          {isEligibleForReturn() && (
            <>
              <Form>
                <TextArea
                  placeholder="Enter return reason..."
                  value={returnReason}
                  onChange={(e) => setReturnReason(e.target.value)}
                />
              </Form>
              <Button
                style={{ marginTop: 16 }}
                primary
                onClick={handleReturnRequest}
              >
                Raise Return Request
              </Button>
            </>
          )}
        </>
      )}
    </Container>
  );
};

export default OrderDetails;
