import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { getHost } from "../helpers/getHost";
import { PencilFill } from "react-bootstrap-icons";
import { encodeImageAsURL } from "../helpers/stringHelpers";

const ConnectWritePost = ({ user, authorName }) => {
  const [message, setMessage] = useState("");
  const [showTextArea, setShowTextArea] = useState(false);
  const [converted, setCoverted] = useState("");

  //Find all the current user's content posts
  useEffect(() => {
    const getUserPosts = async () => {
      try {
        const res = await axios.get(
          `${getHost()}/api/user-posts?userEmail=${user.email}`,
          {
            headers: {
              Authorization: `Bearer ${user.accessToken}`,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );
        if (res.status !== 200) {
          throw new Error(`${res.statusText}`);
        }
      } catch (err) {
        console.warn(err.message);
      }
    };
    getUserPosts();
  }, [user]);

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
      .then((res) => console.log(res.status))
      .catch((err) => console.log(err.message));
  };

  return (
    <>
      {!showTextArea && (
        <div
          className="py-2 px-2 border border-1 rounded-1 mb-2 d-flex hstack justify-content-between"
          onClick={() => setShowTextArea(true)}
          style={{ cursor: "pointer" }}
        >
          <small className="mx-2 my-2 fw-bolder custom-pry-text">
            Write post
          </small>
          <PencilFill />
        </div>
      )}
      {showTextArea && (
        <Form
          className="p-3 rounded-2 mb-3 bg-light shadow-sm vstack gap-2"
          onSubmit={handleSubmit}
        >
          <Form.Label htmlFor="writePost" className="fw-bolder">
            Write post
          </Form.Label>
          <Form.Control
            id="writePost"
            className="rounded-0"
            name="writepost"
            as={"textarea"}
            rows={2}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <Form.Control
            type="file"
            id="addImage"
            name="addImage"
            onChange={() => encodeImageAsURL("addImage", setCoverted)}
          />

          <div className="d-flex justify-content-between my-3">
            <Button
              size="sm"
              type="submit"
              className="custom-pry text-light border-0 rounded-0"
            >
              Post
            </Button>
            <Button
              size="sm"
              variant="transparent"
              className="rounded-0 custom-pry-border"
              onClick={() => setShowTextArea(false)}
            >
              Close
            </Button>
          </div>
        </Form>
      )}
    </>
  );
};

export default ConnectWritePost;
