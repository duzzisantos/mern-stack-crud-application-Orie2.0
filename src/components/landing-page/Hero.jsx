import Hero from "../../images/hero.jpg";

const HeroArea = () => {
  return (
    <div
      style={{
        height: "500px",
        backgroundImage: `url(${Hero})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
      className="d-flex flex-column justify-content-center align-items-center bottom-0"
    >
      <h1 className="text-center text-light fw-bolder">
        Start connecting with vendors from your city or region today.
      </h1>
    </div>
  );
};

export default HeroArea;
