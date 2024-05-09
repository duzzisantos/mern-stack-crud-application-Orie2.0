import { useState } from "react";
import { Container } from "react-bootstrap";
import { ReactComponent as Brilliance } from "bootstrap-icons/icons/brilliance.svg";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../authentication/firebase";
import HeroArea from "../components/landing-page/Hero";
import DesignedBackground from "../components/landing-page/DesignedBackground";
import FindCustomers from "../components/landing-page/FindCustomers";
import Businesses from "../components/landing-page/Businesses";
import SuggestionBoxes from "../reusable-comps/SuggestionBoxes";
import useGetCities from "../api/useGetCities";
import useGetCategories from "../api/useGetCategories";
import useGetRegions from "../api/useGetRegion";
import getGeneralSearch from "../api/useGeneralSearch";
import getNarrowSearch from "../api/useNarrowSearch";
import useGetAllRatings from "../api/useGetAllRatings";

const Home = () => {
  const [user] = useAuthState(auth);
  const [search, setSearch] = useState("");
  const [searchState, setSearchState] = useState(false);
  const [city, setCity] = useState("");
  const [region, setRegion] = useState("");
  const [category, setCategory] = useState("");
  const [generalSearch, setGeneralSearch] = useState([]);
  const [narrowSearch, setNarrowSearch] = useState([]);
  const [show, setShow] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [grabEmail, setGrabEmail] = useState("");
  const { cities } = useGetCities();
  const { categories } = useGetCategories();
  const { regions } = useGetRegions();
  const { allRatings } = useGetAllRatings();

  const handleGeneralSearch = () => {
    setSearchState(true);
    return getGeneralSearch(setGeneralSearch, search);
  };

  const handleNarrowSearch = () => {
    setSearchState(true);
    return getNarrowSearch(setNarrowSearch, region, city, category);
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = (email) => {
    setGrabEmail(email);
    setShow(true);
  };

  const handleCloseMessage = () => {
    setShowMessageModal(false);
  };

  const handleShowMessage = (email) => {
    setGrabEmail(email);
    setShowMessageModal(true);
  };

  const cleansedData = (data, userEmail) => {
    const output = [];

    data.flat().forEach((item) => {
      if (userEmail === item?.ratingsOwner) {
        return output.push(item);
      }
    });

    return output;
  };

  return (
    <div className="col-12 px-0 custom-pry-color">
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
      <section className="bg-white col-12" style={{ height: "500px" }}>
        <HeroArea />
      </section>
      <section
        className="d-flex col-12 flex-row justify-content-center"
        style={{ height: "250px" }}
      >
        <FindCustomers
          setSearch={setSearch}
          search={search}
          regions={regions}
          cities={cities}
          categories={categories}
          setCategories={setCategory}
          setRegion={setRegion}
          setCity={setCity}
          handleGeneralSearch={handleGeneralSearch}
          handleNarrowSearch={handleNarrowSearch}
          handleResetGeneral={() => {
            setGeneralSearch([]);
            setSearchState(false);
          }}
          handleResetNarrow={() => {
            setNarrowSearch([]);
            setSearchState(false);
          }}
        />
      </section>

      <section
        className="d-flex flex-lg-row flex-sm-column bg-body-secondary flex-wrap"
        style={{ height: "1000px" }}
      >
        {searchState ? (
          <Businesses
            data={allRatings}
            ratingScore={cleansedData}
            narrowSearch={narrowSearch}
            generalSearch={generalSearch}
            user={user}
            showModal={show}
            handleShow={handleShow}
            handleClose={handleClose}
            showMessageModal={showMessageModal}
            grabEmail={grabEmail}
            handleCloseMessage={handleCloseMessage}
            handleShowMessage={handleShowMessage}
          />
        ) : (
          <DesignedBackground />
        )}
      </section>
      <section
        className="py-5 gap-3 d-flex justify-content-center align-items-center bottom-0  flex-column bg-light"
        style={{ height: "fit-content" }}
      >
        <h2 className="fw-bold">Popular categories</h2>
        <div className="col-9 justify-content-center bottom-0 h-100">
          <div className="d-flex flex-wrap gap-3 text-center mt-3">
            {categories.map((el, i) => (
              <SuggestionBoxes key={i} title={el} />
            ))}
          </div>
        </div>
      </section>

      <section
        className="py-5 gap-3 d-flex justify-content-center align-items-center bottom-0  flex-column bg-white"
        style={{ height: "fit-content" }}
      >
        <h2 className="fw-bold">Popular regions</h2>
        <div className="col-9 justify-content-center bottom-0 h-100">
          <div className="d-flex flex-wrap gap-3 text-center mt-3">
            {regions.map((el, i) => (
              <SuggestionBoxes key={i} title={el} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
