import { Alert, Col } from "react-bootstrap";
import useGetCustomerMedia from "../api/useMediaUploads";

const CustomerPhotoGrid = ({ user }) => {
  const { photos } = useGetCustomerMedia(user);

  return (
    <Col xxl={12} className="mt-5">
      <h6>My Photos</h6>

      <div className="d-flex flex-wrap justify-content-sm-center justify-content-lg-start gap-2 bg-light p-4 photo-grid">
        {photos.length === 0 ? (
          <Alert className="p-2" variant="warning">
            No photos to display
          </Alert>
        ) : (
          photos.map((photo, index) => (
            <div key={index} className="border border-1 rounded-2">
              <img
                src={photo.image[0].imageURL}
                alt="Customer media uploads"
                loading="eager"
                height={200}
                width={265}
              />
            </div>
          ))
        )}
      </div>
    </Col>
  );
};

export default CustomerPhotoGrid;
