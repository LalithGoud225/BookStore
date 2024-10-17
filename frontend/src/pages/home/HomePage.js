import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Header, Segment } from "semantic-ui-react";
import { useAuth } from "../../contexts/AuthContext";

const Homepage = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div style={{ paddingTop: "5em" }}>
      <Container>
        <Segment padded="very" vertical>
          <Header as="h1" size="huge" textAlign="center">
            Welcome to our Bookstore!
          </Header>
          <p style={{ fontSize: "1.1rem", textAlign: "center", color: "#333" }}>
            Explore our vast collection of books and find your next great read.
            From classic literature to contemporary bestsellers, we have
            something for every reader.
          </p>
          <p style={{ fontSize: "1.1rem", textAlign: "center", color: "#333" }}>
            Dive into captivating stories, expand your knowledge with
            informative non-fiction, or embark on adventures with thrilling
            fiction novels. Discover the joy of reading at our bookstore today!
          </p>
          {!isAuthenticated() && (
            <div style={{ textAlign: "center", marginTop: "2em" }}>
              <Button
                as={Link}
                to="/login"
                color="blue"
                style={{ backgroundColor: "#002147", color: "white" }}
              >
                Login
              </Button>
            </div>
          )}
        </Segment>
      </Container>
    </div>
  );
};

export default Homepage;
