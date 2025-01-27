import { Button, Card } from "react-bootstrap";
import {
  BriefcaseFill,
  EnvelopeAtFill,
  StarFill,
  GeoAltFill,
  TelephoneInboundFill,
  ImageFill,
} from "react-bootstrap-icons";
import AddRatings from "./modals/AddRatings";
import AddMessage from "./modals/AddMessage";
import { useState } from "react";
import DisplayImages from "./modals/DisplayImages";

const BusinessCard = ({
  businessName,
  secondParty,
  isModal,
  businessCategory,
  businessEmailAddress,
  grabEmail,
  address,
  city,
  state,
  phone,
  photo,
  ratingScore,
  showModal,
  handleClose,
  handleShow,
  showMessageModal,
  handleCloseMessage,
  handleShowMessage,
  user,
}) => {
  const [showImages, setShowImages] = useState(false);
  return (
    <>
      <Card
        className={`col-lg-${
          isModal ? 12 : 3
        } col-sm-12  shadow-sm border-0  rounded-0  shake-on-hover business-card`}
        style={{ height: "fit-content" }}
      >
        <Card.Header className="bg-transparent border-0 d-flex hstack justify-content-between">
          <Card.Title className="fw-bold" as={"h6"}>
            {businessName}
          </Card.Title>
        </Card.Header>
        <Card.Body>
          <section className="border-4 border-bottom border-primary-subtle mb-2">
            <Button
              variant="transparent"
              className="btn-sm custom-pry-bordered-btn text-dark mb-2 rounded-0"
              onClick={() => setShowImages(!showImages)}
            >
              <ImageFill /> View Photos
            </Button>
          </section>
          <ul className="lh-lg" style={{ height: "250px" }}>
            <li>
              <BriefcaseFill className="text-dark" /> Category:{" "}
              {businessCategory}
            </li>
            <li>
              <TelephoneInboundFill className="text-success" /> Phone: {phone}
            </li>
            <li>
              <EnvelopeAtFill className="text-primary" /> Email:{" "}
              {businessEmailAddress}
            </li>
            <li>
              <GeoAltFill className="text-primary" /> Address:{" "}
              {`${address}, ${city}, ${state}`}
            </li>
            <li>
              <StarFill className="text-warning" /> Ratings:{" "}
              {isNaN(ratingScore) ? "None received yet" : ratingScore}
            </li>
          </ul>
          {!user || user.email === businessEmailAddress ? null : ( //do not allow ratings on the home page if current client is not logged in or if rendered card pertains to current client
            <div className="d-flex justify-content-end gap-2 mt-auto">
              <Button
                size="sm"
                className="custom-pry-btn px-2  text-light rounded-0"
                onClick={handleShowMessage}
              >
                Send message
              </Button>
              <Button
                size="sm"
                variant="transparent"
                className="custom-pry-bordered-btn px-2 rounded-0"
                onClick={handleShow}
              >
                Add rating
              </Button>
            </div>
          )}
        </Card.Body>
      </Card>
      {showModal && (
        <AddRatings
          show={showModal}
          businessEmail={grabEmail}
          handleClose={handleClose}
          user={user}
          secondParty={grabEmail}
        />
      )}
      {showMessageModal && (
        <AddMessage
          show={showMessageModal}
          businessEmail={grabEmail}
          businessName={businessName}
          handleClose={handleCloseMessage}
          user={user}
        />
      )}

      {showImages && (
        <DisplayImages
          show={showImages}
          handleClose={() => setShowImages(!showImages)}
          businessName={businessName}
          photo={photo}
          user={user}
        />
      )}
    </>
  );
};

export default BusinessCard;
