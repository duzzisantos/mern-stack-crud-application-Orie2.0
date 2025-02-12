import { Button, Container, Form } from "react-bootstrap";
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
import { useState } from "react";
import useGetAllUserContent from "../api/useGetUserPosts";
import ConnectSideMenu from "../components/ConnectSideMenu";
import { List } from "react-bootstrap-icons";
import { advertContent } from "../advertContent";
import AdvertBox from "../reusable-comps/AdvertBox";

const Connect = ({ user }) => {
  const [showMenu, setShowMenu] = useState(false);

  const token = user.accessToken;
  const { biz } = useGetOneBusiness(user, token);
  const { following } = useGetFollowing(user, token);
  const { followers } = useGetFollowers(user, token);
  const { subscribedContent } = useGetFollowedContent(user, token);
  const { suggestedFollows } = useSuggestedFollows(user, token);
  const { categories } = useGetCategories(token);
  const { userContent, refetch } = useGetAllUserContent(user, token);

  let allPosts = [...subscribedContent, ...userContent.flat()];
  const [latest, setLatest] = useState(true);

  const businessInfo = biz[0] ?? [];

  const handleSwitch = () => {
    setLatest(!latest);
  };

  return (
    <div style={{ paddingTop: "80px" }}>
      <Container
        id="connect-page-wrapper"
        fluid
        className=" col-lg-9 col-sm-12 gap-3 custom-pry-color d-flex flex-lg-row flex-sm-column justify-content-between"
      >
        <div id="show-side-menu" className="d-none">
          <Button
            variant="transparent"
            className="custom-pry-color rounded-0 border mt-3 mx-2 fw-bold"
            onClick={() => setShowMenu(true)}
          >
            Expand <List />
          </Button>
        </div>
        <div id="customer-hero" className="mx-1">
          <CustomerHero
            businessName={
              businessInfo?.firstName + " " + businessInfo?.lastName
            }
            category={businessInfo?.category}
            followers={followers[0]?.length ?? 0}
            following={following[0]?.length ?? 0}
            businessCategories={categories}
            // userImage={businessInfo?.photos[0]?.image ?? ""}
          />
        </div>

        <section className="col-lg-6 my-3 px-2 mh-100 overflow-y-auto">
          <ConnectWritePost
            user={user}
            authorName={businessInfo?.businessName}
            refetch={refetch}
          />
          <div className="border-0 rounded-2">
            <div className="d-flex justify-content-between bg-opacity-10 w-100 px-3 py-1 rounded-top-2">
              <div className="d-flex gap-2">
                <Form.Label htmlFor="show-latest">Show oldest</Form.Label>
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
                        refetch={refetch}
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
                        isEdited={element.isEdited}
                      />
                    ))
                : !latest &&
                  allPosts.length > 0 &&
                  allPosts?.map((element, i) => (
                    <Timeline
                      refetch={refetch}
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
                      isEdited={element.isEdited}
                    />
                  ))}
            </div>
          </div>
        </section>
        <section className=" mt-3 mb-5 px-0 shadow-sm vstack rounded-top-2">
          <div className="rounded-top bg-opacity-10 w-100 px-3 py-2">
            <h2 className="fs-6 fw-semibold">Suggestions</h2>
          </div>
          <div className="col-12 px-3 gap-3 d-flex flex-column">
            {suggestedFollows.length > 1
              ? suggestedFollows
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
                  ))
              : null}
            <div className="py my-2 rounded-0">
              <span className="smaller-text fw-normal">
                Sponsored{" "}
                <button
                  className="rounded-5 bg-transparent border-0 fw-bolder"
                  title="These are sponsored content from our channel partners"
                >
                  ?
                </button>
              </span>
              <div className="my-2 d-flex flex-column gap-3">
                {advertContent.map((el, index) => {
                  const { title, content, image } = el;
                  return (
                    <AdvertBox
                      key={index}
                      title={title}
                      content={content}
                      image={image}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </Container>

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
            />
          }
        />
      )}
    </div>
  );
};

export default Connect;
