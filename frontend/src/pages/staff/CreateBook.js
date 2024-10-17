import React, { useState, useEffect } from "react";
import {
  Container,
  Header,
  Form,
  Button,
  Dropdown,
  Message,
} from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";

export const genresList = [
  { key: "fantasy", value: "Fantasy", text: "Fantasy" },
  { key: "sci-fi", value: "Science Fiction", text: "Science Fiction" },
  { key: "mystery", value: "Mystery", text: "Mystery" },
  { key: "thriller", value: "Thriller", text: "Thriller" },
  { key: "romance", value: "Romance", text: "Romance" },
  { key: "horror", value: "Horror", text: "Horror" },
];

const CreateBook = () => {
  const [formData, setFormData] = useState({
    title: "",
    genre: "",
    author: "",
    description: "",
    isbn: "",
  });
  const [loading, setLoading] = useState(false);
  const [genres, setGenres] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await api.get("/genres");
        setGenres(response.data);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };
    fetchGenres();
  }, []);

  const handleChange = (e, { name, value }) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/books", formData);
      setLoading(false);
      navigate("/staff/books");
    } catch (error) {
      setLoading(false);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <Container style={{ marginTop: "4rem", width: "30%" }}>
      <Header as="h2" style={{ marginBottom: "2rem" }}>
        Create Book
      </Header>
      {errorMessage && <Message negative>{errorMessage}</Message>}
      <Form size="large" onSubmit={handleSubmit}>
        <Form.Input
          fluid
          label="Title"
          placeholder="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <Form.Field>
          <label>Genre</label>
          <Dropdown
            fluid
            selection
            placeholder="Select Genre"
            options={genresList}
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            required
          />
        </Form.Field>
        <Form.Input
          fluid
          label="Author"
          placeholder="Author"
          name="author"
          value={formData.author}
          onChange={handleChange}
          required
        />
        <Form.TextArea
          label="Description"
          placeholder="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <Form.Input
          fluid
          label="ISBN"
          placeholder="ISBN"
          name="isbn"
          value={formData.isbn}
          onChange={handleChange}
          required
        />
        <Button
          color="blue"
          fluid
          size="large"
          type="submit"
          loading={loading}
          style={{ marginTop: "1rem" }}
        >
          Create
        </Button>
      </Form>
    </Container>
  );
};

export default CreateBook;
