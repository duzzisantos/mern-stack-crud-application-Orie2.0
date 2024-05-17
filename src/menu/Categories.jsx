import { Container } from "react-bootstrap";
import { optionsArray } from "../helpers/hardCodedData";
import SuggestionBoxes from "../reusable-comps/SuggestionBoxes";

const Categories = () => {
  return (
    <Container className="h-100 col-12 p-3 custom-pry-color">
      <div className="px-4 mx-2">
        <h1 className="fs-3 fw-bold col-9">Categories Overview</h1>
      </div>
      <div className="col-12 justify-content-center bottom-0">
        <div className="d-flex flex-wrap ps-4 gap-3 text-center mt-3">
          {optionsArray.map((el, i) => (
            <SuggestionBoxes key={i} title={el} />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Categories;
