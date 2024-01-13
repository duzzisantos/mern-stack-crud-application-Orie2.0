import { StarFill } from "react-bootstrap-icons";

const RatingsTemplate = ({
  ratedBy,
  ratingsDate,
  ratingStars,
  ratingsTitle,
  ratingsContent,
}) => {
  return (
    <div className="d-flex flex-column vstack gap-2 p-3 shadow-sm rounded-2">
      <h2 className="fs-6 fw-bold">{ratingsTitle}</h2>
      <div className="d-flex justify-content-between text-secondary">
        <small>{ratedBy.split("@")[0]}</small>
        <small>{ratingsDate}</small>
      </div>

      <small>
        {[...Array(ratingStars).keys()].map((item) => (
          <StarFill key={item} className="text-warning" />
        ))}
      </small>
      <p>{ratingsContent}</p>
    </div>
  );
};

export default RatingsTemplate;
