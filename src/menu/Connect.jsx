import { Alert, Container, Form, Spinner } from "react-bootstrap";
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
import { useEffect, useState } from "react";
import useGetBusinesses from "../api/useGetBusinesses";

const Connect = ({ user }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { biz } = useGetOneBusiness(user);
  const { businesses } = useGetBusinesses();
  const { following } = useGetFollowing(user);
  const { followers } = useGetFollowers(user);
  const { subscribedContent } = useGetFollowedContent(user);
  const { suggestedFollows } = useSuggestedFollows(user);
  const { categories } = useGetCategories();

  const businessInfo = biz[0];

  useEffect(() => {
    if (
      !biz ||
      !following ||
      !followers ||
      !subscribedContent ||
      !suggestedFollows ||
      !categories
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
  ]);

  const getClientId = (data, authorEmail) => {
    return data.flat().filter((d) => d.email === authorEmail)[0]?.clientUID;
  };

  return (
    <>
      {isLoading ? (
        <Spinner animation="border" />
      ) : (
        <Container
          fluid
          className="col-9 vh-100 gap-3 custom-pry-color d-flex flex-lg-row flex-sm-column justify-content-between"
        >
          <CustomerHero
            businessName={
              businessInfo?.firstName + " " + businessInfo?.lastName
            }
            category={businessInfo?.category}
            followers={followers[0]?.length ?? 0}
            following={following[0]?.length ?? 0}
            businessCategories={categories}
          />

          <section className="col-lg-6 my-3 px-2 mh-100 border-0 overflow-y-auto">
            <ConnectWritePost
              user={user}
              authorName={businessInfo?.businessName}
            />
            <div className="border-0 rounded-2">
              <div className="d-flex justify-content-between bg-opacity-10 w-100 px-3 py-1 rounded-top-2">
                <div className="d-flex gap-2">
                  <Form.Label htmlFor="show-latest">Show latest</Form.Label>
                  <Form.Switch id="show-latest" />
                </div>
              </div>
              <div className="px-3 py-3 gap-3 vstack" id="time-line">
                {subscribedContent.length > 0 ? (
                  subscribedContent.map((element, i) => (
                    <Timeline
                      key={i}
                      contentBody={element?.contentBody}
                      likes={element?.likes}
                      id={element._id}
                      bookmarks={element?.isBookmarked}
                      authorName={element?.authorName}
                      authorEmail={element?.authorEmail}
                      authorImage={element?.authorImage}
                      user={user}
                      secondParty={getClientId(
                        businesses,
                        element?.authorEmail
                      )}
                    />
                  ))
                ) : (
                  <Alert variant="transparent" className="fw-bold">
                    No posts to see yet.
                  </Alert>
                )}
              </div>
            </div>
          </section>
          <section className=" mt-3 mb-5 px-0  mh-100 shadow-sm gap-3 vstack rounded-top-2">
            <div className="bg-primary-subtle bg-opacity-10 w-100 px-3 py-2">
              <h2 className="fs-6 fw-semibold ">Suggestions</h2>
            </div>
            <div className="col-12 px-3 gap-3 vstack">
              {suggestedFollows.length > 1 &&
                suggestedFollows
                  ?.filter((item) => item?.email !== user?.email)
                  .map((item, i) => (
                    <SuggestedFollows
                      key={i}
                      user={user}
                      businessName={item?.businessName}
                      category={item.category}
                      secondParty={item.clientUID}
                    />
                  ))}
              <div className="border py-2 px-4 rounded-0">
                <span className="smaller-text custom-pry-color fw-semibold">
                  Advert
                </span>
              </div>
            </div>
          </section>
        </Container>
      )}
    </>
  );
};

export default Connect;
