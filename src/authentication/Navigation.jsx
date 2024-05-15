import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { db, auth, logout } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { query, collection, getDocs, where } from "firebase/firestore";
import React from "react";
import { Navbar, Container, Nav, Button, NavDropdown } from "react-bootstrap";
import { ReactComponent as Brilliance } from "bootstrap-icons/icons/brilliance.svg";
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
// import { getHost } from "../helpers/getHost";

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
          `${
            process.env.NODE_ENV === "production"
              ? process.env.REACT_APP_SERVER
              : process.env.REACT_APP_LOCAL
          }/api/signup?userEmail=${user.email}`,
          {
            headers: {
              Authorization: `Bearer ${user.accessToken}`,
            },
            withCredentials: false,
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
    <Container fluid className="col-12 px-0">
      <Navbar className="py-1 custom-pry" sticky="top">
        <Container className="col-9 pe-0">
          <Navbar.Brand as={Link} to="home" className="fs-5 text-light mx-1">
            <span className=" position-relative">
              <Brilliance className="fs-5" />
              <Brilliance
                className="fs-5"
                style={{ marginTop: "-16px", marginLeft: "-8.5px" }}
              />
              <Brilliance className="fs-5" style={{ marginLeft: "-11px" }} />
            </span>
            Dugam
          </Navbar.Brand>
          <Navbar.Toggle />
          <Nav className="me-auto fw-bold hstack">
            <Nav.Link as={Link} to="home" className="text-light">
              <HouseUpFill /> Home
            </Nav.Link>
            <Nav.Link as={Link} to="register" className="text-light">
              <PencilSquare /> Add Business
            </Nav.Link>
            <Nav.Link as={Link} to="vendors" className="text-light">
              <CartCheckFill /> Vendors
            </Nav.Link>
            <Nav.Link as={Link} to="connect" className="text-light">
              <PlusCircleFill /> Connect
            </Nav.Link>
            <Nav.Link as={Link} to="categories" className="text-light">
              <Window /> Categories
            </Nav.Link>
            <Nav.Link as={Link} to="admin" className="text-light">
              <BuildingUp /> My Business
            </Nav.Link>
          </Nav>
          <div
            className="hstack gap-2 text-light rounded-5 border border-5"
            style={{ height: "40px", width: "70px" }}
          >
            <NavDropdown className="mx-auto" title="Me">
              <div className="p-2 smaller-text mx-1">
                <p>
                  <PersonFill /> {customerData[0]?.userName ?? name}
                </p>
                <p>
                  <ClockFill /> Last login: {user.metadata.lastSignInTime}
                </p>
                <Button
                  size="sm"
                  className="btn btn-secondary text-light mx-auto w-100 btn-outline-danger border-0"
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
          </div>
        </Container>
      </Navbar>
    </Container>
  );
};

export default Navigation;
