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
    if (user) navigate("/home");
  });
  return (
    <div className="col-12">
      <div className="mx-5 pt-3 d-flex">
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
            <h3 className="fw-bold">Login to Dugam</h3>
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
            variant="warning"
            className="mt-4 d-block"
            onClick={() => {
              logInWithEmailAndPassword(email, password);
              navigate("/home");
            }}
            title="Login"
          >
            Login
          </Button>

          <div className="hstack gap-2 d-flex mt-4 justify-content-between">
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
