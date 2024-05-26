import { Card, Button, Form, ButtonGroup } from "react-bootstrap";
import {
  CheckCircleFill,
  // HeartFill,
  // BookmarkFill,
  ChatDotsFill,
  PersonCircle,
} from "react-bootstrap-icons";
import TextComponent from "../components/TextComponent";
import { useState } from "react";
import {
  // handleLikePost,
  handleRemoveUser,
  // handleSaveBookmark,
  handleSaveComment,
  handleSendReport,
  handleUnfollow,
  // handleUnlikePost,
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
  token,
  secondParty,
  id,
  refetch,
}) => {
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [showPopover, setShowPopover] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [showCommentList, setShowCommentList] = useState(false);
  // const [like, setLike] = useState(false);
  // const [bookmark, setBookmark] = useState(false);
  const { comments } = useGetPostComments(secondParty, id, token);

  function handleCloseCommenter() {
    setShowCommentForm(false);
  }

  function handleShowCommenter() {
    setShowCommentForm(!showCommentForm);
  }

  //Finds out if of the current user has likes across the content on the page
  //This is vital for conditionally rendering the like and unlike buttons
  // const hasLikes = likes?.some((content) => content.isLiked);

  return (
    <Card className="p-2 col-12 border-0 shadow-sm rounded-0 custom-pry-color">
      <fieldset className="d-flex flex-column px-2">
        <div className="d-flex justify-content-between">
          <div className="d-flex justify-content-start hstack gap-3">
            {authorImage ? (
              <div
                className="border"
                style={{
                  borderRadius: "50px",
                  height: "60px",
                  width: "60px",
                  backgroundImage: `url(${authorImage})`,
                  backgroundPosition: "center",
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                }}
              />
            ) : (
              <PersonCircle className="hstack mt-2 text-secondary fs-3" />
            )}

            <div className="d-flex flex-column">
              <small className="fw-bold mt-2">
                {authorName ?? "Mercedes Benz"}{" "}
                <CheckCircleFill className="custom-pry-color" />
              </small>
              <small className="text-secondary">{businessCategory ?? ""}</small>
            </div>
          </div>
          <MenuPopover
            show={showPopover}
            setShow={setShowPopover}
            children={
              <Form>
                <ButtonGroup vertical>
                  <Button
                    type="button"
                    onClick={() => {
                      handleUnfollow(user, secondParty, token);
                    }}
                    variant="transparent"
                    className="border-0 text-start smaller-text popover-btn rounded-0"
                  >
                    Unfollow
                  </Button>
                  <Button
                    type="button"
                    onClick={() => {
                      handleRemoveUser(user, secondParty, token);
                    }}
                    variant="transparent"
                    className="border-0 text-start smaller-text popover-btn rounded-0"
                  >
                    Block
                  </Button>
                  <Button
                    type="button"
                    onClick={() => {
                      handleSendReport(id, user, secondParty, token);
                    }}
                    variant="transparent"
                    className="border-0 text-start smaller-text popover-btn rounded-0"
                  >
                    Report
                  </Button>
                </ButtonGroup>
              </Form>
            }
          />
        </div>

        <article className="my-2 vstack">
          {contentBody ?? "Loading content..........."}
          {contentImage && (
            <img
              className="border w-100 rounded-1 mt-3"
              src={contentImage}
              alt=""
            />
          )}
        </article>
        <div className="justify-content-start hstack mt-3 fw-light col-lg-2 col-sm-9">
          {/* <Form>
            {!hasLikes ? ( //if any of the posts has likes - remove the like button - so the next click will trigger an unlike to prevent double likes
              <Button
                variant="transparent"
                className={`d-flex flex-column vstack social-button-1 ${
                  like ? "text-danger" : "text-secondary"
                }`}
                title="Like"
                type="button"
                onClick={() => {
                  handleLikePost(
                    secondParty,
                    id,
                    user,
                    setLike,
                    token,
                    refetch
                  );
                }}
              >
                <HeartFill />
                <small>{likes?.filter((el) => el.isLiked).length}</small>
              </Button>
            ) : (
              <Button
                variant="transparent"
                className={`d-flex flex-column vstack social-button-1 border-0  text-secondary`}
                title="Unlike"
                type="button"
                onClick={() => {
                  handleUnlikePost(
                    secondParty,
                    id,
                    user,
                    setLike,
                    token,
                    refetch
                  );
                }}
              >
                <HeartFill />
                <small>{likes?.filter((el) => el.isLiked).length}</small>
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
              onClick={() => {
                handleSaveBookmark(
                  secondParty,
                  id,
                  setBookmark,
                  token,
                  refetch
                );
              }}
            >
              <BookmarkFill />
              <small className="mx-1">{bookmarks === true ? 1 : 0}</small>
            </Button>
          </Form> */}
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
            handleSaveComment(secondParty, id, replyContent, user, token)
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
          {comments.length > 0 &&
            (!showCommentList ? "View comments" : "Collapse comments")}
        </small>
      )}

      {showCommentList && <CommentList comments={comments} />}
    </Card>
  );
};

export default Timeline;
