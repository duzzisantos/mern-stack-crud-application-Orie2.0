import "./App.css";
import "react-bootstrap";
import React from "react";
import Navigation from "./authentication/Navigation";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./authentication/firebase";
import Home from "./menu/Home";
import Vendors from "./menu/Vendors";
import Register from "./menu/Register";
import FooterComponent from "./reusable-comps/footer";
import Admin from "./menu/Admin";
import Connect from "./menu/Connect";
import EditVendor from "./menu/EditVendor";
import Login from "./authentication/Login";
import Signup from "./authentication/Signup";
import Followers from "./menu/Followers";
import Categories from "./menu/Categories";
import CategoryDescription from "./menu/CategoryDescription";

function App() {
  const [user] = useAuthState(auth);
  const { pathname } = window.location;

  //wrap everything with a user context to avoid too many prop drills
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
          ) : user && pathname === "/signup" ? (
            <Route path="/" element={<Home />} />
          ) : (
            user && (
              <>
                {" "}
                <Route path="/" element={<Home user={user} />} />
                <Route path="home" element={<Home user={user} />} />
                <Route path="register" element={<Register user={user} />} />
                <Route path="vendors" element={<Vendors user={user} />} />
                <Route path="connect" element={<Connect user={user} />} />
                <Route
                  path="categories"
                  element={<Categories user={user} />}
                ></Route>
                <Route
                  path="view-categories"
                  element={<CategoryDescription user={user} />}
                />
                <Route path="admin/*" element={<Admin user={user} />} />
                <Route
                  path="account-follow"
                  element={<Followers user={user} />}
                />
                <Route
                  path="/edit-vendor/:ID"
                  element={<EditVendor user={user} />}
                />
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
