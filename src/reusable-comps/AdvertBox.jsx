import { Card, Button } from "react-bootstrap";

const AdvertBox = ({ title, content, image }) => {
  return (
    <Card style={{ width: "20rem" }} className="custom-pry-color">
      <Card.Img variant="top" src={image} />
      <Card.Body>
        <Card.Title as={"h6"}>{title}</Card.Title>
        <Card.Text>
          <small>{content}</small>
        </Card.Text>
        <Button
          size="sm"
          className="custom-pry-border bg-transparent custom-pry-color"
        >
          Discover
        </Button>
      </Card.Body>
    </Card>
  );
};

export default AdvertBox;
