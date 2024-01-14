import { Card, Button, Form } from "react-bootstrap";
import { BriefcaseFill, BuildingsFill, PlusLg } from "react-bootstrap-icons";
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
    <Card className="p-2 gap-2 border-0 shadow-sm">
      <small className="text-dark">
        <BuildingsFill /> {businessName ?? "My Business Limited"}
      </small>
      <small className="custom-pry-color">
        <BriefcaseFill /> {category ?? "Financial"}
      </small>
      <div className="d-flex justify-content-start gap-2">
        <Form>
          <Button
            size="sm"
            variant="transparent"
            className="border border-1 border-secondary"
            onClick={() => {
              handleFollow();
              handleUpdateUserFollowingList();
            }}
          >
            <PlusLg /> Follow
          </Button>
        </Form>
      </div>
    </Card>
  );
};

export default SuggestedFollows;
