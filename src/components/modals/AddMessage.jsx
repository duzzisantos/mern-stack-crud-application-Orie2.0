import { Form } from "react-bootstrap";
import { Book, BookFill, PenFill } from "react-bootstrap-icons";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { useState } from "react";
import { getHost } from "../../helpers/getHost";

function AddMessage({ show, handleClose, businessName, businessEmail, user }) {
  const [messageSubject, setMessageSubject] = useState("");
  const [messageContent, setMessageContent] = useState("");

  const formData = {
    messageBody: messageContent,
    subject: messageSubject,
  };

  const postObject = Object.assign(formData, {
    sendDate: new Date(Date.now()).toDateString(),
    clientUID: user.uid,
    sender: user.email,
    receiver: businessEmail,
  });

  const handleSubmit = () => {
    axios
      .post(`${getHost()}/api/direct-messages`, postObject, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      })
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
        className="custom-pry-color"
      >
        <Modal.Header closeButton>
          <Modal.Title className="h6">
            <PenFill /> Message to : {businessEmail}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="gap-2 vstack">
            <Form.Label htmlFor="title" className="fw-bold">
              <Book /> Subject
            </Form.Label>
            <Form.Control
              id="title"
              value={messageSubject}
              onChange={(e) => setMessageSubject(e.target.value)}
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
          <Button
            variant="transparent"
            className="custom-pry-border rounded-0"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            className="custom-pry-border custom-pry text-dark rounded-0"
            type="submit"
            onClick={handleSubmit}
            disabled={messageContent === "" || messageSubject === ""}
          >
            Send
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddMessage;
