import { Alert } from "react-bootstrap";

const ContentPhotos = ({ content }) => {
  return (
    <div className="d-flex flex-column vstack gap-2 shadow-sm rounded-2">
      <Alert variant="warning" className="border-0">
        Photo management coming soon. Watch this space!
      </Alert>
    </div>
  );
};

export default ContentPhotos;
