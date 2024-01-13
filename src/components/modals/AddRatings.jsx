import { Form } from "react-bootstrap";
import {
  BookFill,
  CalendarFill,
  PenFill,
  StarFill,
} from "react-bootstrap-icons";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { useState } from "react";

function AddRatings({ show, handleClose, businessEmail, user }) {
  const [ratingsTitle, setRatingsTitle] = useState("");
  const [ratingsDate, setRatingsDate] = useState("");
  const [ratingStars, setRatingStars] = useState(0);
  const [ratingsContent, setRatingsContent] = useState("");

  const formData = {
    ratingStars: ratingStars,
    ratingsContent: ratingsContent,
    ratingsDate: ratingsDate,
    ratingsTitle: ratingsTitle,
  };

  const postObject = Object.assign(formData, {
    userEmail: businessEmail,
    ratedBy: user.email,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/api/ratings", postObject)
      .then((res) => console.log(res.statusText))
      .catch((err) => console.warn(err.message));
  };
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add ratings for customer: {businessEmail}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="gap-2 vstack">
            <Form.Label htmlFor="title" className="fw-bold">
              <PenFill /> Title
            </Form.Label>
            <Form.Control
              id="title"
              value={ratingsTitle}
              onChange={(e) => setRatingsTitle(e.target.value)}
            />

            <Form.Label className="fw-bold" htmlFor="ratingsDate">
              <CalendarFill /> Date
            </Form.Label>
            <input
              type="date"
              id="ratingsDate"
              className="py-1 px-1 form-control"
              value={ratingsDate}
              onChange={(e) => setRatingsDate(e.target.value)}
            />
            <Form.Label className="fw-bold" htmlFor="ratingsContent">
              <BookFill /> Content
            </Form.Label>
            <Form.Control
              as={"textarea"}
              rows={3}
              id="ratingsContent"
              value={ratingsContent}
              onChange={(e) => setRatingsContent(e.target.value)}
            />
            <Form.Label className="fw-bold" htmlFor="ratingStars">
              <StarFill className="text-warning" /> Ratings (in stars)
            </Form.Label>
            <Form.Range
              min={1}
              max={5}
              value={ratingStars}
              onChange={(e) => setRatingStars(e.target.value)}
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Send
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddRatings;
