import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import useGetBusinesses from "../api/useGetBusinesses";
import useGetRatings from "../api/useGetRatings";
import BusinessCard from "../components/BusinessCard";
import { averageRating } from "../helpers/averageRating";

const Vendors = ({ user }) => {
  const [search, setSearch] = useState("");
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

  return (
    <Container fluid className="col-12 p-3 custom-pry-color">
      <div className="d-flex justify-content-center">
        <h1 className="fs-3 fw-bold col-9">Vendors</h1>
      </div>
      <div className="box-150 col-12 justify-content-center align-items-center bottom-0 d-flex">
        <div className="col-9 text-center d-flex flex-column">
          <Form.Label htmlFor="search-vendor" className="fs-4 fw-bold">
            Search Vendors by category or name
          </Form.Label>
          <div className="col-12 d-flex">
            <Form.Control
              id="search-businesses"
              className="w-100 py-3 rounded-0"
              placeholder="Eg: Car Tyres"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button size="lg" className="custom-pry border-0 rounded-0">
              Search
            </Button>
          </div>
        </div>
      </div>

      <div
        className="col-12 d-flex justify-content-center gap-2 flex-lg-row flex-sm-column flex-wrap"
        style={{ height: "1000px" }}
      >
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
              ratingScore={averageRating(element.email, businesses, rating)}
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
