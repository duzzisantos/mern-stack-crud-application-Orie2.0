import { Card, CardBody, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const SuggestionBoxes = ({ title, user }) => {
  const navigate = useNavigate();

  const handleVisit = () => {
    navigate(`/view-categories`, { state: title });
  };

  return (
    <Card className="col-lg-3 col-md-4 col-sm-4 shadow-sm border-0 rounded-0 d-flex justify-content-center p-3 card-hover suggestion-boxes">
      <h3 className="fs-5 fw-bold text-capitalize custom-pry-color">{title}</h3>
      <CardBody>
        {user === null || user === undefined ? (
          <a href="/login" className="text-decoration-none">
            Explore
          </a>
        ) : (
          <Button
            variant="transparent"
            className="text-primary border-0"
            onClick={handleVisit}
          >
            Explore
          </Button>
        )}
      </CardBody>
    </Card>
  );
};

export default SuggestionBoxes;
