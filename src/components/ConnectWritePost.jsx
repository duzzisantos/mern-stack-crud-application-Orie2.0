import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";

const ConnectWritePost = ({ user, authorName }) => {
  const [message, setMessage] = useState("");
  const [image, setImage] = useState("");
  const [showTextArea, setShowTextArea] = useState(false);

  //Find all the current user's content posts
  useEffect(() => {
    const getUserPosts = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/user-posts?userEmail=${user.email}`
        );
        if (res.status !== 200) {
          throw new Error(`${res.statusText}`);
        }
      } catch (err) {
        console.warn(err.message);
      }
    };
    getUserPosts();
  }, [user.email]);

  const postObject = Object.assign(
    {
      contentBody: message,
      contentImage: image,
    },
    {
      isBookmarked: false,
      likes: [{ likedUserName: "" }],
      userEmail: user?.email,
      authorEmail: user?.email,
      authorName: authorName,
    }
  );
  const handleSubmit = () => {
    axios
      .post("http://localhost:8080/api/user-posts", postObject)
      .then((res) => console.log(res.status))
      .catch((err) => console.log(err.message));
  };

  return (
    <>
      {!showTextArea && (
        <div
          className="py-2 px-2 border border-2 rounded-3 mb-2"
          onClick={() => setShowTextArea(true)}
          style={{ cursor: "pointer" }}
        >
          <p className="mx-2 my-2 fw-bolder text-secondary">Write post</p>
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
            name="writepost"
            as={"textarea"}
            rows={2}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <input
            type="file"
            id="addImage"
            name="addImage"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          <div className="d-flex justify-content-between my-3">
            <Button
              size="sm"
              type="submit"
              className="custom-pry text-light border-0"
            >
              Post
            </Button>
            <Button
              size="sm"
              variant="secondary"
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
