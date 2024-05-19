import { Alert, Button, Container, Form, Spinner } from "react-bootstrap";
import SuggestedFollows from "../reusable-comps/SuggestedFollows";
import Timeline from "../reusable-comps/Timeline";
import CustomerHero from "../components/CustomerHero";
import ConnectWritePost from "../components/ConnectWritePost";
import useGetOneBusiness from "../api/useGetOneBusiness";
import useGetFollowing from "../api/useGetFollowing";
import useGetFollowers from "../api/useGetFollowers";
import useGetFollowedContent from "../api/useGetFollowedPosts";
import useGetCategories from "../api/useGetCategories";
import useSuggestedFollows from "../api/useSuggestedFollows";
import { useCallback, useEffect, useState } from "react";
import useGetAllUserContent from "../api/useGetUserPosts";
import ConnectSideMenu from "../components/ConnectSideMenu";
import { List } from "react-bootstrap-icons";

const Connect = ({ user }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const token = user.accessToken;
  const { biz } = useGetOneBusiness(user, token);
  const { following } = useGetFollowing(user, token);
  const { followers } = useGetFollowers(user, token);
  const { subscribedContent } = useGetFollowedContent(user, token);
  const { suggestedFollows } = useSuggestedFollows(user, token);
  const { categories } = useGetCategories(token);
  const { userContent } = useGetAllUserContent(user, token);
  const [suggested, setSuggested] = useState([]);

  let allPosts = [...subscribedContent, ...userContent.flat()];
  const [latest, setLatest] = useState(false);

  const businessInfo = biz[0];

  useEffect(() => {
    if (
      !biz ||
      !following ||
      !followers ||
      !subscribedContent ||
      !suggestedFollows ||
      !categories ||
      !userContent
    ) {
      setIsLoading(true);
    }
  }, [
    biz,
    followers,
    following,
    subscribedContent,
    categories,
    suggestedFollows,
    userContent,
  ]);

  //This helps us clear the suggested follows - until, some new values are added to the suggestedFollows array from the backend
  //Without this, an infinite loop occurs
  useCallback(() => {
    for (const x of suggestedFollows) {
      for (const y of followers) {
        for (const z of following) {
          if (x.userEmail === y.follower || x.userEmail === z.follower) {
            setSuggested([]);
          } else {
            setSuggested(suggestedFollows);
          }
        }
      }
    }
  }, [followers, following, suggestedFollows]);

  const handleSwitch = () => {
    setLatest(!latest);
  };

  return (
    <>
      {isLoading ? (
        <Spinner animation="border" />
      ) : (
        <Container
          id="connect-page-wrapper"
          fluid
          className="col-9 gap-3 custom-pry-color d-flex flex-lg-row flex-sm-column justify-content-between"
        >
          <div id="show-side-menu" className="d-none">
            <Button
              variant="transparent"
              className="custom-pry-color border mt-3 mx-2 fw-bold"
              onClick={() => setShowMenu(true)}
            >
              Expand <List />
            </Button>
          </div>
          <div id="customer-hero">
            <CustomerHero
              businessName={
                businessInfo?.firstName + " " + businessInfo?.lastName
              }
              category={businessInfo?.category}
              followers={followers[0]?.length ?? 0}
              following={following[0]?.length ?? 0}
              businessCategories={categories}
              userImage={businessInfo?.photos[0]?.image ?? ""}
            />
          </div>

          <section className="col-lg-6 my-3 px-2 mh-100 overflow-y-auto">
            <ConnectWritePost
              user={user}
              authorName={businessInfo?.businessName}
            />
            <div className="border-0 rounded-2">
              <div className="d-flex justify-content-between bg-opacity-10 w-100 px-3 py-1 rounded-top-2">
                <div className="d-flex gap-2">
                  <Form.Label htmlFor="show-latest">Show latest</Form.Label>
                  <Form.Switch id="show-latest" onChange={handleSwitch} />
                </div>
              </div>
              <div
                className="px-3 py-3 gap-3 vstack border rounded-1"
                id="time-line"
              >
                {latest && allPosts.length > 0
                  ? allPosts
                      .reverse()
                      .map((element, i) => (
                        <Timeline
                          key={i}
                          contentBody={element?.contentBody}
                          contentImage={element?.contentImage}
                          likes={element?.likes}
                          id={element._id}
                          bookmarks={element?.isBookmarked}
                          authorName={element?.authorName}
                          authorEmail={element?.authorEmail}
                          authorImage={element?.authorImage}
                          businessCategory={element?.category}
                          user={user}
                          token={token}
                          secondParty={element.authorEmail}
                        />
                      ))
                  : !latest &&
                    allPosts.length > 0 &&
                    allPosts?.map((element, i) => (
                      <Timeline
                        key={i}
                        contentBody={element?.contentBody}
                        contentImage={element?.contentImage}
                        likes={element?.likes}
                        id={element._id}
                        bookmarks={element?.isBookmarked}
                        authorName={element?.authorName}
                        authorEmail={element?.authorEmail}
                        authorImage={element?.authorImage}
                        businessCategory={element?.category}
                        user={user}
                        token={token}
                        secondParty={element.authorEmail}
                      />
                    ))}
                {allPosts.length < 1 && (
                  <Alert variant="info">
                    There are no posts yet. Start writing something.
                  </Alert>
                )}
              </div>
            </div>
          </section>
          <section className=" mt-3 mb-5 px-0 border vstack rounded-top-2">
            <div className="bg-primary-subtle bg-opacity-10 w-100 px-3 py-2">
              <h2 className="fs-6 fw-semibold">Suggestions</h2>
            </div>
            <div className="col-12 px-3 gap-3 vstack">
              {suggested.length > 1 &&
                suggested
                  ?.filter((item) => item?.userEmail !== user?.email) //current user cannot follow him/herself
                  .map((item, i) => (
                    <SuggestedFollows
                      key={i}
                      user={user}
                      businessName={item?.businessName}
                      category={item.category}
                      secondParty={item.clientUID}
                      secondPartyEmail={item.userEmail}
                    />
                  ))}
              <div className="border py-2 px-4 my-3 rounded-0">
                <span className="smaller-text custom-pry-color fw-semibold">
                  Advert
                </span>
              </div>
            </div>
          </section>
        </Container>
      )}
      {showMenu && (
        <ConnectSideMenu
          show={showMenu}
          setShow={setShowMenu}
          children={
            <CustomerHero
              businessName={
                businessInfo?.firstName + " " + businessInfo?.lastName
              }
              category={businessInfo?.category}
              followers={followers[0]?.length ?? 0}
              following={following[0]?.length ?? 0}
              businessCategories={categories}
              userImage={businessInfo?.photos[0]?.image ?? ""}
            />
          }
        />
      )}
    </>
  );
};

export default Connect;
