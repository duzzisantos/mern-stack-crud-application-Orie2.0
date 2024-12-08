import { Form } from "react-bootstrap";
import { BookFill, PenFill, PersonFill } from "react-bootstrap-icons";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { useState } from "react";
import { getHost } from "../../helpers/getHost";

function ReplyMessage({
  show,
  handleClose,
  user,
  sender,
  messageId,
  repliedBy,
  secondParty,
}) {
  const [replyBody, setReplyBody] = useState("");
  const formData = Object.assign(
    {
      replyDate: new Date(Date.now()).toDateString(),
      replyBody: replyBody,
    },
    { repliedBy: repliedBy }
  );

  const handleSubmit = () => {
    axios
      .post(
        `${getHost()}/api/direct-messages/reply?clientUID=${secondParty}&id=${messageId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
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
          <Modal.Title className="h6">
            <PenFill /> Replying: {sender}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="gap-2 vstack">
            <Form.Label htmlFor="repliedBy" className="fw-bold">
              <PersonFill /> Responder (me)
            </Form.Label>
            <Form.Control id="repliedBy" defaultValue={repliedBy} />

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
            className="custom-pry-border rounded-3 custom-pry-color"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            className="custom-pry-border custom-pry"
            onClick={handleSubmit}
            disabled={replyBody === "" || repliedBy === ""}
          >
            Send
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ReplyMessage;
