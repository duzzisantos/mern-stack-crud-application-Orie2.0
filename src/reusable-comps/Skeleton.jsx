import { Col, Spinner } from "react-bootstrap";

const Skeleton = ({ children }) => {
  return (
    <Col className="d-flex gap-2 justify-content-center">
      <Spinner size="lg" animation="border" variant="warning" />
      {children}
    </Col>
  );
};

export default Skeleton;
