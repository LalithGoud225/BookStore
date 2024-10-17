import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  Header,
  Icon,
  Message,
  Table,
} from "semantic-ui-react";
import { useAuth } from "../../contexts/AuthContext";

const OrderSummary = () => {
  const [order, setOrder] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [storeId, setStoreId] = useState();

  useEffect(() => {
    const existingOrder = JSON.parse(localStorage.getItem("order")) || {};
    setOrder(existingOrder.books_ordered || []);
    setStoreId(existingOrder?.storeId);
    console.log(existingOrder);
  }, []);

  useEffect(() => {
    // Calculate total amount whenever order changes
    let amount = 0;
    order.forEach((item) => {
      amount += item.quantity * item.price;
    });
    setTotalAmount(amount);
  }, [order]); // Include order in the dependency array

  const handleQuantityChange = (index, action) => {
    const updatedOrder = [...order];
    const updatedItem = { ...updatedOrder[index] };

    if (action === "increment") {
      updatedItem.quantity++;
    } else if (action === "decrement") {
      if (updatedItem.quantity > 1) {
        updatedItem.quantity--;
      } else {
        setErrorMessage("Quantity can't be less than 1.");
        return;
      }
    }

    updatedOrder[index] = updatedItem;
    setOrder(updatedOrder);

    // Update localStorage
    const existingOrder = JSON.parse(localStorage.getItem("order")) || {};
    existingOrder.books_ordered = updatedOrder;
    localStorage.setItem("order", JSON.stringify(existingOrder));
    console.log(existingOrder);
    setStoreId(existingOrder?.storeId);
  };

  const handleProceedToPay = () => {
    if (isAuthenticated()) {
      navigate("/customer/order-books/payment", {
        state: { order, totalAmount, store_id: storeId },
      });
    } else {
      navigate("/login");
    }
  };

  return (
    <Container style={{ marginTop: "2rem" }}>
      <Header as="h2">Order Details</Header>
      {order.length > 0 ? (
        <>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Title</Table.HeaderCell>
                <Table.HeaderCell>Quantity</Table.HeaderCell>
                <Table.HeaderCell>Price</Table.HeaderCell>
                <Table.HeaderCell>Total</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {order.map((item, index) => (
                <Table.Row key={index}>
                  <Table.Cell>{item.title}</Table.Cell>
                  <Table.Cell>
                    <Button.Group>
                      <Button
                        icon
                        color="green"
                        onClick={() => handleQuantityChange(index, "increment")}
                      >
                        <Icon name="plus" />
                      </Button>
                      <Button.Or text={item.quantity} />
                      <Button
                        icon
                        color="red"
                        onClick={() => handleQuantityChange(index, "decrement")}
                      >
                        <Icon name="minus" />
                      </Button>
                    </Button.Group>
                  </Table.Cell>
                  <Table.Cell>${item.price}</Table.Cell>
                  <Table.Cell>${item.quantity * item.price}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
          <p style={{ textAlign: "right" }}>Total Amount: ${totalAmount}</p>
          <Button
            primary
            onClick={handleProceedToPay}
            style={{ float: "right" }}
          >
            Proceed to Pay
          </Button>
        </>
      ) : (
        <p>No items in the order.</p>
      )}
      {errorMessage && <Message negative>{errorMessage}</Message>}
    </Container>
  );
};

export default OrderSummary;
