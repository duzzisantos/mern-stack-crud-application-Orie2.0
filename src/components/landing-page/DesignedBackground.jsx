import DesignImage from "../../images/shopping-lady.jpg";

const DesignedBackground = () => {
  return (
    <div
      className="col-12 px-5"
      style={{
        height: "1000px",
        backgroundImage: `url(${DesignImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      id="circles-wrapper"
    >
      <article className="my-5 text-center">
        <h2 className="fs-1 lh-sm fw-bold">
          Your Number 1 Destination for Finding The Right Vendors
        </h2>
      </article>
    </div>
  );
};

export default DesignedBackground;
