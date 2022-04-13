import "./App.css";
import "react-bootstrap";
import React from "react";
import NavBarComponent from "./reusable-comps/navbar";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./menu/home";
import Register from "./menu/register";
import Vendors from "./menu/vendors";
import FooterComponent from "./reusable-comps/footer";
import Admin from "./menu/admin";
import Users from "./menu/users";
import EditVendor from "./menu/edit-vendor";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBarComponent />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="users/*" element={<Users />} />
          <Route path="register" element={<Register />} />
          <Route path="vendors" element={<Vendors />} />
          <Route path="admin/*" element={ < Admin />} />
          <Route path="/edit-vendor/:ID" element={<EditVendor />} />
        </Routes>

        <FooterComponent />
      </div>
    </BrowserRouter>
  );
}

export default App;
