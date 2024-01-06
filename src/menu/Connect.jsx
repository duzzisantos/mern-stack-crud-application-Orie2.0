import { useState, useEffect } from "react";
import { Container, Form } from "react-bootstrap";
import {
  PlusCircleFill,
  PeopleFill,
  PersonPlusFill,
} from "react-bootstrap-icons";
import SuggestedFollows from "../reusable-comps/SuggestedFollows";
import axios from "axios";
import Timeline from "../reusable-comps/Timeline";
import CustomerHero from "../components/CustomerHero";

const Connect = ({ user }) => {
  const [businesses, setBusinesses] = useState([]);
  const [followers, setFollowers] = useState([]);

  //Fetch all businesses registered
  useEffect(() => {
    const getBusinesses = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/register`);
        if (response.status !== 200) {
          throw new Error(`${response.status} ${response.statusText}`);
        } else {
          setBusinesses(response.data);
        }
      } catch (err) {
        console.warn(err);
      }
    };
    getBusinesses();
  }, []);

  //Fetch all the followers
  useEffect(() => {
    const getFollowers = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/followers`);
        if (response.status !== 200) {
          throw new Error(`${response.status} ${response.statusText}`);
        } else {
          setFollowers(response.data);
        }
      } catch (err) {
        console.warn(err);
      }
    };
    getFollowers();
  }, []);

  const suggestedBusinesses = () => {
    const result = [];
    businesses.forEach((company) => {
      result.push(company[0]);
    });
    return result; //The user cannot follow themselves, so we filter them out
  };

  const currentCustomer = suggestedBusinesses()
    .filter((element) => element?.email === user?.email)
    .map((x) => x)[0];

  const countFollowers = followers.length;

  return (
    <Container
      fluid
      className="col-12 h-100 row row-cols-3 gap-3 justify-content-between"
    >
      <section className="col-1 p-2 border d-flex flex-column gap-5 text-center fs-5">
        <PlusCircleFill className="mx-auto mt-2" />
        <div>
          <PeopleFill className="mx-auto" />{" "}
          <small className="fs-6">Followers</small>
        </div>
        <div>
          <PersonPlusFill className="mx-auto" />{" "}
          <small className="fs-6">Following</small>
        </div>
      </section>
      <section className="col-8 my-3 rounded-2 px-0">
        <CustomerHero
          email={currentCustomer?.email}
          businessName={currentCustomer?.businessName}
          category={currentCustomer?.category}
          followers={countFollowers}
        />
        <div className="border overflow-y-auto">
          <div className="d-flex justify-content-between bg-opacity-10 w-100 px-3 py-1 rounded-top-2">
            <h2 className="fs-6 fw-semibold ">Your timeline</h2>
            <div className="d-flex gap-2">
              <Form.Label>Show latest</Form.Label>
              <Form.Switch />
            </div>
          </div>
          <div className="col-12 px-3 py-3 gap-3 vstack bg-light">
            {[...Array(3).keys()].map((item, i) => (
              <Timeline key={i} />
            ))}
          </div>
        </div>
      </section>
      <section className="col-1 my-3 shadow-sm rounded-2 px-0 border gap-3 vstack">
        <div className="bg-secondary bg-opacity-10 w-100 px-3 py-2  rounded-top-2">
          <h2 className="fs-6 fw-semibold ">Suggested customers</h2>
        </div>
        <div className="col-12 px-3 gap-3 vstack bg-light-subtle">
          {suggestedBusinesses()
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
