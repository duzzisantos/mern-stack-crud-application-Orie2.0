import { CalendarDateFill, PersonFill, StarFill } from "react-bootstrap-icons";

const RatingsTemplate = ({
  ratedBy,
  ratingsDate,
  ratingStars,
  ratingsTitle,
  ratingsContent,
}) => {
  return (
    <div className="d-flex flex-column vstack gap-1 p-3 shadow-sm rounded-0 my-3">
      <h2 className="fs-6 fw-bold">{ratingsTitle}</h2>
      <div className="d-flex vstack gap-1 smaller-text text-secondary">
        <div>
          {" "}
          <PersonFill /> <small>{ratedBy.split("@")[0]}</small>
        </div>
        <div>
          <CalendarDateFill /> <small>{ratingsDate}</small>
        </div>
      </div>

      <small>
        {[...Array(ratingStars).keys()].map((item) => (
          <StarFill key={item} className="custom-pry-color" />
        ))}
      </small>
      <p>{ratingsContent}</p>
    </div>
  );
};

export default RatingsTemplate;
