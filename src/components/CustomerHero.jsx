import { Badge } from "react-bootstrap";
import {
  BriefcaseFill,
  BuildingsFill,
  EnvelopeAtFill,
} from "react-bootstrap-icons";

const CustomerHero = ({
  userName,
  email,
  businessName,
  category,
  followers,
  following,
  businessCategories,
}) => {
  return (
    <div className="mx-0 py-2 d-flex flex-column">
      <h1 className="fs-4">{userName}</h1>
      <fieldset className="d-flex flex-column justify-content-center gap-3 shadow-sm px-4 py-2">
        <legend
          className="border mx-auto"
          style={{
            height: "60px",
            width: "60px",
            borderRadius: "50px",
            backgroundImage:
              "url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSA0dYxGVf1X0BOzqFNRKKBKOxFkUOzGvLQ0A&usqp=CAU)",
            backgroundPosition: "center",
            backgroundSize: "150%",
          }}
        ></legend>
        <div className="d-flex flex-column gap-3">
          <small className="fs-6">
            <EnvelopeAtFill /> {email}
          </small>
          <small className="fs-6">
            <BuildingsFill /> {businessName}
          </small>
          <small className="custom-pry-color fs-6">
            <BriefcaseFill /> {category}
          </small>
          <div className="d-flex flex-column gap-2">
            <small className="fs-6">
              Followers{" "}
              <sup>
                <Badge className="bg-secondary rounded-5">{followers}</Badge>
              </sup>
            </small>
            <small className="fs-6">
              Following{" "}
              <sup>
                <Badge className="bg-secondary rounded-5">{following}</Badge>
              </sup>
            </small>
          </div>
        </div>
      </fieldset>
      <div className="my-3">
        <div className="px-4 py-2 shadow-sm vstack gap-1">
          <small className="fw-semibold">Categories</small>
          {businessCategories?.map((item, i) => (
            <a
              key={i}
              href="/"
              className="text-decoration-none text-secondary smaller-text custom-link"
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerHero;
