import { Alert } from "react-bootstrap";

const Replies = ({ replies }) => {
  return (
    <div className="col-12 justify-content-start bg-white p-4 mt-4 border rounded-2 d-flex flex-column ">
      <strong>Responses </strong>
      {replies?.length > 0 ? (
        replies?.map((element, index) => (
          <div
            key={element._id}
            className={`col-12 my-2 p-2 text-secondary rounded-${
              (index + 1) % 2 === 0
                ? "end-4  bg-light"
                : "start-4 bg-light-subtle"
            }`}
          >
            <div className="hstack d-flex gap-3 replied-by">
              <small className="fw-semibold text-dark">
                {element?.repliedBy}
              </small>{" "}
              <small className="smaller-class">{element.replyDate}</small>
            </div>
            <p className="text-wrap mt-2">{element.replyBody}</p>
          </div>
        ))
      ) : (
        <Alert variant="warning">No replies yet!</Alert>
      )}
    </div>
  );
};

export default Replies;
