import { Form } from "react-bootstrap";
import { BookFill, CalendarFill, PenFill } from "react-bootstrap-icons";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { useState } from "react";

function ReplyMessage({
  show,
  handleClose,
  user,
  sender,
  messageId,
  repliedBy,
}) {
  const [replyDate, setReplyDate] = useState("");
  const [replyBody, setReplyBody] = useState("");
  const formData = Object.assign(
    {
      replyDate: replyDate,
      replyBody: replyBody,
    },
    { repliedBy: repliedBy }
  );

  const handleSubmit = () => {
    axios
      .post(
        `http://localhost:8080/api/direct-messages/reply?userEmail=${user.email}&id=${messageId}`,
        formData
      )
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
          <Modal.Title>Replying message to customer: {sender}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="gap-2 vstack">
            <Form.Label htmlFor="repliedBy" className="fw-bold">
              <PenFill /> Responder
            </Form.Label>
            <Form.Control id="repliedBy" defaultValue={repliedBy} />

            <Form.Label className="fw-bold" htmlFor="replyDate">
              <CalendarFill /> Response Date
            </Form.Label>
            <input
              type="date"
              id="replyDate"
              className="py-1 px-1 form-control"
              value={replyDate}
              onChange={(e) => setReplyDate(e.target.value)}
            />
            <Form.Label className="fw-bold" htmlFor="replyBody">
              <BookFill /> Message
            </Form.Label>
            <Form.Control
              as={"textarea"}
              rows={3}
              id="replyBody"
              value={replyBody}
              onChange={(e) => setReplyBody(e.target.value)}
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="transparent"
            className="border border-secondary"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            variant="transparent"
            className="custom-pry-border"
            onClick={handleSubmit}
          >
            Send
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ReplyMessage;
