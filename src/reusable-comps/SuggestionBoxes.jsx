import { Card, CardBody, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const SuggestionBoxes = ({ title }) => {
  const navigate = useNavigate();
  return (
    <Card className="col-lg-3 col-md-10 rounded-0 shadow-sm border-0 d-flex justify-content-center py-3">
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
