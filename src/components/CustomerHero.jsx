import { Badge, Button } from "react-bootstrap";
import { BriefcaseFill, BuildingsFill } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

const CustomerHero = ({
  userName,

  businessName,
  category,
  followers,
  following,
  businessCategories,
}) => {
  const navigate = useNavigate();
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
            <BuildingsFill /> {businessName}
          </small>
          <small className="custom-pry-color fs-6">
            <BriefcaseFill /> {category}
          </small>
          <div className="d-flex flex-column gap-2">
            <small className="fs-6">
              <Button
                variant="transaparent"
                className=" custom-pry-color"
                onClick={() =>
                  navigate(`/account-follow`, { state: "followers" })
                }
              >
                Followers{" "}
              </Button>
              <sup>
                <Badge className="bg-secondary rounded-5">{followers}</Badge>
              </sup>
            </small>
            <small className="fs-6">
              <Button
                variant="transaparent"
                className=" custom-pry-color"
                onClick={() =>
                  navigate(`/account-follow`, { state: "following" })
                }
              >
                Following{" "}
              </Button>
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
              variant="transaparent"
              className=" text-secondary smaller-text custom-link"
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
