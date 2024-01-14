import { Container } from "react-bootstrap";
import { ReactComponent as Brilliance } from "bootstrap-icons/icons/brilliance.svg";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../authentication/firebase";

const Home = () => {
  const [user] = useAuthState(auth);
  return (
    <Container fluid className="col-12 px-0 custom-pry-color">
      {!user && (
        <Navbar className="w-100 py-1 shadow-sm position-sticky sticky-top">
          <Container className="d-flex justify-content-between">
            <Navbar.Brand as={Link} to="home" className="hstack">
              <span className="fs-2">Dugam</span>
              <span className="position-relative">
                <Brilliance className="fs-2" />
                <Brilliance className="fs-2" style={{ marginLeft: "-5px" }} />
              </span>
            </Navbar.Brand>
            <Navbar.Toggle />
            <Nav className="fw-bold hstack gap-3">
              <a href="/signup" className="text-decoration-none text-dark">
                Signup
              </a>
              <a href="/login" className="text-decoration-none text-dark">
                Login
              </a>
            </Nav>
          </Container>
        </Navbar>
      )}
      <section className="bg-white p-5" style={{ height: "600px" }}>
        <h1 className="text-center mt-2 fw-bolder">
          Start connecting with vendors today.
        </h1>
      </section>
      <section
        className="d-flex flex-row justify-content-center bg-light"
        style={{ height: "600px" }}
      ></section>
      <section
        className="d-flex flex-row justify-content-center bg-white"
        style={{ height: "600px" }}
      ></section>
      <section
        className="d-flex flex-row justify-content-center bg-light"
        style={{ height: "600px" }}
      ></section>
      <section
        className="d-flex flex-row justify-content-center bg-dark"
        style={{ height: "200px" }}
      ></section>
    </Container>
  );
};

export default Home;
