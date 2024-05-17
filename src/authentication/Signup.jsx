import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, registerWithEmailAndPassword } from "./firebase";
import "../App.css";
import { Button, Form } from "react-bootstrap";
import { ArrowLeft } from "react-bootstrap-icons";
import axios from "axios";
import { getHost } from "../helpers/getHost";

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

  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) navigate("/register");
  });

  return (
    <div className="col-12">
      <div className="mx-5 d-flex pt-3">
        <a href="/" className="text-decoration-none text-dark">
          <ArrowLeft /> Home
        </a>
      </div>
      <div className="d-flex flex-column justify-content-center align-items-center vh-100">
        <Form
          className="col-lg-5 col-md-4 p-4 shadow-sm border rounded-3 text-dark"
          style={{ height: "fit-content" }}
        >
          <div className="justify-content-start d-flex flex-column">
            <h3 className="fw-bold">Sign up to Dugam</h3>
            <Form.Label htmlFor="fullName">Full Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Eg: John Doe"
              id="fullName"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="justify-content-start d-flex flex-column">
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

          <div className="vstack gap-2 mt-4">
            <Button
              className="custom-purple border-0 w-25"
              onClick={() => {
                register();
                handleRegisterClient();
              }}
            >
              Signup
            </Button>
            <div className="text-dark hstack gap-3">
              <span>Already have an account? </span>
              <a href="/login" className="text-primary">
                Login
              </a>{" "}
              now.
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Signup;
