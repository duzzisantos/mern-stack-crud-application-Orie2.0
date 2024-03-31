import { Card, Button, Form, ButtonGroup } from "react-bootstrap";
import {
  CheckCircleFill,
  HeartFill,
  BookmarkFill,
  ChatDotsFill,
} from "react-bootstrap-icons";
import TextComponent from "../components/TextComponent";
import { useState } from "react";
import {
  handleLikePost,
  handleRemoveUser,
  handleSaveBookmark,
  handleSaveComment,
  handleSendReport,
  handleUnlikePost,
} from "../api/timelineAPIs";
import CommentList from "../components/CommentList";
import MenuPopover from "./MenuPopover";
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
  const [showPopover, setShowPopover] = useState(false);
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

  //Finds out if of the current user has likes across the content on the page
  //This is vital for conditionally rendering the like and unlike buttons
  const hasLikes = likes.some((content) => content.isLiked);

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
          <MenuPopover
            show={showPopover}
            setShow={setShowPopover}
            children={
              <ButtonGroup vertical>
                <Button
                  type="submit"
                  onClick={() => handleRemoveUser(user, authorEmail)}
                  variant="transparent"
                  className="border-0 text-start smaller-text popover-btn rounded-0"
                >
                  Unfollow
                </Button>
                <Button
                  type="submit"
                  onClick={() => handleRemoveUser(user, authorEmail)}
                  variant="transparent"
                  className="border-0 text-start smaller-text popover-btn rounded-0"
                >
                  Block
                </Button>
                <Button
                  type="submit"
                  onClick={() => handleSendReport(authorEmail, id, user)}
                  variant="transparent"
                  className="border-0 text-start smaller-text popover-btn rounded-0"
                >
                  Report
                </Button>
              </ButtonGroup>
            }
          />
        </div>

        <article className="my-2">
          {contentBody ?? "Loading content..........."}
        </article>
        <div className="justify-content-start hstack mt-3 fw-light col-lg-2 col-sm-9">
          <Form>
            {!hasLikes ? ( //if any of the posts has likes - remove the like button - so the next click will trigger an unlike to prevent double likes
              <Button
                variant="transparent"
                className={`d-flex flex-column vstack social-button-1 ${
                  like ? "text-danger" : "text-secondary"
                }`}
                title="Like"
                type="button"
                onClick={() => handleLikePost(authorEmail, id, user, setLike)}
              >
                <HeartFill />
                <small>{likes.filter((el) => el.isLiked).length}</small>
              </Button>
            ) : (
              <Button
                variant="transparent"
                className={`d-flex flex-column vstack social-button-1 border-0  text-secondary`}
                title="Unlike"
                type="button"
                onClick={() => handleUnlikePost(authorEmail, id, user, setLike)}
              >
                <HeartFill />
                <small>{likes.filter((el) => el.isLiked).length}</small>
              </Button>
            )}
          </Form>
          <Form>
            <Button
              variant="transparent"
              className={`d-flex flex-column vstack social-button-2 border-0 ${
                bookmark ? "text-success" : "text-secondary"
              }`}
              title="Bookmark"
              type="button"
              onClick={() => handleSaveBookmark(authorEmail, id, setBookmark)}
            >
              <BookmarkFill />
              <small className="mx-1">{bookmarks === true ? 1 : 0}</small>
            </Button>
          </Form>
          <Button
            variant="transparent"
            className="d-flex flex-column vstack text-secondary social-button-3 border-0"
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
          handleSave={() =>
            handleSaveComment(authorEmail, id, replyContent, user)
          }
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
