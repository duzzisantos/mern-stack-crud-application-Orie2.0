import "../App.css";
import React from "react";
import {Link} from "react-router-dom"
// import Home from "../menu/home";
// import Admin from "../menu/admin";

const FooterComponent = () => {
  return (
    <div className="footer-wrapper">
      <ul className="footer-list">
          <li><Link to="admin" className="footer-link">Partners</Link></li>
          <li><Link to="home" className="footer-link">Terms & conditions</Link></li>
          <li><Link to="home" className="footer-link">Privacy policy</Link></li>
      </ul>
      {/* make sure you edit these routes */}
      {/* <Routes>
          <Route path="admin" element={<Admin/>}/>
          <Route path="home" element={<Home/>}/>
          <Route path="home" element={<Home/>}/>
      </Routes> */}
    </div>
  )
}

export default FooterComponent
