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

  const contentLength = narrowSearch.length ?? generalSearch.length;

  if (isSuccess) {
    return (
      <div className="bg-light mt-5 p-3">
        <h6 className="mx-3">
          {contentLength} Result{contentLength > 1 ? "s" : ""}
        </h6>
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
      </div>
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
