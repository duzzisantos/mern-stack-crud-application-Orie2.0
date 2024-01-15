import { Button, Form } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";

const FindCustomers = ({ search, setSearch }) => {
  return (
    <Form className="d-flex flex-column col-12 vstack gap-3 align-items-center justify-content-center">
      <Form.Label className="fs-2 fw-semibold" htmlFor="search-businesses">
        <Search /> Search for businesses
      </Form.Label>
      <div className="col-9 d-flex">
        <Form.Control
          id="search-businesses"
          className="w-100 py-3 rounded-0"
          placeholder="Eg: Car Tyres"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button className="custom-pry border-0 rounded-0">Search</Button>
      </div>
      <div className="d-flex gap-2 col-9">
        <Form.Select className="w-25">
          <option>Query city</option>
          {["Aba", "Enugu", "Yenagoa"].map((element, index) => (
            <option key={index}>{element}</option>
          ))}
        </Form.Select>
        <Form.Select className="w-25">
          <option>Query category</option>
          {["Fabrics", "Groceries", "Insurance"].map((element, index) => (
            <option key={index}>{element}</option>
          ))}
        </Form.Select>
        <Button className="custom-pry border-0">Go</Button>
      </div>
    </Form>
  );
};

export default FindCustomers;
