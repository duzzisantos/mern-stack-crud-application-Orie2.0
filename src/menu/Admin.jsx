import { Col, Container, Row } from "react-bootstrap";
import ManageBusiness from "../components/ManageBusiness";
import ManageFollowers from "../components/ManageFollowers";
import useGetFollowers from "../api/useGetFollowers";
import useGetFollowing from "../api/useGetFollowing";
import useGetOneBusiness from "../api/useGetOneBusiness";
import useGetRatings from "../api/useGetRatings";
import useGetAllUserContent from "../api/useGetUserPosts";
import useGetMessages from "../api/useGetMessages";
import { BuildingsFill, PeopleFill, StarFill } from "react-bootstrap-icons";

const Admin = ({ user }) => {
  const token = user.accessToken;
  const { followers } = useGetFollowers(user, token);
  const { following } = useGetFollowing(user, token);
  const { biz } = useGetOneBusiness(user, token);
  const { rating } = useGetRatings(user, token);
  const { userContent } = useGetAllUserContent(user, token);
  const { messages } = useGetMessages(user, token);

  const averageRating = () => {
    const output = [];
    for (const file of rating) {
      output.push(file.ratingStars);
    }
    return (
      output.map((element) => element).reduce((a, b) => a + b, 0) /
      rating.length
    );
  };

  return (
    <Container className="col-lg-9 col-sm-12 p-3 custom-pry-color">
      <h1 className="fs-3 fw-bold text-start">My Business</h1>

      <Row
        lg={9}
        md={9}
        xs={10}
        sm={10}
        className="text-center gap-2 p-3 flex-lg-row flex-sm-column flex-md-column"
        id="admin-dashboard"
      >
        <Col className="border pt-3">
          <small className="h5 fw-bold">
            <PeopleFill /> Followers vs Following
          </small>
          <p className="mt-4 fs-2">
            {followers[0]?.length}
            {" : "} {following[0]?.length}
          </p>
        </Col>
        <Col className="border pt-3">
          <small className="h5 fw-bold">
            <StarFill className="text-warning" /> Average Rating
          </small>
          <p className="mt-4 fs-2">
            {isNaN(averageRating()) ? 0 : averageRating()}
          </p>
        </Col>
        <Col className="border pt-3">
          <small className="h5 fw-bold">
            <BuildingsFill className="text-secondary" /> Top Industry Interested
          </small>
          <p className="mt-4 fs-2">Fabrics</p>
        </Col>
      </Row>
      <Row id="manage-wrapper">
        <ManageBusiness biz={biz[0]} user={user} ratings={rating} />
        <ManageFollowers
          followers={followers}
          content={userContent}
          messages={messages}
          user={user}
        />
      </Row>
    </Container>
  );
};

export default Admin;
