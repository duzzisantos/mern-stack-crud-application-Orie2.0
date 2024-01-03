import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, registerWithEmailAndPassword } from "./firebase";
import "../App.css";
import { Button, Form } from "react-bootstrap";
import { ArrowLeft } from "react-bootstrap-icons";

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

  useEffect(() => {
    if (loading) {
      return;
    } else if (user) {
      navigate("/home");
    }
  });

  return (
    <div>
      <div className="me-auto mx-3 d-flex">
        <a href="/" className="btn bg-transparent border border-secondary">
          <ArrowLeft /> Home
        </a>
      </div>
      <div className="d-flex flex-column justify-content-center align-items-center vh-100">
        <Form
          className="col-lg-5 col-md-4 p-4 shadow-sm border rounded-3 text-secondary"
          style={{ height: "fit-content" }}
        >
          <div className="justify-content-start d-flex flex-column">
            <h3 className="fw-bold">Sign up</h3>
            <Form.Label htmlFor="fullName">Full Name</Form.Label>
            <Form.Control
              type="text"
              id="fullName"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="justify-content-start d-flex flex-column">
            <Form.Label htmlFor="email">Email</Form.Label>
            <Form.Control
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="justify-content-start d-flex flex-column">
            <Form.Label htmlFor="password">Password</Form.Label>
            <Form.Control
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="hstack gap-2 d-flex mt-5 justify-content-between">
            <Button className="btn-success" onClick={register}>
              Signup
            </Button>
            <span className="register-span">
              Already have an account?{" "}
              <a href="/login" className="link">
                Login
              </a>{" "}
              now.
            </span>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Signup;
