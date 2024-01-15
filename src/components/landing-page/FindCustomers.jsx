import { Form } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";

const FindCustomers = ({ search, setSearch }) => {
  return (
    <Form className="d-flex flex-column col-12 vstack gap-3 align-items-center justify-content-center">
      <Form.Label className="fs-1 fw-semibold" htmlFor="search-businesses">
        <Search /> Search for businesses
      </Form.Label>
      <Form.Control
        id="search-businesses"
        className="w-75 py-3"
        placeholder="Eg: Car Tyres"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </Form>
  );
};

export default FindCustomers;
