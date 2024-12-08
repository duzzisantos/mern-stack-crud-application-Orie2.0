import { Spinner, Alert, Button } from "react-bootstrap";
import Businesses from "./Businesses";

function RenderResults({
  search,
  searchState,
  allRatings,
  cleansedData,
  narrowSearch,
  generalSearch,
  user,
  show,
  handleShow,
  handleReset,
  handleClose,
  showMessageModal,
  grabEmail,
  handleCloseMessage,
  handleShowMessage,
}) {
  const isSuccess =
    (search || searchState) &&
    (generalSearch.length > 0 || narrowSearch.length > 0);

  if (isSuccess) {
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
  } else if (search && searchState) {
    return (
      <Alert
        variant="info"
        className="w-75 mx-auto justify-content-start d-flex hstack gap-5 border-0"
      >
        <Spinner />
        If loading persists, it could be that your search item was not found.{" "}
        <Button
          variant="transparent"
          className="border border-1 border-dark"
          onClick={handleReset}
        >
          Reset
        </Button>
      </Alert>
    );
  }
}

export default RenderResults;
