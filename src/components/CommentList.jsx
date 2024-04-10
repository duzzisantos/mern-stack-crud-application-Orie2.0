import { Alert } from "react-bootstrap";

const CommentList = ({ comments }) => {
  return (
    <div className="col-12 justify-content-center align-items-center d-flex flex-column">
      {comments?.length > 0 ? (
        comments.map((element) => (
          <div
            key={element._id}
            className=" col-10 my-2 border-top p-2 text-secondary "
          >
            <small className="fw-semibold mb-3 text-dark">
              {element.commentBy.split("@")[0]} -{" "}
              <small className="smaller-class">{element.commentDate}</small>
            </small>
            <article>{element.commentBody}</article>
          </div>
        ))
      ) : (
        <Alert variant="warning" className="w-100">
          No comments yet!
        </Alert>
      )}
    </div>
  );
};

export default CommentList;
