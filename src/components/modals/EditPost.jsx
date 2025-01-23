import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Col, Form, Modal } from "react-bootstrap";
import { getHost } from "../../helpers/getHost";

import {
  encodeImageAsURL,
  getRemainingLimit,
} from "../../helpers/stringHelpers";
import { getBase64Size } from "../../helpers/getBase64Size";

const EditPost = ({
  user,
  refetch,
  grabbedMessage,
  grabbedId,
  grabbedImage,
  show,
  setShow,
}) => {
  const [message, setMessage] = useState("");

  const [converted, setCoverted] = useState("");

  const postObject = Object.assign(
    {
      contentBody: message,
    },
    {
      isEdited: true,
      contentImage: converted,
    }
  );

  useEffect(() => {
    setMessage(grabbedMessage);
    if (grabbedImage) {
      setCoverted(grabbedImage);
    }
  }, [grabbedMessage, grabbedImage]);

  const handleSubmit = () => {
    axios
      .post(
        `${getHost()}/api/user-posts/edit-post?userEmail=${
          user.email
        }&id=${grabbedId}`,
        postObject,
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
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
      {show && (
        <Modal
          show={show}
          onHide={() => setShow(!show)}
          backdrop="static"
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title className=" text-dark h5">Editing post</Modal.Title>
          </Modal.Header>
          <Modal.Body className="custom-pry-color">
            <Form className="p-0 rounded-2 mb-2 vstack gap-2">
              <Form.Label htmlFor="writePost" className="fw-bolder">
                Modify content
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
                  className="custom-pry text-dark border-0 rounded-3"
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

export default EditPost;
