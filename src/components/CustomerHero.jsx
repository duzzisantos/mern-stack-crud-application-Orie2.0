import { Badge } from "react-bootstrap";
import {
  BuildingsFill,
  CartPlusFill,
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
    <div className=" mb-3 px-3 py-2 border-5 border-end border-start border-primary-subtle col-lg-12 col-sm-12">
      <h1 className="fs-4">{userName}</h1>
      <fieldset className="d-flex gap-4">
        <legend
          className="border"
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
            <CartPlusFill /> {category}
          </small>
          <div className="d-flex justify-content-between">
            <small className="fs-6">
              Followers{" "}
              <sup>
                <Badge className="custom-pry" pill>
                  {followers}
                </Badge>
              </sup>
            </small>
            <small className="fs-6">
              Following{" "}
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
