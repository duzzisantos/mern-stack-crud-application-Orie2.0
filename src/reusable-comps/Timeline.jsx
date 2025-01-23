import { Card, Button, Form, ButtonGroup } from "react-bootstrap";
import {
  CheckCircleFill,
  HeartFill,
  // BookmarkFill,
  ChatDotsFill,
  PersonCircle,
  Megaphone,
  TrashFill,
  PencilFill,
  PersonDashFill,
  XOctagonFill,
} from "react-bootstrap-icons";
import TextComponent from "../components/modals/TextComponent";
import { useState } from "react";
import {
  handleDeletePost,
  handleLikePost,
  handleRemoveUser,
  // handleSaveBookmark,
  handleSaveComment,
  handleSendReport,
  handleUnfollow,
  handleUnlikePost,
} from "../api/timelineAPIs";
import CommentList from "../components/CommentList";
import MenuPopover from "./MenuPopover";
import useGetPostComments from "../api/useGetPostComments";
import EditPost from "../components/modals/EditPost";

const Timeline = ({
  authorName,
  authorEmail,
  likes,
  bookmarks,
  isEdited,
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
  const [showEdit, setShowEdit] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [showCommentList, setShowCommentList] = useState(false);
  const [like, setLike] = useState(false);
  // const [bookmark, setBookmark] = useState(false);
  const { comments, refetchComments } = useGetPostComments(
    secondParty,
    id,
    token
  );

  function handleCloseCommenter() {
    setShowCommentForm(false);
    refetchComments();
  }

  function handleShowCommenter() {
    setShowCommentForm(!showCommentForm);
  }

  //Finds out if of the current user has likes across the content on the page
  //This is vital for conditionally rendering the like and unlike buttons
  const hasLikes = likes?.some((content) => content.isLiked);

  return (
    <Card className="p-2 col-12 border-0 shadow-sm rounded-0">
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
                {authorName} {"  "}
                <CheckCircleFill title={`${authorName} is verified`} />
              </small>

              <div className={`d-flex gap-${businessCategory ? "2" : "0"}`}>
                {" "}
                <small>{businessCategory ?? ""}</small>
                {businessCategory && isEdited ? " | " : ""}
                {isEdited && <small className="text-secondary">Edited</small>}
              </div>
            </div>
          </div>
          <MenuPopover
            show={showPopover}
            setShow={setShowPopover}
            children={
              <Form>
                <ButtonGroup vertical>
                  {user.email === authorEmail ? null : (
                    <>
                      <Button
                        type="button"
                        onClick={() => {
                          handleUnfollow(user, secondParty, token);
                        }}
                        variant="transparent"
                        className="border-0 text-start smaller-text popover-btn rounded-0 px-4"
                      >
                        <PersonDashFill /> Unfollow
                      </Button>
                      <Button
                        type="button"
                        onClick={() => {
                          handleRemoveUser(user, secondParty, token);
                        }}
                        variant="transparent"
                        className="border-0 text-start smaller-text popover-btn rounded-0 px-4"
                      >
                        <XOctagonFill /> Block
                      </Button>
                      <Button
                        type="button"
                        onClick={() => {
                          handleSendReport(id, user, secondParty, token);
                        }}
                        variant="transparent"
                        className="border-0 text-start smaller-text popover-btn rounded-0 px-4"
                      >
                        <Megaphone /> Report
                      </Button>
                    </>
                  )}
                  {user.email === authorEmail ? ( //current user can only have access to modifying their own resources
                    <>
                      {" "}
                      <Button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          handleDeletePost(user, id, token, refetch);
                          console.log(id);
                        }}
                        variant="transparent"
                        className="border-0 text-start smaller-text popover-btn rounded-0 px-4"
                      >
                        <TrashFill /> Delete
                      </Button>
                      <Button
                        type="button"
                        onClick={() => setShowEdit(!showEdit)}
                        variant="transparent"
                        className="border-0 text-start smaller-text popover-btn rounded-0 px-4"
                      >
                        <PencilFill /> Edit
                      </Button>
                    </>
                  ) : null}
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
          <Form>
            {!hasLikes ? ( //if any of the posts has likes - remove the like button - so the next click will trigger an unlike to prevent double likes
              <Button
                variant="transparent"
                className={`d-flex border-0 flex-column vstack social-button-1 ${
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
                className={`d-flex flex-column border-0 vstack social-button-1 border-0  text-secondary`}
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
          {/* <Form>
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
          showModal={showCommentForm}
          handleClose={handleCloseCommenter}
          handleSave={() =>
            handleSaveComment(secondParty, id, replyContent, user, token)
          }
          setContent={setReplyContent}
          content={replyContent}
          title={"Post your comment"}
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
      {showEdit && (
        <EditPost
          show={showEdit}
          setShow={setShowEdit}
          user={user}
          refetch={refetch}
          grabbedId={id}
          grabbedMessage={contentBody}
          grabbedImage={contentImage}
        />
      )}
    </Card>
  );
};

export default Timeline;
