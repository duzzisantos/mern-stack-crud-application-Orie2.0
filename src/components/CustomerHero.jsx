import { Badge, Button, Col } from "react-bootstrap";
import { BriefcaseFill, BuildingsFill } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { optionsArray } from "../helpers/hardCodedData";

const CustomerHero = ({
  userName,

  businessName,
  category,
  followers,
  following,
}) => {
  const navigate = useNavigate();
  return (
    <div className="mx-0 py-2 d-flex flex-column rounded-0">
      <h1 className="fs-4">{userName}</h1>
      <Col className="d-flex flex-column justify-content-center gap-3 border rounded-1 px-4 py-2">
        <legend
          className="border mx-auto"
          style={{
            height: "60px",
            width: "60px",
            borderRadius: "50px",
            backgroundImage: "",
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
      </Col>
      <Col className="my-3 rounded-1 border">
        <div className="px-4 py-2 vstack gap-1">
          <small className="fw-semibold">Categories</small>
          {optionsArray?.map((item, i) => (
            <Button
              key={i}
              variant="transparent"
              size="sm"
              className="text-primary text-start"
              onClick={() => navigate(`/view-categories`, { state: item })}
            >
              {item}
            </Button>
          ))}
        </div>
      </Col>
    </div>
  );
};

export default CustomerHero;
