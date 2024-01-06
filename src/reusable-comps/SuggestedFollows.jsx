import { Card, Button, Form } from "react-bootstrap";
import { BuildingsFill, PlusLg, Search } from "react-bootstrap-icons";
import axios from "axios";
const SuggestedFollows = ({ user, businessName, category, email }) => {
  const followerObject = {
    followerId: `${Date.now()}`,
    followerName: user.email,
    isBlocked: false,
    isUnfollowed: false,
    userEmail: email,
  };

  const handleFollow = () => {
    axios
      .post("http://localhost:8080/api/followers", followerObject)
      .then((res) => console.log(res.status))
      .catch((err) => console.warn(err.message));
  };

  return (
    <Card className=" p-2 gap-2 border border-1 border-secondary-subtle">
      <p className="text-dark">
        <BuildingsFill /> {businessName ?? "My Business Limited"}
      </p>
      <small className="text-dark">{category ?? "Financial"}</small>
      <div className="d-flex justify-content-start gap-2">
        <Form>
          <Button
            size="sm"
            variant="transparent"
            className="border border-dark"
            onClick={handleFollow}
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
