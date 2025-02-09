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
import Skeleton from "../reusable-comps/Skeleton";

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

  const commonClass = "pt-3 card-hover shadow-sm rounded border-5 border-info";

  return (
    <Container className="col-lg-9 col-sm-12" style={{ paddingTop: "80px" }}>
      <h1 className="fs-3 fw-bold text-start">My Business</h1>

      <Row
        lg={9}
        md={9}
        xs={10}
        sm={10}
        className="text-center gap-2 p-3 flex-lg-row flex-sm-column flex-md-column"
        id="admin-dashboard"
      >
        <Col className={commonClass}>
          <small className="h6 fw-bold">
            <PeopleFill className="text-info fs-1" /> Followers vs Following
          </small>
          {!followers.length && !following.length ? (
            <Skeleton />
          ) : (
            <p className="mt-4 h5">
              {followers[0]?.length}
              {" : "} {following[0]?.length}
            </p>
          )}
        </Col>

        <Col className={commonClass}>
          <small className="h6 fw-bold">
            <StarFill className="text-warning fs-1" /> Average Rating
          </small>
          {!rating.length ? (
            <p className="h5 mt-4">0</p>
          ) : (
            <p className="mt-4 h5">
              {isNaN(averageRating()) ? 0 : averageRating().toFixed(1)}
            </p>
          )}
        </Col>
        <Col className={commonClass}>
          <small className="h6 fw-bold">
            <BuildingsFill className="fs-1" /> Top Industry Interested
          </small>
          <p className="mt-4 h5">Fabrics</p>
        </Col>
      </Row>
      <Row id="manage-wrapper gap-3" className="mt-4">
        {!user ? (
          <Skeleton children={""} />
        ) : (
          <ManageBusiness biz={biz[0]} user={user} ratings={rating} />
        )}
        {!followers.length && !messages.length && !userContent.length ? (
          <Skeleton children={""} />
        ) : (
          <ManageFollowers
            followers={followers}
            content={userContent}
            messages={messages}
            user={user}
          />
        )}
      </Row>
    </Container>
  );
};

export default Admin;
