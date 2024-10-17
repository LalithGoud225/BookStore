import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Header, Table, Button, Image } from "semantic-ui-react";
import api from "../../utils/api";

const StaffBookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await api.get("/books");
        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchBooks();
  }, []);

  return (
    <Container style={{ marginTop: "3rem" }}>
      <Header as="h2" style={{ marginBottom: "2rem" }}>
        Book List
        <Button
          as={Link}
          to="/staff/books/create"
          color="blue"
          style={{ marginLeft: "1rem" }}
        >
          Create Book
        </Button>
      </Header>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Title</Table.HeaderCell>
            <Table.HeaderCell>Genre</Table.HeaderCell>
            <Table.HeaderCell>Author</Table.HeaderCell>
            <Table.HeaderCell>Description</Table.HeaderCell>
            <Table.HeaderCell>ISBN</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {books.map((book) => (
            <Table.Row key={book._id}>
              <Table.Cell>{book.title}</Table.Cell>
              <Table.Cell>{book.genre}</Table.Cell>
              <Table.Cell>{book.author}</Table.Cell>
              <Table.Cell>{book.description}</Table.Cell>
              <Table.Cell>{book.isbn}</Table.Cell>
              <Table.Cell>
                <Button
                  as={Link}
                  to={`/staff/books/${book._id}/edit`}
                  color="blue"
                  style={{ marginRight: "0.5rem" }}
                >
                  Edit
                </Button>
                {/* Add Delete Button Here */}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Container>
  );
};

export default StaffBookList;
