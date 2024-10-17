import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Header,
  Card,
  Image,
  Form,
  Button,
  Message,
} from "semantic-ui-react";
import api from "../../utils/api";
import { booksGenreImagesMap } from "./BookList";

const BookInventoryDetails = () => {
  const { id: bookId } = useParams();
  const [book, setBook] = useState(null);
  const [numCopies, setNumCopies] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [existingQuantity, setExistingQuantity] = useState(0);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await api.get(`/store-inventory/${bookId}`);
        setBook(response.data);
        const bookInventoryData = response.data;

        // Check if there's an existing order
        const existingOrder = JSON.parse(localStorage.getItem("order"));
        if (existingOrder && existingOrder.books_ordered) {
          const existingBook = existingOrder.books_ordered.find(
            (book) => book.book_id === bookInventoryData?.book_id?._id
          );
          if (existingBook) {
            setExistingQuantity(existingBook.quantity);
            setNumCopies(existingBook.quantity); // Set existing quantity as initial value
          }
        }
      } catch (error) {
        console.error("Error fetching book details:", error);
      }
    };
    fetchBookDetails();
  }, [bookId]);

  const handleAddToOrder = () => {
    if (!book) return;

    if (numCopies <= 0) {
      setErrorMessage("Please select at least 1 copy.");
      return;
    }

    if (numCopies > book.available_copies) {
      setErrorMessage(
        `You can't order more than ${book.available_copies} copies for this book.`
      );
      return;
    }

    let order = JSON.parse(localStorage.getItem("order")) || {};

    if (order.storeId !== book.store_id) {
      order = { books_ordered: [] };
    }

    const existingBookIndex = order?.books_ordered?.findIndex(
      (item) => item.book_id === book?.book_id?._id
    );

    if (existingBookIndex !== -1) {
      order.books_ordered[existingBookIndex].quantity = numCopies;
    } else {
      order.books_ordered.push({
        book_id: book?.book_id?._id,
        inventory_id: book?._id,
        store_id: book.store_id,
        title: book.book_id.title, // Add book title
        quantity: numCopies,
        price: book.cost,
      });
    }

    order.storeId = book.store_id;

    localStorage.setItem("order", JSON.stringify(order));

    setSuccessMessage("Book added to order successfully.");
  };

  return (
    <Container style={{ marginTop: "2rem", width: "50%" }}>
      {book ? (
        <>
          <Header as="h2" textAlign="center">
            {book.book_id.title}
          </Header>
          <Card fluid>
            <Image
              src={
                book?.book_id?.genre &&
                booksGenreImagesMap[book?.book_id?.genre]
                  ? require(`../../images/books/${
                      booksGenreImagesMap[book?.book_id?.genre]
                    }`)
                  : require(`../../images/books/default.jpeg`)
              }
              ui={false}
              style={{ maxHeight: "250px", objectFit: "cover" }}
              centered
            />
            <Card.Content>
              <Card.Meta>Genre: {book.book_id.genre}</Card.Meta>
              <Card.Description>
                <p>Author: {book.book_id.author}</p>
                <p>Description: {book.book_id.description}</p>
                <p>ISBN: {book.book_id.isbn}</p>
                <p>Shelf: {book.rack_details.shelf}</p>
                <p>Level: {book.rack_details.level}</p>
                <p>Price: ${book.cost}</p>
                <p>Available Copies: {book.available_copies}</p>
              </Card.Description>
            </Card.Content>
          </Card>
          <Form style={{ marginTop: "1rem" }}>
            <Form.Field>
              <label>Number of Copies:</label>
              <input
                type="number"
                min="1"
                value={numCopies}
                onChange={(e) => setNumCopies(parseInt(e.target.value))}
              />
            </Form.Field>
            <Button primary onClick={handleAddToOrder}>
              Add to Order
            </Button>
          </Form>
          {errorMessage && <Message negative>{errorMessage}</Message>}
          {successMessage && <Message positive>{successMessage}</Message>}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </Container>
  );
};

export default BookInventoryDetails;
