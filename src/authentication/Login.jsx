import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { ArrowLeft } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import loginPage from "../images/konigsstrasse.jpg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading] = useAuthState(auth);

  const navigate = useNavigate();

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
          <Form className="p-4 rounded-0 vh-100 mx-3 custom-pry text-light">
            <div className="justify-content-start d-flex flex-column">
              <h1 className="fw-bold h3">Login to Dugam</h1>
              <Form.Label htmlFor="login-email">Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Eg: john.doe@example.net"
                id="login-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                title="Enter email address"
              />{" "}
            </div>
            <div className="justify-content-start d-flex flex-column">
              <Form.Label htmlFor="login-password">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Must be at least 6 characters"
                id="login-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                title="Enter password"
              />
            </div>

            <Button
              size="md"
              className="mt-4 d-block bg-dark border-0"
              onClick={() => {
                logInWithEmailAndPassword(email, password);
                navigate("/home");
              }}
              title="Login"
              disabled={password === "" || email === ""}
            >
              Login
            </Button>

            <a
              className="btn bg-transparent text-dark border border-dark mt-4"
              href={`/signup`}
            >
              Don't have an account?
            </a>

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

export default Login;
