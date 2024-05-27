import axios from "axios";
import { useState } from "react";
import { Button, Col, Form, Modal } from "react-bootstrap";
import { getHost } from "../helpers/getHost";
import { PencilFill } from "react-bootstrap-icons";
import { encodeImageAsURL, getRemainingLimit } from "../helpers/stringHelpers";
import { getBase64Size } from "../helpers/getBase64Size";

const ConnectWritePost = ({ user, authorName, refetch }) => {
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);
  const [converted, setCoverted] = useState("");

  const postObject = Object.assign(
    {
      contentBody: message,
    },
    {
      isBookmarked: false,
      likes: [{ likedUserName: "" }],
      userEmail: user?.email,
      authorEmail: user?.email,
      authorName: authorName,
      contentImage: converted,
    }
  );

  const handleSubmit = () => {
    axios
      .post(`${getHost()}/api/user-posts`, postObject, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res.status);
        refetch();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const fileSize = getBase64Size(converted);
  const characterLimit = getRemainingLimit(message, 255);

  return (
    <>
      {!show && (
        <div
          className="py-2 px-2 border border-1 rounded-1 mb-2 d-flex hstack justify-content-between"
          onClick={() => setShow(true)}
          style={{ cursor: "pointer" }}
        >
          <small className="mx-2 my-2 fw-bolder custom-pry-text">
            Write post
          </small>
          <PencilFill />
        </div>
      )}
      {show && (
        <Modal
          show={show}
          onHide={() => setShow(!show)}
          backdrop="static"
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title className="custom-pry-color h5">
              Write post
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="custom-pry-color">
            <Form className="p-0 rounded-2 mb-2 vstack gap-2">
              <Form.Label htmlFor="writePost" className="fw-bolder">
                Say something nice
              </Form.Label>
              <Form.Control
                id="writePost"
                className="rounded-0"
                name="writepost"
                as={"textarea"}
                rows={2}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                minLength={1}
                maxLength={255}
              />
              <Col className="d-flex justify-content-between">
                <Form.Text>Min. 255 characters</Form.Text>
                <Form.Text
                  className={`${characterLimit < 20 ? "text-danger" : ""}`}
                >
                  {characterLimit}
                </Form.Text>
              </Col>

              <Form.Control
                type="file"
                accept=".jpg, .jpeg, .png"
                id="addImage"
                name="addImage"
                onChange={() => encodeImageAsURL("addImage", setCoverted)}
              />

              <div className="d-flex justify-content-between">
                {" "}
                <Form.Text>Max Upload 100 KB.</Form.Text>
                {fileSize > 100000 && (
                  <div className="bg-warning-subtle px-2 rounded-2">
                    File cannot exceed 100 KB.
                  </div>
                )}
              </div>

              <div className="d-flex justify-content-between my-3">
                <Button
                  size="sm"
                  type="button"
                  className="custom-pry text-light border-0 rounded-3"
                  disabled={fileSize > 100000 || message === ""}
                  onClick={handleSubmit}
                >
                  Post
                </Button>
                <Button
                  size="sm"
                  variant="transparent"
                  className="rounded-3 custom-pry-border"
                  onClick={() => setShow(false)}
                >
                  Close
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

export default ConnectWritePost;
