import { Alert, Col, Image } from "react-bootstrap";
import useGetCustomerMedia from "../api/useMediaUploads";

const CustomerPhotoGrid = ({ user }) => {
  const { photos } = useGetCustomerMedia(user);

  return (
    <Col xxl={12} className="mt-5">
      <h6>{photos.length} Photos</h6>

      <div className="d-flex flex-wrap justify-content-sm-center justify-content-lg-start gap-2 bg-light p-4 photo-grid">
        {photos.length === 0 ? (
          <Alert className="p-2" variant="warning">
            No photos to display
          </Alert>
        ) : (
          photos.map((photo, index) => (
            <div key={index} className="border border-1 rounded-2">
              <Image
                src={photo.image[0].imageURL}
                className="img-fluid"
                alt="Customer media uploads"
                loading="eager"
                height={200}
                width={250}
              />
            </div>
          ))
        )}
      </div>
    </Col>
  );
};

export default CustomerPhotoGrid;
