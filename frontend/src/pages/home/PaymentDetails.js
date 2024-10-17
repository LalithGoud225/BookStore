import moment from "moment";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Container, Form, Header, Message } from "semantic-ui-react";
import { useAuth } from "../../contexts/AuthContext";
import api from "../../utils/api";

const PaymentDetails = () => {
  const [paymentDetails, setPaymentDetails] = useState({
    card_type: "",
    card_number: "",
    card_name: "",
    expiry_month: "",
    expiry_year: "",
    cvv: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const location = useLocation();
  const { order, totalAmount, store_id } = location.state || {};
  const { user } = useAuth();
  const navigate = useNavigate();
  console.log(user);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails({ ...paymentDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...paymentDetails, totalAmount, order };

    console.log(payload);

    const payloadData = {
      order: {
        customer_id: user?._id || user?.id,
        books_ordered: order,
        total_amount: totalAmount,
        order_date: moment().format("MM-DD-YYYY, h:mm a"),
        order_status: "success",
        payment_status: "success",
        store_id,
      },
      paymentDetails: {
        ...paymentDetails,
        card_type: "Credit",
        customer_id: user?._id || user?.id,
        amount: totalAmount,
        data: moment().format("MM-DD-YYYY, h:mm a"),
        payment_type: "card",
        status: "success",
        store_id,
      },
    };

    try {
      const response = await api.post("/orders", payloadData);
      setSuccessMessage("Payment successful!");
      // Redirect to order confirmation page
      setTimeout(() => {
        navigate("/customer/orders");
      }, 2000); // Redirect after 2 seconds
    } catch (error) {
      setErrorMessage("Payment failed. Please try again later.");
      console.error("Payment error:", error);
    }
  };

  return (
    <Container style={{ marginTop: "2rem", width: "30%" }}>
      <Header as="h2">Payment Details</Header>
      <p>Total Amount: ${totalAmount}</p>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          label="Card Number"
          placeholder="Card Number"
          name="card_number"
          value={paymentDetails.card_number}
          onChange={handleInputChange}
        />
        <Form.Input
          label="Cardholder Name"
          placeholder="Cardholder Name"
          name="card_name"
          value={paymentDetails.card_name}
          onChange={handleInputChange}
        />
        <Form.Input
          label="Expiry Month"
          placeholder="Expiry Month"
          name="expiry_month"
          value={paymentDetails.expiry_month}
          onChange={handleInputChange}
        />
        <Form.Input
          label="Expiry Year"
          placeholder="Expiry Year"
          name="expiry_year"
          value={paymentDetails.expiry_year}
          onChange={handleInputChange}
        />
        <Form.Input
          label="CVV"
          placeholder="CVV"
          name="cvv"
          value={paymentDetails.cvv}
          onChange={handleInputChange}
        />
        <Button primary type="submit">
          Pay Now
        </Button>
      </Form>
      {errorMessage && <Message negative>{errorMessage}</Message>}
      {successMessage && <Message positive>{successMessage}</Message>}
    </Container>
  );
};

export default PaymentDetails;
