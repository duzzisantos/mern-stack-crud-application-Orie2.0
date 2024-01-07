import React from "react";
import { Container, Form } from "react-bootstrap";

const Vendors = ({ user }) => {
  return (
    <Container className="col-9 py-3 h-100">
      <h1 className="fs-4 fw-bold">Marketplace</h1>
      <div className="box-150 col-12 border justify-content-center align-items-center bottom-0 d-flex">
        <div className="col-9 text-center d-flex flex-column">
          <Form.Label htmlFor="search-vendor" className="fs-2 fw-bold">
            Search Vendors by category or name
          </Form.Label>
          <input
            className="py-2 px-3 border"
            id="search-vendor"
            type="search"
            role="search"
            placeholder="Search vendor  by category or name"
          />
        </div>
      </div>
    </Container>
  );
};

export default Vendors;
