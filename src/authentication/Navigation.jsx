import "../App.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { db, auth, logout } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { query, collection, getDocs, where } from "firebase/firestore";
import React from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Navigation = () => {
  const [user, loading] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getUserName = async () => {
      try {
        const q = query(collection(db, "users"), where("uid", "==", user?.uid));
        const doc = await getDocs(q);
        const data = doc.docs[0].data();
        setName(data.name);
      } catch (err) {
        console.log(err);
      }
    };

    if (loading) {
      return;
    } else if (!user) {
      getUserName();
      return navigate("/login");
    }
  }, [loading, user, navigate]);

  //   const loginDate = Number(user.reloadUserInfo.lastLoginAt);
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
            <Nav.Link as={Link} to="register">
              Register
            </Nav.Link>
            <Nav.Link as={Link} to="vendors">
              Vendors
            </Nav.Link>
            <Nav.Link as={Link} to="admin">
              Admin
            </Nav.Link>
            <span>{name}</span>
            <Button
              onClick={() => {
                logout();
                navigate("/");
              }}
            >
              Logout
            </Button>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Navigation;
