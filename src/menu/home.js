import React from "react";
import "react-bootstrap";
import homePageData from "../reusable-comps/homepagedata";


const Home = () => {
  return (
    <div className="page-wrapper">
      <strong>
        {" "}
        <h1>Search And Connect With Vendors In Aba.</h1>
      </strong>
      {homePageData.map((data) => {
        const { id, text, photo } = data;
        return (
          <div className="large-box" key={id}>
            <div className="medium-box-photo">
              <img src={photo} alt="PagePicture" />
            </div>
            <div className="medium-box-text">
              <h3>{text}</h3>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
