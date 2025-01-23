import { Form } from "react-bootstrap";
import { Book, BookFill, StarFill } from "react-bootstrap-icons";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { useState } from "react";
import { getHost } from "../../helpers/getHost";

function AddRatings({ show, handleClose, businessEmail, user, secondParty }) {
  const [ratingsTitle, setRatingsTitle] = useState("");
  const [ratingStars, setRatingStars] = useState(0);
  const [ratingsContent, setRatingsContent] = useState("");

  const formData = {
    ratingStars: ratingStars,
    ratingsContent: ratingsContent,
    ratingsTitle: ratingsTitle,
  };

  const postObject = Object.assign(formData, {
    ratingsDate: new Date(Date.now()).toDateString(),
    clientUID: user.uid,
    ratedBy: user.email,
    ratingsOwner: secondParty,
  });

  const handleSubmit = () => {
    axios
      .post(`${getHost()}/api/ratings`, postObject, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      })
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
        className="custom-pry-color"
      >
        <Modal.Header closeButton>
          <Modal.Title className="h6">
            <StarFill /> Ratings for: {businessEmail}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="gap-2 vstack">
            <Form.Label
              className="fw-bold justify-content-between d-flex"
              htmlFor="ratingStars"
            >
              <div>
                <StarFill className="text-warning" /> Ratings (in stars)
              </div>
              <output>{ratingStars}</output>
            </Form.Label>
            <Form.Range
              min={0}
              max={5}
              value={ratingStars}
              onChange={(e) => setRatingStars(e.target.value)}
            />
            <Form.Label htmlFor="title" className="fw-bold">
              <Book /> Title
            </Form.Label>
            <Form.Control
              id="title"
              value={ratingsTitle}
              onChange={(e) => setRatingsTitle(e.target.value)}
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
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="transparent"
            className="custom-pry-border rounded-3"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            className="custom-pry-border custom-pry text-dark  rounded-3"
            onClick={handleSubmit}
            disabled={
              ratingStars === 0 || ratingsContent === "" || ratingsTitle === ""
            }
          >
            Send
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddRatings;
