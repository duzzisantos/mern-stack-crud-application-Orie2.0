import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { db, auth, logout } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { query, collection, getDocs, where } from "firebase/firestore";
import React from "react";
import { Navbar, Container, Nav, Button, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  BuildingUp,
  CartCheckFill,
  ClockFill,
  HouseUpFill,
  PencilSquare,
  PersonFill,
  PlusCircleFill,
  Window,
} from "react-bootstrap-icons";
import { getHost } from "../helpers/getHost";

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
          `${getHost()}/api/signup?userEmail=${user.email}`,
          {
            headers: {
              Authorization: `Bearer ${user.accessToken}`,
            },
          }
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
  }, [user.email, user.accessToken]);

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      className="py-1 custom-pry py-4"
      sticky="top"
    >
      <Container className="col-lg-9 col-sm-12 pe-0">
        <Navbar.Brand as={Link} to="home" className="fw-bold mx-0">
          Dugam{"   "}
        </Navbar.Brand>
        <Navbar.Toggle
          className="text-bg-light me-sm-2 me-md-2 btn-outline-light"
          id="hamburger"
        />
        <Navbar.Collapse>
          <Nav className="me-auto flex-lg-row flex-md-column flex-sm-column">
            <Nav.Link as={Link} to="home">
              <HouseUpFill /> Home
            </Nav.Link>
            <Nav.Link as={Link} to="register">
              <PencilSquare /> Add Business
            </Nav.Link>
            <Nav.Link as={Link} to="vendors">
              <CartCheckFill /> Vendors
            </Nav.Link>
            <Nav.Link as={Link} to="connect">
              <PlusCircleFill /> Connect
            </Nav.Link>
            <Nav.Link as={Link} to="categories">
              <Window /> Categories
            </Nav.Link>
            <Nav.Link as={Link} to="admin">
              <BuildingUp /> My Business
            </Nav.Link>
          </Nav>

          <NavDropdown
            className="mx-lg-auto col-lg-3 col-sm-2 col-md-2 p-2"
            title="Profile"
          >
            <div className="p-2 smaller-text mx-1">
              <p>
                <PersonFill /> {customerData[0]?.userName ?? name}
              </p>
              <p>
                <ClockFill /> Last login: {user.metadata.lastSignInTime}
              </p>
              <Button
                size="sm"
                className="btn btn-warning mx-auto w-100 border-0"
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                title="Logout"
              >
                Logout
              </Button>
            </div>
          </NavDropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
