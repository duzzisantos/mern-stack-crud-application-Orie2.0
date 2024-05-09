import React, { useState } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";
import useGetBusinesses from "../api/useGetBusinesses";
import useGetAllRatings from "../api/useGetAllRatings";
import { useLocation } from "react-router-dom";
import BusinessCard from "../components/BusinessCard";
import getGeneralSearch from "../api/useGeneralSearch";

const Vendors = ({ user }) => {
  const [search, setSearch] = useState("");
  const { state } = useLocation();
  const [searchState, setSearchState] = useState(false);
  const [generalSearch, setGeneralSearch] = useState([]);
  const { businesses } = useGetBusinesses();
  const [show, setShow] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [grabEmail, setGrabEmail] = useState("");

  const { allRatings } = useGetAllRatings();

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

  const handleVendorSearch = () => {
    setSearchState(true);
    return getGeneralSearch(setGeneralSearch, search);
  };

  const cleansedData = (data, userEmail) => {
    const output = [];

    data.flat().forEach((item) => {
      if (userEmail === item?.ratingsOwner) {
        return output.push(item);
      }
    });

    return output;
  };

  return (
    <Container className="col-12 p-3 custom-pry-color">
      <div className="px-4 mx-2">
        <h1 className="fs-3 fw-bold col-9">Vendors</h1>
      </div>
      <div className="box-150  col-12 justify-content-center align-items-center bottom-0 d-flex">
        <div className="col-12 px-4 text-center d-flex flex-column">
          <Form.Label htmlFor="search-vendor" className="fs-4 fw-bold">
            Search Vendors by category or name
          </Form.Label>
          <div className="col-12 d-flex">
            <Form.Control
              id="search-vendor"
              className="w-100 py-3 rounded-0"
              placeholder="Eg: Car Tyres"
              value={search === "" && state !== "" ? state : search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button
              size="lg"
              className="custom-pry border-0 rounded-0"
              onClick={handleVendorSearch}
            >
              Search
            </Button>
            <Button
              size="lg"
              className="bg-transparent custom-pry-border text-dark rounded-0"
              onClick={() => setSearchState(false)}
            >
              Reset
            </Button>
          </div>
        </div>
      </div>

      <div
        className=" p-4 d-flex gap-3 flex-lg-row flex-sm-column flex-wrap"
        style={{ height: "fit-content" }}
      >
        {!searchState && businesses.length > 0 ? ( //render the initial view of selected vendors - especially those the current user is following
          businesses
            .flat()
            .filter((biz) => biz.email !== user.email)
            .map((element, index) => (
              <BusinessCard
                ratingScore={
                  cleansedData(allRatings, element.email)
                    .map((r) => r?.ratingStars)
                    .reduce((y, z) => y + z, 0) /
                  cleansedData(allRatings, element.email).length
                }
                key={index}
                user={user}
                secondParty={element.email}
                businessCategory={element.category}
                businessEmailAddress={element.email}
                businessName={element.businessName}
                address={element.address}
                city={element?.city}
                state={element?.state}
                phone={element?.businessPhone}
                photo={element.photo}
                showModal={show}
                handleClose={handleClose}
                grabEmail={grabEmail}
                handleShow={() => handleShow(element.email)}
                handleCloseMessage={handleCloseMessage}
                handleShowMessage={() => handleShowMessage(element.email)}
                showMessageModal={showMessageModal}
              />
            ))
        ) : searchState && generalSearch.length > 0 ? (
          generalSearch.map((element, index) => (
            <BusinessCard
              ratingScore={
                cleansedData(allRatings, element.email)
                  .map((r) => r?.ratingStars)
                  .reduce((y, z) => y + z, 0) /
                cleansedData(allRatings, element.email).length
              }
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
              showModal={show}
              handleClose={handleClose}
              grabEmail={grabEmail}
              handleShow={() => handleShow(element.email)}
              handleCloseMessage={handleCloseMessage}
              handleShowMessage={() => handleShowMessage(element.email)}
              showMessageModal={showMessageModal}
            />
          ))
        ) : (
          <div className="col-9">
            <Alert variant="transparent" className="fw-semibold">
              Unfortunately, vendors were{" "}
              <span className="text-danger">not found</span> pertaining to your
              search. Modify your search term and try again!
            </Alert>
          </div>
        )}
      </div>
    </Container>
  );
};

export default Vendors;
