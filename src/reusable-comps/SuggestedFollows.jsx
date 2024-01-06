import { Card, Button, Form } from "react-bootstrap";
import {
  BuildingsFill,
  CartPlusFill,
  PlusLg,
  Search,
} from "react-bootstrap-icons";
import axios from "axios";
const SuggestedFollows = ({ user, businessName, category, email }) => {
  const followerObject = {
    followerName: user.email,
    followDate: Date.now(),
    hasBlocked: false,
    hasUnfollowed: false,
    hasReported: false,
    hasFollowed: true,
    userEmail: email,
  };

  const followingObject = {
    followerName: user.email,
    userEmail: email,
  };

  const handleFollow = () => {
    axios
      .post("http://localhost:8080/api/followers", followerObject)
      .then((res) => console.log(res.status))
      .catch((err) => console.warn(err.message));
  };

  const handleUpdateUserFollowingList = () => {
    axios
      .post(
        "http://localhost:8080/api/followers/update-following",
        followingObject
      )
      .then((res) => console.log(res.status))
      .catch((err) => console.warn(err.message));
  };

  return (
    <Card className=" p-2 gap-2  border border-1 border-secondary-subtle">
      <small className="text-dark">
        <BuildingsFill /> {businessName ?? "My Business Limited"}
      </small>
      <small className="text-primary">
        <CartPlusFill /> {category ?? "Financial"}
      </small>
      <div className="d-flex justify-content-start gap-2">
        <Form>
          <Button
            size="sm"
            variant="transparent"
            className="border border-dark"
            onClick={() => {
              handleFollow();
              handleUpdateUserFollowingList();
            }}
          >
            <PlusLg /> Follow
          </Button>
        </Form>
        {user && (
          <Button
            size="sm"
            variant="transparent"
            className="border border-dark"
          >
            <Search />{" "}
            <a className="text-decoration-none text-dark" href="/">
              View
            </a>
          </Button>
        )}
      </div>
    </Card>
  );
};

export default SuggestedFollows;
