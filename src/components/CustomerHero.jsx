import { Badge } from "react-bootstrap";
import {
  ArrowLeftCircleFill,
  ArrowRightCircleFill,
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
}) => {
  return (
    <div className="mx-0 py-2">
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
          <small className="text-primary fs-6">
            <BriefcaseFill /> {category}
          </small>
          <div className="d-flex flex-column gap-2">
            <small className="fs-6">
              <ArrowLeftCircleFill className="text-primary" /> Followers{" "}
              <sup>
                <Badge className="bg-primary" pill>
                  {followers}
                </Badge>
              </sup>
            </small>
            <small className="fs-6">
              <ArrowRightCircleFill className="text-primary" /> Following{" "}
              <sup>
                <Badge className="bg-primary" pill>
                  {following}
                </Badge>
              </sup>
            </small>
          </div>
        </div>
      </fieldset>
    </div>
  );
};

export default CustomerHero;
