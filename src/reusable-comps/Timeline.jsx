import { Card, Button, Form } from "react-bootstrap";
import {
  CheckCircleFill,
  ThreeDotsVertical,
  HeartFill,
  BookmarkFill,
  ChatDotsFill,
} from "react-bootstrap-icons";
import TextComponent from "../components/TextComponent";
import { useState } from "react";
import axios from "axios";
import CommentList from "../components/CommentList";
import useGetPostComments from "../api/useGetPostComments";

const Timeline = ({
  authorName,
  authorEmail,
  likes,
  bookmarks,
  contentImage,
  authorImage,
  businessCategory,
  contentBody,
  user,
  id,
}) => {
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [showCommentList, setShowCommentList] = useState(false);
  const [like, setLike] = useState(false);
  const [bookmark, setBookmark] = useState(false);

  const { comments } = useGetPostComments(authorEmail, id);

  function handleCloseCommenter() {
    setShowCommentForm(false);
  }

  function handleShowCommenter() {
    setShowCommentForm(!showCommentForm);
  }

  function handleSaveComment() {
    axios
      .post(
        `http://localhost:8080/api/user-posts/reply?userEmail=${authorEmail}&id=${id}`,
        {
          commentBody: replyContent,
          commentDate: `${new Date(Date.now()).toDateString()}`,
          commentBy: user.email,
        }
      )
      .then((res) => {
        console.log(res.status);
      })
      .catch((error) => console.log(error.message));
  }

  function handleSaveBookmark() {
    axios
      .post(
        `http://localhost:8080/api/user-posts/save-bookmark?userEmail=${authorEmail}&id=${id}`,
        {
          isBookmarked: true,
        }
      )
      .then((res) => {
        console.log(res.status);
        setBookmark(true);
      })
      .catch((error) => console.log(error.message));
  }

  function handleLikePost() {
    axios
      .post(
        `http://localhost:8080/api/user-posts/like-post?userEmail=${authorEmail}&id=${id}`,
        {
          dateLiked: `${new Date(Date.now()).toDateString()}`,
          likedUserName: authorEmail,
          isUnliked: false,
        }
      )
      .then((res) => {
        console.log(res.status);
        setLike(true);
      })
      .catch((error) => console.log(error.message));
  }

  return (
    <Card className="p-2 col-12 border-0 shadow-sm custom-pry-color">
      <fieldset className="d-flex flex-column px-2">
        <div className="d-flex justify-content-between">
          <div className="d-flex justify-content-start hstack gap-3">
            <legend
              style={{ height: "30px", width: "30px", borderRadius: "50px" }}
            >
              <img
                src={
                  authorImage ??
                  "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Mercedes-Logo.svg/1024px-Mercedes-Logo.svg.png"
                }
                alt="user"
                style={{ height: "30px", width: "30px", borderRadius: "50px" }}
              />
            </legend>
            <div className="d-flex flex-column">
              <small className="fw-bold mt-2">
                {authorName ?? "Mercedes Benz"}{" "}
                <CheckCircleFill className="custom-pry-color" />
              </small>
              <small className="text-secondary">
                {businessCategory ?? "Category X"}
              </small>
            </div>
          </div>
          <Button
            variant="transparent"
            id="More Info"
            className="rounded-pill"
            title="More Info"
            aria-label="More Info"
          >
            <ThreeDotsVertical />
          </Button>
        </div>

        <article className="my-2">
          {contentBody ?? "Loading content..........."}
        </article>
        <div className="justify-content-start hstack mt-3 fw-light col-lg-2 col-sm-9">
          <Form>
            <Button
              variant="transparent"
              className={`d-flex flex-column vstack social-button-1 ${
                like ? "text-danger" : "text-secondary"
              }`}
              title="Like"
              type="button"
              onClick={handleLikePost}
            >
              <HeartFill />
              <small>{likes?.length}</small>
            </Button>
          </Form>
          <Form>
            <Button
              variant="transparent"
              className={`d-flex flex-column vstack social-button-2 ${
                bookmark ? "text-success" : "text-secondary"
              }`}
              title="Bookmark"
              type="button"
              onClick={handleSaveBookmark}
            >
              <BookmarkFill />
              <small className="mx-1">{bookmarks === true ? 1 : 0}</small>
            </Button>
          </Form>
          <Button
            variant="transparent"
            className="d-flex flex-column vstack text-secondary social-button-3"
            title="Comment"
            onClick={() => {
              handleShowCommenter();
              setShowCommentList(false);
            }}
          >
            <ChatDotsFill />
            <small className="mx-1">{comments.length}</small>
          </Button>
        </div>
      </fieldset>
      {showCommentForm ? (
        <TextComponent
          handleClose={handleCloseCommenter}
          handleSave={handleSaveComment}
          setContent={setReplyContent}
          content={replyContent}
          title={"Post reply"}
        />
      ) : (
        <small
          className="smaller-text text-center text-secondary"
          style={{ cursor: "pointer" }}
          onClick={() => setShowCommentList(!showCommentList)}
        >
          {!showCommentList ? "View comments" : "Collapse comments"}
        </small>
      )}

      {showCommentList && <CommentList comments={comments} />}
    </Card>
  );
};

export default Timeline;
