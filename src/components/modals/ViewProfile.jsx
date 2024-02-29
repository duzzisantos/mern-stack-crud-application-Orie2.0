import { PersonFill } from "react-bootstrap-icons";
import BusinessCard from "../BusinessCard";
import { Modal } from "react-bootstrap";
import { averageRating } from "../../helpers/averageRating";

const ViewProfile = ({ show, setShow, rating, biz }) => {
  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      backdrop="static"
      keyboard={false}
      size="lg"
      className="custom-pry-color"
    >
      <Modal.Header closeButton aria-label="View user profile dialog">
        <Modal.Title>
          <PersonFill /> Profile
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {biz?.map((item, index) => {
          const {
            address,
            businessName,
            businessPhone,
            category,
            city,
            email,
            state,
            photos,
          } = item;
          return (
            <BusinessCard
              key={index}
              address={address}
              businessCategory={category}
              businessName={businessName}
              phone={businessPhone}
              city={city}
              businessEmailAddress={email}
              state={state}
              photo={photos}
              ratingScore={averageRating(rating) ?? 0}
              isModal={show}
            />
          );
        })}
      </Modal.Body>
    </Modal>
  );
};

export default ViewProfile;
