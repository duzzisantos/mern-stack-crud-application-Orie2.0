import { Card, CardBody, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const SuggestionBoxes = ({ title }) => {
  const navigate = useNavigate();
  return (
    <Card
      className="col-lg-3 col-md-10 col-sm-12 rounded-1 border d-flex justify-content-center p-3"
      id="suggestion-boxes"
    >
      <h3 className="fs-5 fw-bold text-capitalize custom-pry-color">{title}</h3>

      <CardBody>
        <Button
          variant="transparent"
          className="text-primary border-0"
          onClick={() => navigate(`/view-categories`, { state: title })}
        >
          Explore
        </Button>
      </CardBody>
    </Card>
  );
};

export default SuggestionBoxes;
