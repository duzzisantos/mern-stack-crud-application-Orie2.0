import { Container } from "react-bootstrap";
import { PlusCircle } from "react-bootstrap-icons";
import SuggestedFollows from "../reusable-comps/SuggestedFollows";

const Connect = ({ user }) => {
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
        <div className="col-12 px-3">
          <SuggestedFollows user={user} />
        </div>
      </section>
    </Container>
  );
};

export default Connect;
