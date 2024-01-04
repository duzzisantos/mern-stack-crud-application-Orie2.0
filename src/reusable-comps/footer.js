import "../App.css";
import React from "react";

// import Home from "../menu/home";
// import Admin from "../menu/admin";

const FooterComponent = () => {
  return (
    <div className="col-12 bg-black py-3 text-light">
      <div className="d-flex flex-row justify-content-center hstack gap-4">
        <small>Partners</small>
        <small>Terms & conditions</small>
        <small>Privacy policy</small>
        <small>Designed by Duzie Uche-Abba &copy; 2022</small>
      </div>
    </div>
  );
};

export default FooterComponent;
