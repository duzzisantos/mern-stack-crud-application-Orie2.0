import { Container } from "react-bootstrap";
import ManageBusiness from "../components/ManageBusiness";
import ManageFollowers from "../components/ManageFollowers";
import useGetFollowers from "../api/useGetFollowers";
import useGetFollowing from "../api/useGetFollowing";
import useGetOneBusiness from "../api/useGetOneBusiness";
const Admin = ({ user }) => {
  const commonBoxClasses =
    "business-card-hover rounded-2 shadow-lg box-150 py-2 fw-bold col-lg-4 col-sm-12 text-center";
  const commonBiggerBoxclasses =
    "box-650 py-2 shadow-lg rounded-2 business-card-hover col-lg-6 col-sm-12 vstack";
  const commonFlexClasses =
    "d-flex flex-lg-row flex-sm-column hstack flex-wrap flex-lg-nowrap gap-2";

  const commonHeaderClasses = "text-center fs-6 fw-bold";

  const { followers } = useGetFollowers(user);
  const { following } = useGetFollowing(user);
  const { business } = useGetOneBusiness(user);
  return (
    <Container className="h-100 col-9 p-3 box-fit">
      <h1 className="fs-3 fw-bold text-start">My Business</h1>
      <div className="vstack gap-5  h-100">
        <div className={commonFlexClasses}>
          <div className={commonBoxClasses}>
            <h2 className={commonHeaderClasses}>Followers vs Following</h2>
            <p className="mt-5 fs-2">
              {followers?.length}
              {" : "} {following?.length}
            </p>
          </div>
          <div className={commonBoxClasses}>
            <h2 className={commonHeaderClasses}>Average Rating</h2>
            <p className="mt-5 fs-2">3.9</p>
          </div>
          <div className={commonBoxClasses}>
            <h2 className={commonHeaderClasses}>Top Industry Interested</h2>
            <p className="mt-5 fs-2">Fabrics</p>
          </div>
        </div>
        <div className={commonFlexClasses}>
          <ManageBusiness
            business={business}
            commonBiggerBoxclasses={commonBiggerBoxclasses}
            commonHeaderClasses={commonHeaderClasses}
          />
          <ManageFollowers
            followers={followers}
            commonBiggerBoxclasses={commonBiggerBoxclasses}
            commonHeaderClasses={commonHeaderClasses}
          />
        </div>
      </div>
    </Container>
  );
};

export default Admin;
