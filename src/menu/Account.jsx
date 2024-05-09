import React from "react";
import { useState } from "react";
import axios from "axios";
import qs from "qs";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [signup, setSignUp] = useState({
    username: "",
    password: "",
    phone: "",
  });

  let navigate = useNavigate();
  const handleSubmit = () => {
    axios
      .post("http://localhost:8080/usersignsup", qs.stringify(signup), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) => {
        console.log(res.status);
        if (signup && res.status === 200) {
          navigate("/users/login", { replace: true });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="page-wrapper-form">
      <form
        className="signup-form"
        onSubmit={() => handleSubmit()}
        encType="multipart/formdata"
      >
        <h3>Sign Up</h3>
        <label htmlFor="username">User Name</label>
        <input
          type="text"
          id="username"
          name="username"
          spellCheck="none"
          required
          value={signup.username}
          onChange={(e) => setSignUp({ ...signup, username: e.target.value })}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          required
          id="password"
          name="password"
          value={signup.password}
          onChange={(e) => setSignUp({ ...signup, password: e.target.value })}
        />
        <label htmlFor="phone">Phone</label>
        <input
          type="tel"
          required
          id="phone"
          name="phone"
          value={signup.phone}
          onChange={(e) => setSignUp({ ...signup, phone: e.target.value })}
        />
        <button id="signup-btn">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
