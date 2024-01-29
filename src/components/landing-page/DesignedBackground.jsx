import DesignImage from "../../images/shopping-lady.jpg";

const DesignedBackground = () => {
  return (
    <div
      className="col-12 px-5 d-flex justify-content-between align-items-center justify-content-sm-between"
      style={{
        height: "1000px",
        backgroundImage: `url(${DesignImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      id="circles-wrapper"
    >
      <fieldset className="bigger-circle justify-content-center d-flex align-items-center bottom-0">
        <legend className="inner-legend"></legend>
        <fieldset className="big-circle justify-content-center d-flex align-items-center bottom-0">
          <legend className="inner-legend"></legend>
          <fieldset className="small-circle justify-content-center d-flex align-items-center bottom-0">
            <legend className="inner-legend"></legend>
          </fieldset>
        </fieldset>
      </fieldset>

      <article className="col-3">
        <h2 className="fs-1 lh-sm fw-bold">
          Your Number 1 Destination for Finding The Right Vendors
        </h2>
      </article>
    </div>
  );
};

export default DesignedBackground;
