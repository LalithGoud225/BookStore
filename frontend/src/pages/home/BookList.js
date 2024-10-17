import React, { useState, useEffect } from "react";
import {
  Container,
  Header,
  Form,
  Dropdown,
  Card,
  Image,
} from "semantic-ui-react";
import api from "../../utils/api";
import { useNavigate } from "react-router-dom";

export const booksGenreImagesMap = {
  Fantasy: "Fantasy.jpeg",
  "Science Fiction": "Science Fiction.jpeg",
  Mystery: "Mystery.jpeg",
  Thriller: "Thriller.jpeg",
  Romance: "Romance.webp",
  Horror: "Horror.jpeg",
};

const BookList = () => {
  const [stores, setStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState("");
  const [inventory, setInventory] = useState([]);
  const [filteredInventory, setFilteredInventory] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchGenre, setSearchGenre] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await api.get("/stores");
        setStores(response.data);
        if (response.data.length > 0) {
          setSelectedStore(response.data[0]._id); // Select the first store by default
        }
      } catch (error) {
        console.error("Error fetching stores:", error);
      }
    };
    fetchStores();
  }, []);

  useEffect(() => {
    const fetchInventory = async () => {
      if (selectedStore) {
        try {
          const response = await api.get(
            `/store-inventory/store/${selectedStore}`
          );
          setInventory(response.data);
        } catch (error) {
          console.error("Error fetching inventory:", error);
        }
      }
    };
    fetchInventory();
  }, [selectedStore]);

  useEffect(() => {
    // Filter inventory based on search criteria
    let filtered = [...inventory];

    if (searchTitle) {
      filtered = filtered.filter((book) =>
        book.book_id.title.toLowerCase().includes(searchTitle.toLowerCase())
      );
    }

    if (searchGenre) {
      filtered = filtered.filter((book) =>
        book?.book_id?.genre.toLowerCase().includes(searchGenre.toLowerCase())
      );
    }

    setFilteredInventory(filtered);
  }, [inventory, searchTitle, searchGenre]);

  const handleStoreChange = (e, { value }) => {
    setSelectedStore(value);
  };

  const handleTitleChange = (e, { value }) => {
    setSearchTitle(value);
  };

  const handleGenreChange = (e, { value }) => {
    setSearchGenre(value);
  };

  return (
    <Container style={{ marginTop: "2rem" }}>
      <Header as="h2">Book List</Header>
      <Form>
        <Form.Group widths="equal">
          <Form.Field>
            <label>Select Store</label>
            <Dropdown
              placeholder="Select Store"
              fluid
              selection
              options={stores.map((store) => ({
                key: store._id,
                value: store._id,
                text: store.name,
              }))}
              onChange={handleStoreChange}
              value={selectedStore}
            />
          </Form.Field>
          <Form.Input
            label="Search by Title"
            placeholder="Enter title..."
            onChange={handleTitleChange}
            value={searchTitle}
          />
          <Form.Input
            label="Search by Genre"
            placeholder="Enter genre..."
            onChange={handleGenreChange}
            value={searchGenre}
          />
        </Form.Group>
      </Form>
      <Card.Group>
        {filteredInventory.map((item) => (
          <Card
            onClick={() => navigate(`/books/${item._id}`)}
            key={item._id}
            style={{ height: "400px", borderRadius: 10 }}
          >
            <Image
              src={
                item?.book_id?.genre &&
                booksGenreImagesMap[item?.book_id?.genre]
                  ? require(`../../images/books/${
                      booksGenreImagesMap[item?.book_id?.genre]
                    }`)
                  : require(`../../images/books/default.jpeg`)
              }
              ui={false}
              style={{ maxHeight: "250px", objectFit: "cover" }}
            />
            <Card.Content>
              <Card.Header>{item.book_id.title}</Card.Header>
              <Card.Meta>{item?.book_id?.genre}</Card.Meta>
              <Card.Description>
                <p>Cost: ${item.cost}</p>
                <p>Available Copies: {item.available_copies}</p>
                {/* Add more details as needed */}
              </Card.Description>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
    </Container>
  );
};

export default BookList;
