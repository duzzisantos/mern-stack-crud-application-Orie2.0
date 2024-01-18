import { useState } from "react";
import { Container } from "react-bootstrap";
import { ReactComponent as Brilliance } from "bootstrap-icons/icons/brilliance.svg";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../authentication/firebase";
import HeroArea from "../components/landing-page/Hero";
import FindCustomers from "../components/landing-page/FindCustomers";
import Businesses from "../components/landing-page/Businesses";
import SuggestionBoxes from "../reusable-comps/SuggestionBoxes";
import useGetCities from "../api/useGetCities";
import useGetCategories from "../api/useGetCategories";
import useGetRegions from "../api/useGetRegion";

const Home = () => {
  const [user] = useAuthState(auth);
  const [search, setSearch] = useState("");

  const { cities } = useGetCities();
  const { categories } = useGetCategories();
  const { regions } = useGetRegions();

  return (
    <Container fluid className="col-12 px-0 custom-pry-color">
      {!user && (
        <Navbar className="w-100 py-1 shadow-sm position-sticky sticky-top bg-light">
          <Container className="d-flex justify-content-between bg-light">
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
      <section className="bg-white" style={{ height: "500px" }}>
        <HeroArea />
      </section>
      <section
        className="d-flex flex-row justify-content-center bg-light"
        style={{ height: "250px" }}
      >
        <FindCustomers
          setSearch={setSearch}
          search={search}
          regions={regions}
          cities={cities}
          categories={categories}
        />
      </section>

      <section className="bg-white" style={{ height: "1000px" }}>
        <Businesses search={search} />
      </section>
      <section
        className="py-5 gap-3 d-flex justify-content-center align-items-center bottom-0  flex-column bg-light"
        style={{ height: "fit-content" }}
      >
        <h2 className="fw-bold">Popular categories</h2>
        <div className="row col-9 justify-content-start gap-3">
          {[
            "Medical",
            "Financial",
            "Insurance",
            "Groceries",
            "Fabrics",
            "More",
          ].map((el, i) => (
            <SuggestionBoxes title={el} key={i} />
          ))}
        </div>
      </section>

      <section
        className="py-5 gap-3 d-flex justify-content-center align-items-center bottom-0  flex-column bg-white"
        style={{ height: "fit-content" }}
      >
        <h2 className="fw-bold">Popular regions</h2>
        <div className="row col-9 justify-content-start gap-3">
          {[
            "Aba",
            "Port Harcourt",
            "Onitsha",
            "Owerri",
            "Asaba",
            "Awka",
            "Enugu",
            "More",
          ].map((el, i) => (
            <SuggestionBoxes title={el} key={i} />
          ))}
        </div>
      </section>
    </Container>
  );
};

export default Home;
