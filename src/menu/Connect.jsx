import { Alert, Container, Form } from "react-bootstrap";

import SuggestedFollows from "../reusable-comps/SuggestedFollows";
import Timeline from "../reusable-comps/Timeline";
import CustomerHero from "../components/CustomerHero";
import ConnectWritePost from "../components/ConnectWritePost";
import useGetBusinesses from "../api/useGetBusinesses";
import useGetFollowing from "../api/useGetFollowing";
import useGetFollowers from "../api/useGetFollowers";
import useGetFollowedContent from "../api/useGetFollowedPosts";
import useGetCategories from "../api/useGetCategories";

const Connect = ({ user }) => {
  //Fetch all businesses registered
  const { businesses } = useGetBusinesses();
  const { following } = useGetFollowing(user);
  const { followers } = useGetFollowers(user);
  const { subscribedContent } = useGetFollowedContent(user);
  const { categories } = useGetCategories();
  const suggestedBusinesses = () => {
    const result = [];
    businesses?.forEach((company) => {
      result.push(company[0]);
    });
    return result; //The user cannot follow themselves, so we filter them out
  };

  const currentCustomer = suggestedBusinesses()
    ?.filter((element) => element.email === user.email)
    .map((x) => x)[0];

  //Suggested users to follow
  const whomToFollow = () => {
    return null;
  };

  console.log(whomToFollow());

  //Refactor these into singular components
  return (
    <Container
      fluid
      className="col-9 vh-100 gap-3 custom-pry-color d-flex flex-lg-row flex-sm-column justify-content-between"
    >
      <CustomerHero
        email={currentCustomer?.email}
        businessName={currentCustomer?.businessName}
        category={currentCustomer?.category}
        followers={followers[0]?.length ?? 0}
        following={following[0]?.length ?? 0}
        businessCategories={categories}
      />

      <section className="col-lg-6 my-3 px-0 mh-100 overflow-y-auto">
        <ConnectWritePost
          user={user}
          authorName={currentCustomer?.businessName}
        />
        <div className="border-0 rounded-2">
          <div className="d-flex justify-content-between bg-opacity-10 w-100 px-3 py-1 rounded-top-2">
            <div className="d-flex gap-2">
              <Form.Label htmlFor="show-latest">Show latest</Form.Label>
              <Form.Switch id="show-latest" />
            </div>
          </div>
          <div className="px-3 py-3 gap-3 vstack">
            {subscribedContent.length > 0 ? (
              subscribedContent?.map((element, i) => (
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
                />
              ))
            ) : (
              <Alert>No posts to see yet.</Alert>
            )}
          </div>
        </div>
      </section>
      <section className=" mt-3 mb-5 px-0 shadow-sm gap-3 vstack rounded-top-2">
        <div className="bg-primary-subtle bg-opacity-10 w-100 px-3 py-2">
          <h2 className="fs-6 fw-semibold ">Suggestions</h2>
        </div>
        <div className="col-12 px-3 gap-3 vstack">
          {whomToFollow()?.length > 1 &&
            whomToFollow()
              ?.filter((item) => item?.email !== user?.email)
              .map((item, i) => (
                <SuggestedFollows
                  key={i}
                  user={user}
                  businessName={item?.businessName}
                  category={item.category}
                  email={item.email}
                />
              ))}
          <div className="border py-2 px-4 rounded-1">
            <span className="smaller-text custom-pry-color fw-semibold">
              Advert
            </span>
          </div>
        </div>
      </section>
    </Container>
  );
};

export default Connect;
