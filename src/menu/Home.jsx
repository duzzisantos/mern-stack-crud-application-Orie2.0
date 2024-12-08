import { useState } from "react";
import { Container, Row } from "react-bootstrap";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import HeroArea from "../components/landing-page/Hero";
import FindCustomers from "../components/landing-page/FindCustomers";
import SuggestionBoxes from "../reusable-comps/SuggestionBoxes";
import useGetCities from "../api/useGetCities";
import useGetCategories from "../api/useGetCategories";
import useGetRegions from "../api/useGetRegion";
import getGeneralSearch from "../api/useGeneralSearch";
import getNarrowSearch from "../api/useNarrowSearch";
import useGetAllRatings from "../api/useGetAllRatings";
import RenderResults from "../components/landing-page/RenderResults";
import useGetGroupedBusinesses from "../api/useGetGroupedBusinesses";
import Skeleton from "../reusable-comps/Skeleton";

const Home = ({ user }) => {
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

  const token = user?.accessToken;
  const { cities } = useGetCities(token);
  const { categories } = useGetCategories(token);
  const { regions } = useGetRegions(token);
  const { grouped } = useGetGroupedBusinesses(token);
  const { allRatings } = useGetAllRatings(token);
  const [validated, setValidated] = useState(false);
  const [validatedNarrow, setValidatedNarrow] = useState(false);

  const handleGeneralSearch = (event) => {
    event.preventDefault();
    setSearchState(true);
    setValidated(true);
    return getGeneralSearch(setGeneralSearch, search, token);
  };

  const handleNarrowSearch = (event) => {
    event.preventDefault();
    setSearchState(true);
    setValidatedNarrow(true);
    return getNarrowSearch(setNarrowSearch, region, city, category, token);
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

  console.log(user);

  return (
    <div className="col-12 px-0 custom-pry-color overflow-x-hidden">
      {!user && window.location.pathname === "/" ? (
        <Navbar className="w-100 py-1 shadow-sm position-sticky sticky-top bg-light">
          <Container className="d-flex justify-content-between bg-light">
            <Navbar.Brand
              as={Link}
              to="home"
              className="hstack fw-bold custom-pry-color"
            >
              Dugam {"   "}
            </Navbar.Brand>
            <Navbar.Toggle />
            <Nav className="fw-bold hstack gap-3">
              <a
                href="/signup"
                className="text-decoration-none custom-pry-color"
              >
                Signup
              </a>
              <a
                href="/login"
                className="text-decoration-none custom-pry-color"
              >
                Login
              </a>
            </Nav>
          </Container>
        </Navbar>
      ) : user && window.location.pathname === "home" ? null : null}
      <section className="bg-white col-12" style={{ height: "500px" }}>
        <HeroArea />
      </section>
      <Row className="my-4">
        <FindCustomers
          validated={validated}
          validatedNarrow={validatedNarrow}
          setSearch={setSearch}
          groupedData={grouped}
          search={search}
          regions={regions}
          cities={cities}
          categories={categories}
          setCategories={setCategory}
          setRegion={setRegion}
          setCity={setCity}
          category={category}
          city={city}
          region={region}
          handleGeneralSearch={handleGeneralSearch}
          handleNarrowSearch={handleNarrowSearch}
          handleResetGeneral={() => {
            setGeneralSearch([]);
            setSearch("");
            setSearchState(false);
          }}
          handleResetNarrow={() => {
            setNarrowSearch([]);
            setRegion("");
            setCity("");
            setCategory("");
            setSearchState(false);
          }}
        />
      </Row>

      <section
        className="d-flex flex-lg-row flex-sm-column flex-wrap py-3"
        style={{ height: "fit-content" }}
      >
        <RenderResults
          city={city}
          category={category}
          region={region}
          search={search}
          searchState={searchState}
          allRatings={allRatings}
          cleansedData={cleansedData}
          narrowSearch={narrowSearch}
          generalSearch={generalSearch}
          user={user}
          show={show}
          handleClose={handleClose}
          handleShow={handleShow}
          showMessageModal={showMessageModal}
          grabEmail={grabEmail}
          handleCloseMessage={handleCloseMessage}
          handleShowMessage={handleShowMessage}
          handleReset={() => {
            setNarrowSearch([]);
            setRegion("");
            setCity("");
            setCategory("");
            setSearchState(false);
            setGeneralSearch([]);
            setSearch("");
          }}
        />
      </section>
      <section
        className="py-5 gap-3 d-flex justify-content-center align-items-center bottom-0  flex-column bg-light"
        style={{ height: "fit-content" }}
      >
        <h2 className="fw-bold">Popular categories</h2>
        <div className="col-9 justify-content-center bottom-0 h-100">
          <div className="d-flex flex-wrap gap-3 text-center mt-3">
            {categories.length === 0 ? (
              <Skeleton children={"Categories loading..."} />
            ) : (
              categories.map((el, i) => (
                <SuggestionBoxes key={i} title={el} user={user} />
              ))
            )}
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
            {regions.length === 0 ? (
              <Skeleton children={"Regions loading..."} />
            ) : (
              regions.map((el, i) => (
                <SuggestionBoxes key={i} title={el} user={user} />
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
