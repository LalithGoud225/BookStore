import React, { useState, useEffect } from "react";
import {
  Container,
  Header,
  Form,
  Button,
  Dropdown,
  Message,
} from "semantic-ui-react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../utils/api";
import { levelOptionsData, shelfOptionsData } from "./CreateInventory";

const UpdateInventory = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    cost: "",
    total_copies: "",
    available_copies: "",
    shelf: "",
    level: "",
  });
  const [loading, setLoading] = useState(false);
  const [bookOptions, setBookOptions] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await api.get(`/store-inventory/${id}`);
        const {
          cost,
          total_copies,
          available_copies,
          rack_details: { shelf, level },
          book_id,
          store_id,
        } = response.data;
        setFormData({
          cost,
          total_copies,
          available_copies,
          shelf,
          level,
          book_id: book_id?._id,
          store_id,
        });
      } catch (error) {
        console.error("Error fetching inventory:", error);
      }
    };
    fetchInventory();
  }, [id]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await api.get("/books");
        const options = response.data.map((book) => ({
          key: book._id,
          value: book._id,
          text: book.title,
        }));
        setBookOptions(options);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchBooks();
  }, []);

  const handleChange = (e, { name, value }) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const payload = {
      ...formData,
      rack_details: { shelf: formData.shelf, level: formData.level },
    };
    try {
      await api.put(`/store-inventory/${id}`, payload);
      setLoading(false);
      setTimeout(() => {
        navigate("/staff/inventory");
      }, 1000);
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
        Update Inventory
      </Header>
      {errorMessage && <Message negative>{errorMessage}</Message>}
      <Form size="large" onSubmit={handleSubmit}>
        <Form.Field>
          <label>Book</label>
          <Dropdown
            fluid
            selection
            placeholder="Select Book"
            options={bookOptions}
            name="book_id"
            value={formData.book_id}
            onChange={handleChange}
            required
            disabled
          />
        </Form.Field>
        <Form.Input
          fluid
          label="Cost"
          placeholder="Cost"
          name="cost"
          value={formData.cost}
          onChange={handleChange}
          required
        />

        <Form.Input
          fluid
          label="Available Copies"
          placeholder="Available Copies"
          name="available_copies"
          value={formData.available_copies}
          onChange={handleChange}
          required
        />
        <Form.Field>
          <label>Shelf</label>
          <Dropdown
            fluid
            selection
            placeholder="Select Shelf"
            options={shelfOptionsData}
            name="shelf"
            value={formData.shelf}
            onChange={handleChange}
            required
          />
        </Form.Field>
        <Form.Field>
          <label>Level</label>
          <Dropdown
            fluid
            selection
            placeholder="Select Level"
            options={levelOptionsData}
            name="level"
            value={formData.level}
            onChange={handleChange}
            required
          />
        </Form.Field>
        <Button
          color="blue"
          fluid
          size="large"
          type="submit"
          loading={loading}
          style={{ marginTop: "1rem" }}
        >
          Update
        </Button>
      </Form>
    </Container>
  );
};

export default UpdateInventory;
