import { useState, useEffect } from "react";
import { Spinner, Alert } from "react-bootstrap";
import DesignedBackground from "./DesignedBackground";
import Businesses from "./Businesses";

function RenderResults({
  city,
  category,
  region,
  search,
  searchState,
  allRatings,
  cleansedData,
  narrowSearch,
  generalSearch,
  user,
  show,
  handleShow,
  handleClose,
  showMessageModal,
  grabEmail,
  handleCloseMessage,
  handleShowMessage,
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [showResults, setShowResults] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (
      ((city !== "" && category !== "" && region !== "") || search !== "") &&
      searchState
    ) {
      setTimeout(() => {
        setIsLoading(false);
        setShowResults(true);
      }, 1000);
    } else if (
      searchState &&
      (narrowSearch.length === 0 || generalSearch.length === 0)
    ) {
      setTimeout(() => {
        setIsLoading(false);
        setShowAlert(false);
      }, 1000);
    } else {
      setIsLoading(false);
    }
  }, [
    city,
    category,
    region,
    search,
    searchState,
    narrowSearch,
    generalSearch,
  ]);

  if (isLoading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  if (showResults) {
    return (
      <Businesses
        data={allRatings}
        ratingScore={cleansedData}
        narrowSearch={narrowSearch}
        generalSearch={generalSearch}
        user={user}
        showModal={show}
        handleShow={handleShow}
        handleClose={handleClose}
        showMessageModal={showMessageModal}
        grabEmail={grabEmail}
        handleCloseMessage={handleCloseMessage}
        handleShowMessage={handleShowMessage}
      />
    );
  }

  if (showAlert) {
    return (
      <Alert
        variant="info"
        className="w-75 mx-auto"
        style={{ height: "fit-content" }}
      >
        Oops! It seems your search item was not found. Please reset search and
        try again.
      </Alert>
    );
  }

  return <DesignedBackground />;
}

export default RenderResults;
