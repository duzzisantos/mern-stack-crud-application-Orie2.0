import { ImageFill } from "react-bootstrap-icons";
import { Carousel, Button, Modal, Alert, Card } from "react-bootstrap";
import { useState } from "react";

function DisplayImages({ show, handleClose, businessName, photo }) {
  const [index, setIndex] = useState(0);

  const handleSelectIndex = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
        className="custom-pry-color"
      >
        <Modal.Header closeButton>
          <Modal.Title className="h6">
            <ImageFill /> {businessName}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Carousel activeIndex={index} onSelect={handleSelectIndex}>
            {photo?.length > 0 ? (
              photo?.map((element, i) => (
                <Carousel.Item key={i}>
                  <Card.Img
                    style={{ height: "auto", maxWidth: "100%" }}
                    src={element?.image}
                    alt={businessName}
                  />
                </Carousel.Item>
              ))
            ) : (
              <Alert variant="light" className="text-center">
                No Images to view at this moment.
              </Alert>
            )}
          </Carousel>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between">
          <small>
            {photo?.length > 0 &&
              `${index + 1} of ${photo?.length} | Click extreme left or right to
            navigate`}
          </small>
          <Button
            variant="transparent"
            className="border border-secondary rounded-0"
            onClick={handleClose}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DisplayImages;
