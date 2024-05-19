import { Col, Container, Row } from "react-bootstrap";
import { optionsArray } from "../helpers/hardCodedData";
import SuggestionBoxes from "../reusable-comps/SuggestionBoxes";

const Categories = () => {
  return (
    <Container className="col-lg-12 col-sm-12 p-3 custom-pry-color">
      <h1 className="fs-3 fw-bold col-9 mx-3">Categories Overview</h1>
      <Row className="col-12 justify-content-center bottom-0 p-2">
        <Col className="d-flex flex-wrap ps-4 gap-3 text-center mt-3">
          {optionsArray.map((el, i) => (
            <SuggestionBoxes key={i} title={el} />
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default Categories;
