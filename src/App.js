import "./App.css";
import "react-bootstrap";
import React from "react";
import Navigation from "./authentication/Navigation";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./authentication/firebase";
import Home from "./menu/Home";
import Vendors from "./menu/vendors";
import Register from "./menu/register";
import FooterComponent from "./reusable-comps/footer";
import Admin from "./menu/admin";
import Connect from "./menu/Connect";
import EditVendor from "./menu/edit-vendor";
import Login from "./authentication/Login";
import Signup from "./authentication/Signup";
import Followers from "./menu/Followers";
import Categories from "./menu/Categories";
import CategoryDescription from "./menu/CategoryDescription";

function App() {
  const [user] = useAuthState(auth);
  const { pathname } = window.location;

  return (
    <BrowserRouter>
      <div className="App vh-100">
        {user && <Navigation />}
        <Routes>
          {!user && pathname === "/login" ? (
            <Route path="/login" element={<Login />} />
          ) : !user && pathname === "/signup" ? (
            <Route path="/signup" element={<Signup />} />
          ) : !user && pathname === "/" ? (
            <Route path="/" element={<Home />} />
          ) : (
            user && (
              <>
                {" "}
                <Route path="/" element={<Home />} />
                <Route path="home" element={<Home />} />
                <Route path="register" element={<Register user={user} />} />
                <Route path="vendors" element={<Vendors user={user} />} />
                <Route path="connect" element={<Connect user={user} />} />
                <Route path="categories" element={<Categories />}></Route>
                <Route
                  path="view-categories"
                  element={<CategoryDescription />}
                />
                <Route path="admin/*" element={<Admin user={user} />} />
                <Route
                  path="account-follow"
                  element={<Followers user={user} />}
                />
                <Route path="/edit-vendor/:ID" element={<EditVendor />} />
              </>
            )
          )}
        </Routes>

        <FooterComponent />
      </div>
    </BrowserRouter>
  );
}

export default App;
