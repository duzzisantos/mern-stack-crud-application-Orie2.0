import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Google, ArrowLeft } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading] = useAuthState(auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) navigate("/profile");
  });
  return (
    <div>
      <div className="me-auto mx-3 d-flex">
        <a href="/" className="btn bg-transparent border border-secondary">
          <ArrowLeft /> Home
        </a>
      </div>
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Form
          className="col-lg-5 col-md-4 p-4 shadow-sm border rounded-3 text-secondary"
          style={{ height: "fit-content" }}
        >
          <div className="justify-content-start d-flex flex-column">
            <h3 className="fw-bold">Login to Ventorify</h3>
            <Form.Label htmlFor="login-email">Email</Form.Label>
            <Form.Control
              type="text"
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
              id="login-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              title="Enter password"
            />
          </div>

          <Button
            size="md"
            variant="success"
            className="mt-3 d-block"
            onClick={() => {
              logInWithEmailAndPassword(email, password);
              navigate("/home");
            }}
            title="Login"
          >
            Login
          </Button>

          <div className="hstack gap-2 d-flex mt-5 justify-content-between">
            <Button
              onClick={() => {
                signInWithGoogle();
                navigate("/home");
              }}
              className="bg-transparent border border-secondary text-secondary"
              title="Sign in with Google"
            >
              Login with Google <Google />
            </Button>
            <a href={`/signup`}>Don't have an account?</a>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
