import { Col, Spinner } from "react-bootstrap";

const Skeleton = ({ children }) => {
  return (
    <Col lg={12} sm={12}>
      <Spinner animation="border" variant="secondary" />
      {children}
    </Col>
  );
};

export default Skeleton;
