import React, { useState } from "react";
import { Container, Form } from "react-bootstrap";
import useGetBusinesses from "../api/useGetBusinesses";
import useGetRatings from "../api/useGetRatings";
import BusinessCard from "../components/BusinessCard";

const Vendors = ({ user }) => {
  const { businesses } = useGetBusinesses();
  const [show, setShow] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [grabEmail, setGrabEmail] = useState("");
  const { rating } = useGetRatings(user);

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = (email) => {
    setGrabEmail(email);
    setShow(true);
  };

  const handleCloseMessage = () => {
    setShowMessageModal(false);
  };

  const handleShowMessage = (email) => {
    setGrabEmail(email);
    setShowMessageModal(true);
  };

  const averageRating = (email) => {
    const output = [];
    businesses.flat().forEach((business) => {
      if (business.email === email) {
        for (const file of rating) {
          if (file.email === email) {
            output.push(file.ratingStars);
          }
        }
      }
    });
    return (
      output.map((element) => element).reduce((a, b) => a + b, 0) /
      rating.length
    );
  };

  return (
    <Container className="col-9 py-3 vh-100 custom-pry-color">
      <h1 className="fs-3 fw-bold">Marketplace</h1>
      <div className="box-150 col-12 justify-content-center align-items-center bottom-0 d-flex">
        <div className="col-9 text-center d-flex flex-column">
          <Form.Label htmlFor="search-vendor" className="fs-4 fw-bold">
            Search Vendors by category or name
          </Form.Label>
          <input
            className="py-2 px-3 border form-control"
            id="search-vendor"
            type="search"
            role="search"
            placeholder="Search vendor  by category or name"
          />
        </div>
      </div>
      <h2 className="fs-6 fw-normal mt-2">Viewing Okirika</h2>
      <div className="col-12 d-flex flex-lg-row flex-sm-column gap-3 flex-wrap pb-5">
        {businesses
          .flat()
          .filter((obj) => obj.email !== user.email)
          .map((element, index) => (
            <BusinessCard
              key={index}
              user={user}
              businessCategory={element.category}
              businessEmailAddress={element.email}
              businessName={element.businessName}
              address={element.address}
              city={element?.city}
              state={element?.state}
              phone={element?.businessPhone}
              photo={element.photo}
              ratingScore={averageRating(element.email)}
              showModal={show}
              handleClose={handleClose}
              grabEmail={grabEmail}
              handleShow={() => handleShow(element.email)}
              handleCloseMessage={handleCloseMessage}
              handleShowMessage={() => handleShowMessage(element.email)}
              showMessageModal={showMessageModal}
            />
          ))}
      </div>
    </Container>
  );
};

export default Vendors;
