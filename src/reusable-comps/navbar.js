import "../App.css";
import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavBarComponent = () => {
  return (
    <>
      <Navbar bg="warning" fixed>
        <Container>
          <Navbar.Brand as={Link} to="home" className="fs-2">
            Dugam
          </Navbar.Brand>
          <Navbar.Toggle />
          <Nav className="me-auto fw-bold">
            <Nav.Link as={Link} to="home">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="users">
              My Account
            </Nav.Link>
            <Nav.Link as={Link} to="register">
              Register
            </Nav.Link>
            <Nav.Link as={Link} to="vendors">
              Vendors
            </Nav.Link>
            <Nav.Link as={Link} to="admin">
              Admin
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBarComponent;
