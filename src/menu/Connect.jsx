import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { PlusCircle } from "react-bootstrap-icons";
import SuggestedFollows from "../reusable-comps/SuggestedFollows";
import axios from "axios";

const Connect = ({ user }) => {
  const [businesses, setBusinesses] = useState([]);

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

  const suggestedBusinesses = () => {
    const result = [];
    businesses.forEach((company) => {
      result.push(company[0]);
    });
    return result;
  };

  return (
    <Container
      fluid
      className="col-12 h-100 row row-cols-3 gap-3 justify-content-between"
    >
      <section className=" p-2 border text-center fs-5" style={{ width: "5%" }}>
        <PlusCircle />
      </section>
      <section className="col-9 my-3 shadow-sm rounded-2 px-0 border overflow-y-auto">
        <div className="bg-secondary bg-opacity-10 w-100 p-1 rounded-top-2">
          <h2 className="fs-6 fw-semibold ">Your timeline</h2>
        </div>
      </section>
      <section className="col-2 my-3 shadow-sm rounded-2 px-0 border gap-3 vstack">
        <div className="bg-secondary bg-opacity-10 w-100 p-1  rounded-top-2">
          <h2 className="fs-6 fw-semibold ">Suggested customers</h2>
        </div>
        <div className="col-12 px-3 gap-3 vstack">
          {suggestedBusinesses().map((item, i) => (
            <SuggestedFollows
              key={i}
              user={user}
              businessName={item.businessName}
              category={item.category}
            />
          ))}
        </div>
      </section>
    </Container>
  );
};

export default Connect;
