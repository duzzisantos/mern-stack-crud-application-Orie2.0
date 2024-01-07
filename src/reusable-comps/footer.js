import "../App.css";
import React from "react";

const FooterComponent = () => {
  return (
    <footer className="col-12 bg-light mt-auto py-3 text-secondary">
      <div className="d-flex flex-row justify-content-center hstack gap-4">
        <small>Partners</small>
        <small>Terms & conditions</small>
        <small>Privacy policy</small>
        <small>Designed by Duzie Uche-Abba &copy; 2022</small>
      </div>
    </footer>
  );
};

export default FooterComponent;
