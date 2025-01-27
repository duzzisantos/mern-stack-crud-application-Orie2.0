import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, registerWithEmailAndPassword } from "./firebase";
import "../App.css";
import { Button, Form, Row, Col, Container } from "react-bootstrap";
import { ArrowLeft } from "react-bootstrap-icons";
import axios from "axios";
import { getHost } from "../helpers/getHost";
import loginPage from "../images/shopping-lady.jpg";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, loading] = useAuthState(auth);

  const navigate = useNavigate();

  const register = () => {
    if (!name) {
      alert("Please enter name!");
    } else {
      registerWithEmailAndPassword(name, email, password);
    }
  };

  const handleRegisterClient = () => {
    const postObject = {
      userId: `${Date.now()}`,
      userEmail: email,
      userName: name,
    };

    axios
      .post(`${getHost()}/api/signup`, postObject, {
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
        },
      })
      .then((res) => console.log(res.statusText))
      .catch((err) => console.log(err.message));
  };

  const handleRegistrationProcess = () => {
    register();

    setTimeout(() => {
      return handleRegisterClient();
    }, 2000);

    setTimeout(() => {
      return navigate("/register");
    }, 2500);
  };

  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) navigate("/home");
  });

  return (
    <Container className="col-12" fluid>
      <div className="mx-2 my-3 pt-3 d-flex">
        <a href="/" className="text-decoration-none text-dark">
          <ArrowLeft /> Home
        </a>
      </div>

      <Row className="custom-pry">
        <Col lg={3} md={6} sm={12} xs={12}>
          <Form className="p-4 rounded-0 vh-100 mx-3 custom-pry text-dark">
            <h3 className="fw-bold">Sign up to Dugam</h3>
            <div className="justify-content-start d-flex flex-column mb-2">
              <Form.Label htmlFor="fullName">Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Eg: John Doe"
                id="fullName"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="justify-content-start d-flex flex-column mb-2">
              <Form.Label htmlFor="email">Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Eg: john.doe@example.net"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="justify-content-start d-flex flex-column">
              <Form.Label htmlFor="password">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Must contain at least 6 characters"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button
              size="md"
              disabled={password === "" || email === "" || name === ""}
              className="mt-4 d-block custom-pry-btn rounded-0 border-0"
              onClick={handleRegistrationProcess}
            >
              Signup
            </Button>
            <a
              href="/login"
              className="btn bg-transparent border text-dark border-dark mt-4"
            >
              Already have an account? Login
            </a>{" "}
            <article className="mt-5">
              <h2 className="h6 fw-bold">About Dugam</h2>
              Dugam is a business directory platform that connects potential and
              actual buyers with registered vendors. It seeks to provide a
              spotlight on under-represented businesses, and establish new
              partnerships - enhancing the local economy.
            </article>
          </Form>
        </Col>
        <Col
          className="d-lg-flex d-md-flex d-sm-none bg-white"
          style={{
            backgroundImage: `url(${loginPage})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPositionY: "center",
          }}
        ></Col>
      </Row>
    </Container>
  );
};

export default Signup;
