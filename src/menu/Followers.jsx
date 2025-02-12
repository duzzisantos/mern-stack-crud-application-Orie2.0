import { useLocation } from "react-router-dom";
import { useState } from "react";
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
import ViewProfile from "../components/modals/ViewProfile";
import useGetRatings from "../api/useGetRatings";
import useGetOneBusiness from "../api/useGetOneBusiness";

const Followers = ({ user }) => {
  const [show, setShow] = useState(false);
  const [secondParty, setSecondParty] = useState("");
  const { state } = useLocation();

  const token = user.accessToken;
  const { followers } = useGetFollowers(user, token);
  const { following } = useGetFollowing(user, token);
  const { suggestedFollows } = useSuggestedFollows(user, token);
  const { rating } = useGetRatings(secondParty, token);

  const { biz } = useGetOneBusiness(secondParty, token);
  const alreadyFollowingList = following.flat().map((el) => el.followerName);
  const getFollowSuggestions = suggestedFollows
    .filter(
      (el) =>
        !alreadyFollowingList.includes(el.email) && user.email !== el.email
    )
    .map((x) => x);

  const handleShow = (item) => {
    setSecondParty(item);

    setShow(true);
  };

  return (
    <Container
      className="h-100 col-9 box-fit custom-pry-color"
      style={{ paddingTop: "80px" }}
    >
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
                      onClick={() => handleFollow(user, element.follower)}
                      title="Follow"
                    >
                      <PlusCircle /> Follow
                    </Button>

                    <Button
                      variant="transparent"
                      className="custom-pry-color"
                      title="View profile"
                      onClick={() => handleShow(element?.follower)}
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
                      onClick={() => handleUnfollow(user, element, token)}
                      title="Unfollow"
                    >
                      <XLg /> Unfollow
                    </Button>

                    <Button
                      variant="transparent"
                      className="custom-pry-color"
                      title="View profile"
                      onClick={() => handleShow(element)}
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
                      onClick={() => handleShow(business.email)}
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
      {show && (
        <ViewProfile show={show} setShow={setShow} rating={rating} biz={biz} />
      )}
    </Container>
  );
};

export default Followers;
