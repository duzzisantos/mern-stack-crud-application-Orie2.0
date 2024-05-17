import { Button, Col, Form } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";

const FindCustomers = ({
  search,
  setSearch,
  setCity,
  cities,
  setRegion,
  regions,
  setCategories,
  categories,
  handleGeneralSearch,
  handleNarrowSearch,
  handleResetGeneral,
  handleResetNarrow,
}) => {
  return (
    <Form className="d-flex flex-column col-12 vstack gap-3 align-items-center justify-content-center search-vendors">
      <Form.Label className="fs-2 fw-semibold" htmlFor="search-businesses">
        <Search /> Search for businesses
      </Form.Label>
      <Form.Group className="col-9 d-flex">
        <Form.Control
          id="search-businesses"
          className="w-100 py-3 rounded-0"
          placeholder="Eg: Car Tyres"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button
          className="custom-pry border-0 rounded-0"
          onClick={handleGeneralSearch}
        >
          Search
        </Button>
        <Button
          className="custom-pry-border bg-transparent custom-pry-color rounded-0"
          onClick={handleResetGeneral}
        >
          Reset
        </Button>
      </Form.Group>
      <Col className="d-flex flex-lg-row flex-sm-wrap gap-2 col-9">
        <Form.Select
          className="w-25 rounded-0"
          onChange={(e) => setCity(e.target.value)}
        >
          <option>Select city</option>
          {cities?.map((element, index) => (
            <option key={index} value={element}>
              {element}
            </option>
          ))}
        </Form.Select>
        <Form.Select
          className="w-25 rounded-0"
          onChange={(e) => setRegion(e.target.value)}
        >
          <option>Select region/state</option>
          {regions?.map((element, index) => (
            <option key={index} value={element}>
              {element}
            </option>
          ))}
        </Form.Select>
        <Form.Select
          className="w-25 rounded-0"
          onChange={(e) => setCategories(e.target.value)}
        >
          <option>Select category</option>
          {categories?.map((element, index) => (
            <option key={index} value={element}>
              {element}
            </option>
          ))}
        </Form.Select>

        <Button
          className="custom-pry border-0 rounded-0"
          onClick={handleNarrowSearch}
        >
          Go
        </Button>
        <Button
          className="custom-pry-border bg-transparent custom-pry-color rounded-0"
          onClick={handleResetNarrow}
        >
          Reset
        </Button>
      </Col>
    </Form>
  );
};

export default FindCustomers;
