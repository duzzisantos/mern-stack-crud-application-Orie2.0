const SuggestionBoxes = ({ title }) => {
  return (
    <div className="rounded-1 col-lg-2 col-sm-5 d-flex flex-column justify-content-center align-items-center gap-5 py-4 border">
      <h3 className="fs-5 fw-bold">{title}</h3>
      <a href="https://msn.com" className="text-decoration-none">
        Explore
      </a>
    </div>
  );
};

export default SuggestionBoxes;
