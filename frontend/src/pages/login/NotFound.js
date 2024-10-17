import React from "react";
import { Link } from "react-router-dom";
import { Container, Header, Button } from "semantic-ui-react";

const NotFound = () => {
  return (
    <Container text textAlign="center" style={{ marginTop: "5rem" }}>
      <Header as="h2" style={{ color: "#ff4d4f", fontSize: "2rem" }}>
        <span style={{ color: "#ff4d4f" }}>404</span> Page Not Found
      </Header>
      <p style={{ fontSize: "1.2rem" }}>
        The page you are looking for does not exist.
      </p>
      <Button
        as={Link}
        to="/"
        color="blue"
        style={{
          backgroundColor: "#1890ff",
          color: "white",
          borderRadius: "5px",
          padding: "10px 20px",
          fontSize: "1rem",
        }}
      >
        Go Home
      </Button>
    </Container>
  );
};

export default NotFound;
