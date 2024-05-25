import { Button, Col, Container, Form, FormGroup } from "react-bootstrap";
import { Filter, Globe } from "react-bootstrap-icons";

const FindCustomers = ({
  search,
  setSearch,
  setCity,
  setRegion,
  category,
  city,
  region,
  setCategories,
  handleGeneralSearch,
  handleNarrowSearch,
  handleResetGeneral,
  handleResetNarrow,
  validated,
  validatedNarrow,
  groupedData,
}) => {
  const regions = Object.keys(groupedData).map((element) => element);

  const getCitiesList = () => {
    const output = [];
    Object.values(groupedData).forEach((arr) => {
      arr.forEach((x) => {
        if (x.state === region) {
          output.push(x.city);
        }
      });
    });
    return [...new Set(output.map((y) => y))];
  };

  const getCategoriesList = () => {
    const output = [];
    Object.values(groupedData).forEach((arr) => {
      arr.forEach((x) => {
        if (x.city === city && x.state === region) {
          output.push(x.category);
        }
      });
    });
    return [...new Set(output.map((y) => y))];
  };

  return (
    <Container className="vstack gap-3">
      <Form
        className="d-flex flex-column col-12 vstack gap-3  search-vendors"
        noValidate
        onSubmit={handleGeneralSearch}
      >
        <Col className="col-9 mx-auto gap-2">
          <Form.Group>
            <Form.Label
              className="fs-2 fw-semibold"
              htmlFor="search-businesses"
            >
              Search for businesses
            </Form.Label>

            <h5 className="mx-auto mt-3">
              <Globe /> General search
            </h5>
            <Form.Control
              id="search-businesses"
              className="w-100 py-3 rounded-0"
              placeholder="Eg: Car Tyres"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              required
              isInvalid={validated && search === ""}
            />
            <Form.Control.Feedback type="invalid">
              {validated && search === "" && "Enter search value"}
            </Form.Control.Feedback>
          </Form.Group>

          <Col className="w-75 hstack mt-3">
            <Button
              className="custom-pry custom-pry-border rounded-0"
              onClick={handleGeneralSearch}
              type="submit"
            >
              Search
            </Button>
            <Button
              className="custom-pry-border bg-transparent custom-pry-color rounded-0 mx-2"
              onClick={handleResetGeneral}
            >
              Reset
            </Button>
          </Col>
        </Col>
      </Form>
      <hr className="border border-2 border-primary w-75 rounded-3  mx-auto my-3" />
      <h5 className="w-75 mx-auto">
        <Filter /> Narrow search
      </h5>
      <Form
        noValidate
        validated={validatedNarrow}
        onSubmit={handleNarrowSearch}
      >
        <Col
          id="narrow-search-items"
          lg={9}
          xs={9}
          sm={9}
          className="mx-auto d-flex flex-lg-row flex-md-column flex-sm-column gap-2"
        >
          <Col>
            <FormGroup>
              <Form.Label htmlFor="state-region">State/Region</Form.Label>
              <Form.Select
                id="state-region"
                className={`rounded-0 ${
                  validatedNarrow && region === "" && "remove-outline"
                }`}
                onChange={(e) => setRegion(e.target.value)}
                value={region}
                required
                isInvalid={validatedNarrow && region === ""}
              >
                <option>Select region/state</option>
                {regions?.map((element, index) => (
                  <option key={index}>{element}</option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {validatedNarrow && region === "" && "Select region/state"}
              </Form.Control.Feedback>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Form.Label htmlFor="city">City</Form.Label>
              <Form.Select
                id="city"
                className={`rounded-0 ${
                  validatedNarrow && city === "" && "remove-outline"
                }`}
                onChange={(e) => setCity(e.target.value)}
                required
                value={city}
                isInvalid={validatedNarrow && city === ""}
              >
                <option>Select city</option>
                {getCitiesList()?.map((element, index) => (
                  <option key={index}>{element}</option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {validatedNarrow && city === "" && "Select city"}
              </Form.Control.Feedback>
            </FormGroup>
          </Col>

          <Col>
            <FormGroup>
              <Form.Label htmlFor="category">Category</Form.Label>
              <Form.Select
                id="category"
                className={`rounded-0 ${
                  validatedNarrow && category === "" && "remove-outline"
                }`}
                onChange={(e) => setCategories(e.target.value)}
                value={category}
                isInvalid={validatedNarrow && category === ""}
                required
              >
                <option>Select category</option>
                {getCategoriesList()?.map((element, index) => (
                  <option key={index}>{element}</option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {validatedNarrow && category === "" && "Select category"}
              </Form.Control.Feedback>
            </FormGroup>
          </Col>
        </Col>
        <Col className="w-75 mx-auto hstack gap-2 mt-3">
          <Button
            type="submit"
            className="custom-pry custom-pry-border rounded-0"
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
    </Container>
  );
};

export default FindCustomers;
