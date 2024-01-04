import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { db, auth, logout } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { query, collection, getDocs, where } from "firebase/firestore";
import React from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { ReactComponent as Brilliance } from "bootstrap-icons/icons/brilliance.svg";
import { Link } from "react-router-dom";

const Navigation = () => {
  const [user, loading] = useAuthState(auth);
  const [customerData, setCustomerData] = useState([]);
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

  useEffect(() => {
    const getCustomer = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/signup?userEmail=${user.email}`
        );
        if (res.status !== 200) {
          throw new Error(`${res.status} ${res.statusText}`);
        } else {
          setCustomerData(res.data);
        }
      } catch (err) {
        console.warn(err.response);
      }
    };
    getCustomer();
  }, [user.email]);

  return (
    <Container fluid className="col-12 px-0">
      <Navbar className="py-0 custom-yellow" sticky="top">
        <Container>
          <Navbar.Brand as={Link} to="home" className="fs-2">
            Dugam
            <span className=" position-relative">
              <Brilliance className="fs-2" />
              <Brilliance
                className="fs-2"
                style={{ marginTop: "-24px", marginLeft: "-8.5px" }}
              />
              <Brilliance className="fs-2" style={{ marginLeft: "-11px" }} />
            </span>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Nav className="me-auto fw-bold hstack">
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
          </Nav>
          <div className="hstack gap-2">
            <small>{customerData[0]?.userName ?? name}</small>
            <Button
              size="sm"
              className="mx-auto custom-purple border-0"
              onClick={() => {
                logout();
                navigate("/");
              }}
            >
              Logout
            </Button>
          </div>
        </Container>
      </Navbar>
    </Container>
  );
};

export default Navigation;
