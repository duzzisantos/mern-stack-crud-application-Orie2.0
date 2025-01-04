import { Col, Container, Row } from "react-bootstrap";
import { optionsArray } from "../helpers/hardCodedData";
import SuggestionBoxes from "../reusable-comps/SuggestionBoxes";

const Categories = ({ user }) => {
  return (
    <Container className="col-lg-12 col-sm-12 p-4 custom-pry-color">
      <h1 className="fs-3 fw-bold col-9 mx-4">Categories Overview</h1>
      <Row className="col-12 justify-content-center bottom-0 p-3">
        <Col className="d-flex flex-wrap ps-4 gap-3 text-center mt-3">
          {optionsArray.map((el, i) => (
            <SuggestionBoxes key={i} title={el} user={user} />
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default Categories;
