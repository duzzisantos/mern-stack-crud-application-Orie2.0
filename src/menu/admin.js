import { Container } from "react-bootstrap";
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
  const commonBoxClasses =
    "business-card-hover  custom-pry-color rounded-2 border box-150 py-2 fw-bold col-lg-4 col-sm-12 text-center";
  const commonBiggerBoxclasses =
    "box-650 py-2 border rounded-2 business-card-hover custom-pry-color col-lg-6 col-sm-12 vstack";
  const commonFlexClasses =
    "d-flex flex-lg-row flex-sm-column hstack flex-wrap flex-lg-nowrap gap-2";

  const commonHeaderClasses = "text-center fs-6 fw-bold custom-pry-color";

  const { followers } = useGetFollowers(user);
  const { following } = useGetFollowing(user);
  const { biz } = useGetOneBusiness(user.email);
  const { rating } = useGetRatings(user.email);
  const { userContent } = useGetAllUserContent(user);
  const { messages } = useGetMessages(user);

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
    <Container className="h-100 col-9 p-3 box-fit custom-pry-color">
      <h1 className="fs-3 fw-bold text-start">My Business</h1>
      <div className="vstack gap-5  h-100">
        <div className={commonFlexClasses}>
          <div className={commonBoxClasses}>
            <h2 className={commonHeaderClasses}>
              <PeopleFill /> Followers vs Following
            </h2>
            <p className="mt-4 fs-1">
              {followers[0]?.length}
              {" : "} {following[0]?.length}
            </p>
          </div>
          <div className={commonBoxClasses}>
            <h2 className={commonHeaderClasses}>
              <StarFill className="text-warning" /> Average Rating
            </h2>
            <p className="mt-4 fs-1">
              {isNaN(averageRating()) ? 0 : averageRating()}
            </p>
          </div>
          <div className={commonBoxClasses}>
            <h2 className={commonHeaderClasses}>
              <BuildingsFill className="text-secondary" /> Top Industry
              Interested
            </h2>
            <p className="mt-4 fs-1">Fabrics</p>
          </div>
        </div>
        <div className="d-flex flex-lg-row flex-sm-column hstack flex-wrap flex-lg-nowrap gap-4">
          <ManageBusiness
            biz={biz[0]}
            user={user}
            ratings={rating}
            commonBiggerBoxclasses={commonBiggerBoxclasses}
            commonHeaderClasses={commonHeaderClasses}
          />
          <ManageFollowers
            followers={followers}
            content={userContent}
            commonBiggerBoxclasses={commonBiggerBoxclasses}
            commonHeaderClasses={commonHeaderClasses}
            messages={messages}
            user={user}
          />
        </div>
      </div>
    </Container>
  );
};

export default Admin;
