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
  user,
}) => {
  return (
    <>
      <Card className="col-lg-5 shadow-lg border-0 business-card-hover">
        <Card.Header className="bg-transparent border-0 d-flex hstack justify-content-between">
          <Card.Title className="fw-bold mt-3" as={"h6"}>
            {businessName}
          </Card.Title>
          <Button variant="transparent" size="sm" className="border-0">
            <ThreeDotsVertical />
          </Button>
        </Card.Header>
        <Card.Body>
          <section className="border-4 border-bottom border-primary-subtle py-1 mb-2">
            <strong>
              <h6>Business photos</h6>
            </strong>
            {photo?.map((item) => (
              <Card.Img key={item?._id} src={item?.image} alt={businessName} />
            ))}
          </section>
          <ul className="lh-lg">
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
              <StarFill className="text-warning" /> Ratings score: {ratingScore}
            </li>
          </ul>
          <div className="d-flex justify-content-end gap-2">
            <Button
              size="sm"
              className="custom-pry border-0 px-2"
              onClick={handleShow}
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
    </>
  );
};

export default BusinessCard;