import { useLocation } from "react-router-dom";
import {
  Button,
  Card,
  Container,
  Row,
  Tab,
  Tabs,
  ButtonGroup,
} from "react-bootstrap";
import useGetFollowers from "../api/useGetFollowers";
import useGetFollowing from "../api/useGetFollowing";
import { handleFollow, handleUnfollow } from "../api/timelineAPIs";
import { BuildingsFill, EyeFill, PlusCircle, XLg } from "react-bootstrap-icons";
import useSuggestedFollows from "../api/useSuggestedFollows";

const Followers = ({ user }) => {
  const { state } = useLocation();
  const { followers } = useGetFollowers(user);
  const { following } = useGetFollowing(user);
  const { suggestedFollows } = useSuggestedFollows(user);

  const alreadyFollowingList = following.flat().map((el) => el.followerName);
  const getFollowSuggestions = suggestedFollows
    .filter(
      (el) =>
        !alreadyFollowingList.includes(el.email) && user.email !== el.email
    )
    .map((x) => x);

  return (
    <Container className="h-100 col-9 p-3 box-fit custom-pry-color">
      <section className="d-flex flex-column gap-3">
        <h1 className="fs-3 fw-bold text-start">Account Information</h1>
        <Tabs defaultActiveKey={state ?? "followers"} className="mb-1">
          <Tab eventKey="followers" title="Followers">
            <h2 className="fs-6">Followers: {followers.flat()?.length}</h2>
            <Row className="p-1 mx-0 gap-2">
              {followers.flat()?.map((element, index) => (
                <Card
                  key={index}
                  className="d-flex flex-row flex-wrap justify-content-between col-lg-12 py-2 border-0 shadow-sm rounded-0"
                >
                  <div className="gap-2 custom-pry-color">
                    <small>{element.followerName}</small>
                    <small>{element.category}</small>
                  </div>
                  <ButtonGroup
                    className="gap-2 border"
                    size="sm"
                    aria-label="action-buttons-for-followers-tab"
                  >
                    <Button
                      variant="transparent"
                      className="custom-pry-color"
                      onClick={() => handleFollow(user, element.followerName)}
                      title="Follow"
                    >
                      <PlusCircle /> Follow
                    </Button>

                    <Button
                      variant="transparent"
                      className="custom-pry-color"
                      title="View profile"
                    >
                      View profile
                    </Button>
                  </ButtonGroup>
                </Card>
              ))}
            </Row>
          </Tab>
          <Tab eventKey="following" title="Following">
            <h2 className="fs-6">Following: {following.flat()?.length}</h2>
            <Row className="p-1 mx-0 gap-2">
              {alreadyFollowingList.map((element, index) => (
                <Card
                  key={index}
                  className="d-flex flex-row flex-wrap justify-content-between col-lg-12 py-2 border-0 shadow-sm rounded-0"
                >
                  <div className="gap-2 custom-pry-color">
                    <BuildingsFill /> <small>{element}</small>
                  </div>
                  <ButtonGroup
                    className="gap-2 border"
                    size="sm"
                    aria-label="action-buttons-for-following-tab"
                  >
                    <Button
                      variant="transparent"
                      className="custom-pry-color"
                      onClick={() => handleUnfollow(user, element.email)}
                      title="Unfollow"
                    >
                      <XLg /> Unfollow
                    </Button>

                    <Button
                      variant="transparent"
                      className="custom-pry-color"
                      title="View profile"
                    >
                      <EyeFill /> View profile
                    </Button>
                  </ButtonGroup>
                </Card>
              ))}
            </Row>
          </Tab>
          <Tab eventKey={"people to follow"} title="People to follow">
            <Row className="p-1 mx-0 gap-2">
              {getFollowSuggestions.map((business, index) => (
                <Card
                  key={index}
                  className="d-flex flex-row flex-wrap justify-content-between col-lg-12 py-2 border-0 shadow-sm rounded-0"
                >
                  <div className="gap-2 custom-pry-color">
                    <BuildingsFill /> <small>{business.businessName}</small>
                  </div>
                  <ButtonGroup
                    className="gap-2 border"
                    size="sm"
                    aria-label="action-buttons-for-following-tab"
                  >
                    <Button
                      variant="transparent"
                      className="custom-pry-color"
                      onClick={() => handleFollow(user, business?.email)}
                      title="Follow"
                    >
                      <PlusCircle /> Follow
                    </Button>

                    <Button
                      variant="transparent"
                      className="custom-pry-color"
                      title="View profile"
                    >
                      <EyeFill /> View profile
                    </Button>
                  </ButtonGroup>
                </Card>
              ))}
            </Row>
          </Tab>
        </Tabs>
      </section>
    </Container>
  );
};

export default Followers;
