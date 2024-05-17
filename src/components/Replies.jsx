import { Alert } from "react-bootstrap";

const Replies = ({ replies }) => {
  return (
    <div className="col-12 justify-content-start  d-flex flex-column ">
      {replies?.length > 0 ? (
        replies?.map((element) => (
          <div
            key={element._id}
            className=" col-10 my-2 border-top p-2 text-secondary"
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
