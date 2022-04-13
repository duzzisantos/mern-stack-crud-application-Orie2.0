import React from "react";
import { useState } from "react";
import axios from "axios";
import qs from "qs";

const Login = () => {
  const [toLogin, setToLogin] = useState({
    username: "",
    password: "",
    phone: 0,
  });

  const handleSubmit = () => {
    axios
      .post("http://localhost:8080/userlogsin", qs.stringify(toLogin), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) => {
        console.log(res.statusText);
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
        <h3>Login</h3>
        <label htmlFor="username">UserName</label>
        <input
          type="text"
          className="username"
          name="username"
          spellCheck="none"
          required
          value={toLogin.username}
          onChange={(e) => setToLogin({ ...toLogin, username: e.target.value })}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          required
          className="password"
          name="password"
          value={toLogin.password}
          onChange={(e) => setToLogin({ ...toLogin, password: e.target.value })}
        />
        <label htmlFor="phone">Phone</label>
        <input
          type="tel"
          required
          className="phone"
          name="phone"
          value={toLogin.phone}
          onChange={(e) => setToLogin({ ...toLogin, phone: e.target.value })}
        />
        <button id="signup-btn" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
