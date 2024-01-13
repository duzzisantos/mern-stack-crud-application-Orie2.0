import { Form } from "react-bootstrap";
import { BookFill, CalendarFill, PenFill } from "react-bootstrap-icons";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { useState } from "react";

function AddMessage({ show, handleClose, businessEmail, user }) {
  const [messageSubject, setMessageSubject] = useState("");
  const [messageDate, setMessageDate] = useState("");

  const [messageContent, setMessageContent] = useState("");

  const formData = {
    messageBody: messageContent,
    sendDate: messageDate,
    subject: messageSubject,
  };

  const postObject = Object.assign(formData, {
    userEmail: businessEmail,
    sender: user.email,
  });

  const handleSubmit = () => {
    axios
      .post("http://localhost:8080/api/direct-messages", postObject)
      .then((res) => console.log(res.statusText))
      .catch((err) => console.warn(err.message));

    handleClose();
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
          <Modal.Title>Send message to customer: {businessEmail}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="gap-2 vstack">
            <Form.Label htmlFor="title" className="fw-bold">
              <PenFill /> Subject
            </Form.Label>
            <Form.Control
              id="title"
              value={messageSubject}
              onChange={(e) => setMessageSubject(e.target.value)}
            />

            <Form.Label className="fw-bold" htmlFor="messageDate">
              <CalendarFill /> Date
            </Form.Label>
            <input
              type="date"
              id="messageDate"
              className="py-1 px-1 form-control"
              value={messageDate}
              onChange={(e) => setMessageDate(e.target.value)}
            />
            <Form.Label className="fw-bold" htmlFor="messageContent">
              <BookFill /> Message
            </Form.Label>
            <Form.Control
              as={"textarea"}
              rows={3}
              id="messageContent"
              value={messageContent}
              onChange={(e) => setMessageContent(e.target.value)}
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Send
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddMessage;
