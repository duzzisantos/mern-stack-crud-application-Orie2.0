import { Container, Form, Stack } from "react-bootstrap";
import {
  PlusCircleFill,
  PeopleFill,
  PersonPlusFill,
  BookFill,
} from "react-bootstrap-icons";
import SuggestedFollows from "../reusable-comps/SuggestedFollows";
import Timeline from "../reusable-comps/Timeline";
import CustomerHero from "../components/CustomerHero";
import ConnectWritePost from "../components/ConnectWritePost";
import useGetBusinesses from "../api/useGetBusinesses";
import useGetFollowing from "../api/useGetFollowing";
import useGetFollowers from "../api/useGetFollowers";
import useGetFollowedContent from "../api/useGetFollowedPosts";

const Connect = ({ user }) => {
  //Fetch all businesses registered
  const { businesses } = useGetBusinesses();
  const { following } = useGetFollowing(user);
  const { followers } = useGetFollowers(user);
  const { subscribedContent } = useGetFollowedContent(user);

  const suggestedBusinesses = () => {
    const result = [];
    businesses.forEach((company) => {
      result.push(company[0]);
    });
    return result; //The user cannot follow themselves, so we filter them out
  };

  const currentCustomer = suggestedBusinesses()
    .filter((element) => element.email === user.email)
    .map((x) => x)[0];

  //Refactor these into singular components - celaner code
  return (
    <Container
      fluid
      className="col-12 vh-100 row row-cols-3 gap-3 justify-content-between"
    >
      <section className="col-1 p-2 mb-5 border text-center fs-5">
        <PlusCircleFill className="mx-auto my-2" />
        <Stack>
          <PeopleFill className="mx-auto my-3" />{" "}
        </Stack>
        <Stack>
          <PersonPlusFill className="mx-auto my-3" />{" "}
        </Stack>
        <Stack direction="vertical">
          <BookFill className="mx-auto my-3" />{" "}
        </Stack>
      </section>
      <section className="col-9 my-3 px-0 h-100 overflow-y-auto">
        <CustomerHero
          email={currentCustomer?.email}
          businessName={currentCustomer?.businessName}
          category={currentCustomer?.category}
          followers={followers[0]?.length ?? 0}
          following={following[0]?.length ?? 0}
        />
        <ConnectWritePost user={user} />
        <div className="border-0 rounded-2">
          <div className="d-flex justify-content-between bg-opacity-10 w-100 px-3 py-1 rounded-top-2">
            <div className="d-flex gap-2">
              <Form.Label htmlFor="show-latest">Show latest</Form.Label>
              <Form.Switch id="show-latest" />
            </div>
          </div>
          <div className="col-12 px-3 py-3 gap-3 vstack bg-light">
            {subscribedContent.map((element, index) => (
              <Timeline
                key={index}
                contentBody={element?.contentBody}
                authorName={element?.authorName}
                authorImage={element?.authorImage}
              />
            ))}
          </div>
        </div>
      </section>
      <section className="col-1 mt-3 mb-5 px-0 border gap-3 vstack">
        <div className="bg-secondary bg-opacity-10 w-100 px-3 py-2">
          <h2 className="fs-6 fw-semibold ">Suggested customers</h2>
        </div>
        <div className="col-12 px-3 gap-3 vstack">
          {suggestedBusinesses().length > 1 &&
            suggestedBusinesses()
              .filter((item) => item?.email !== user?.email)
              .map((item, i) => (
                <SuggestedFollows
                  key={i}
                  user={user}
                  businessName={item?.businessName}
                  category={item.category}
                  email={item.email}
                />
              ))}
        </div>
      </section>
    </Container>
  );
};

export default Connect;
