import React, { useState } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";
import useGetBusinesses from "../api/useGetBusinesses";
import useGetAllRatings from "../api/useGetAllRatings";
import { useLocation } from "react-router-dom";
import BusinessCard from "../components/BusinessCard";
import getGeneralSearch from "../api/useGeneralSearch";
import Skeleton from "../reusable-comps/Skeleton";

const Vendors = ({ user }) => {
  const [search, setSearch] = useState("");
  const { state } = useLocation();
  const [searchState, setSearchState] = useState(false);
  const [generalSearch, setGeneralSearch] = useState([]);
  const [show, setShow] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [grabEmail, setGrabEmail] = useState("");
  const { businesses } = useGetBusinesses(user?.accessToken);
  const { allRatings } = useGetAllRatings(user?.accessToken);

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
    return getGeneralSearch(setGeneralSearch, search, user?.accessToken);
  };

  const averageRating = (data, userEmail) => {
    const output = [];

    data.flat().forEach((item) => {
      if (userEmail === item?.ratingsOwner) {
        return output.push(item);
      }
    });

    return output;
  };

  const searchMatches = () => {
    const matches = businesses?.flat()?.some((element) => {
      const {
        address,
        businessName,
        businessPhone,
        category,
        city,
        email,
        firstName,
        lastName,
        state,
      } = element;

      return (
        search.toLowerCase().includes(address?.toLowerCase()) ||
        search.toLowerCase().includes(businessPhone?.toLowerCase()) ||
        search.toLowerCase().includes(businessName?.toLowerCase()) ||
        search.toLowerCase().includes(category?.toLowerCase()) ||
        search.toLowerCase().includes(city?.toLowerCase()) ||
        search.toLowerCase().includes(email?.toLowerCase()) ||
        search.toLowerCase().includes(firstName?.toLowerCase()) ||
        search.toLowerCase().includes(lastName?.toLowerCase()) ||
        search.toLowerCase().includes(state?.toLowerCase())
      );
    });

    return matches;
  };

  return (
    <Container className=" col-lg-12 col-sm-12" style={{ paddingTop: "80px" }}>
      <h1 className="fs-3 fw-bold col-9 mx-4">Vendors</h1>

      <div className="justify-content-center align-items-center bottom-0 d-flex">
        <div className="col-12 mb-5 px-4 text-center d-flex flex-column">
          <Form.Label
            htmlFor="search-vendor"
            className="fs-4 fw-bold mt-5 text-wrap text-start"
          >
            Search Vendors by category or name
          </Form.Label>
          <div className="col-12 d-flex flex-column">
            <Form.Control
              id="search-vendor"
              type="search"
              className="w-100 py-3 rounded-0"
              placeholder="Eg: Car Tyres"
              value={search === "" && state !== "" ? state : search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="mt-3 hstack gap-2">
              <Button
                className="custom-pry custom-pry-border text-dark rounded-0"
                onClick={handleVendorSearch}
                disabled={search === ""}
              >
                Search
              </Button>
              <Button
                className="bg-transparent custom-pry-border text-dark rounded-0"
                onClick={() => setSearchState(false)}
              >
                Reset
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div
        className=" p-4 d-flex gap-3 flex-lg-row flex-sm-column flex-wrap"
        style={{ height: "fit-content" }}
      >
        {businesses.flat().length === 0 ? (
          <Skeleton children={""} />
        ) : searchState && generalSearch.length === 0 ? (
          <Skeleton children={""} />
        ) : searchState && generalSearch.length > 0 ? (
          generalSearch.map((element, index) => (
            <BusinessCard
              ratingScore={
                averageRating(allRatings, element.email)
                  .map((r) => r?.ratingStars)
                  .reduce((y, z) => y + z, 0) /
                averageRating(allRatings, element.email).length.toFixed(1)
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
              secondParty={element.email}
            />
          ))
        ) : searchMatches() === false && searchState && search ? (
          <Alert>Search term was not found</Alert>
        ) : (
          businesses
            .flat()
            .filter((biz) => biz.email !== user.email)
            .map((element, index) => (
              <BusinessCard
                ratingScore={(
                  averageRating(allRatings, element.email)
                    .map((r) => r?.ratingStars)
                    .reduce((x, y) => x + y, 0) /
                  averageRating(allRatings, element.email).length
                ).toFixed(1)}
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
                photo={element.photos}
                showModal={show}
                handleClose={handleClose}
                grabEmail={grabEmail}
                handleShow={() => handleShow(element.email)}
                handleCloseMessage={handleCloseMessage}
                handleShowMessage={() => handleShowMessage(element.email)}
                showMessageModal={showMessageModal}
              />
            ))
        )}
      </div>
    </Container>
  );
};

export default Vendors;
