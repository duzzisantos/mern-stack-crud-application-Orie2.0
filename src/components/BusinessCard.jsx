import { Button, Card } from "react-bootstrap";
import {
  BriefcaseFill,
  EnvelopeAtFill,
  GeoAltFill,
  StarFill,
  TelephoneInboundFill,
  ThreeDotsVertical,
} from "react-bootstrap-icons";
import AddRatings from "./modals/AddRatings";
import AddMessage from "./modals/AddMessage";

const BusinessCard = ({
  businessName,
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
  return (
    <>
      <Card
        className="col-lg-4 col-sm-12  shadow-lg border-0 rounded-3 business-card-hover custom-pry-color"
        style={{ height: "fit-content" }}
      >
        <Card.Header className="bg-transparent border-0 d-flex hstack justify-content-between">
          <Card.Title className="fw-bold mt-3" as={"h6"}>
            {businessName}
          </Card.Title>
          <Button variant="transparent" size="sm" className="border-0">
            <ThreeDotsVertical />
          </Button>
        </Card.Header>
        <Card.Body>
          <section
            className="border-4 border-bottom border-primary-subtle py-1 mb-2"
            style={{ height: "100px" }}
          >
            <strong>
              <h6>Business photos</h6>
            </strong>
            {photo?.map((item) => (
              <Card.Img key={item?._id} src={item?.image} alt={businessName} />
            ))}
          </section>
          <ul className="lh-lg" style={{ height: "200px" }}>
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
              <StarFill className="text-warning" /> Ratings: {ratingScore}
            </li>
          </ul>
          {!user ? null : ( //do not allow ratings on the home page if current client is not logged in
            <div className="d-flex justify-content-end gap-2 mt-auto">
              <Button
                size="sm"
                className="custom-pry-border bg-transparent custom-pry-color px-2"
                onClick={handleShowMessage}
              >
                Send message
              </Button>
              <Button
                size="sm"
                variant="transparent"
                className="border border-secondary px-2"
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
        />
      )}
      {showMessageModal && (
        <AddMessage
          show={showMessageModal}
          businessEmail={grabEmail}
          handleClose={handleCloseMessage}
          user={user}
        />
      )}
    </>
  );
};

export default BusinessCard;
