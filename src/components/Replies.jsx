import { Alert } from "react-bootstrap";

const Replies = ({ replies }) => {
  return (
    <div className="col-12 justify-content-start bg-white p-4 mt-4 border border-2 border-secondary-subtle rounded-2 d-flex flex-column ">
      <strong>Responses </strong>
      {replies?.length > 0 ? (
        replies?.map((element) => (
          <div
            key={element._id}
            className=" col-10 my-2 border-bottom p-2 text-secondary"
          >
            <div className="hstack gap-2">
              <small className="fw-semibold text-dark">
                {element?.repliedBy}
              </small>
              <small className="smaller-class">{element.replyDate}</small>
            </div>
            <article>{element.replyBody}</article>
          </div>
        ))
      ) : (
        <Alert variant="warning">No replies yet!</Alert>
      )}
    </div>
  );
};

export default Replies;
