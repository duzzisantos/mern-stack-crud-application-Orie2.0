import { Alert, Button, Card, Tab, Tabs } from "react-bootstrap";
import { useState } from "react";
import {
  BriefcaseFill,
  BuildingFill,
  EnvelopeAt,
  GeoAltFill,
  PencilFill,
  PeopleFill,
  PersonAdd,
  ShieldCheck,
  TelephoneInboundFill,
} from "react-bootstrap-icons";
import RatingsTemplate from "./Ratings";
import EditBusiness from "./modals/EditBusiness";

const ManageBusiness = ({ commonBiggerBoxclasses, biz, ratings, user }) => {
  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow(!show);
  };

  const handleClose = () => {
    setShow(false);
  };

  return (
    <div className={commonBiggerBoxclasses + "h-100 overflow-y-auto mt-5"}>
      <h2 className={"text-start fs-6 fw-bold mx-2 mb-4"}>Manage Business</h2>
      <div className="px-2">
        <Tabs className="mb-3">
          <Tab eventKey="details" title="Details">
            <Card className="border-0">
              <Card.Header className="d-flex justify-content-between bg-transparent border rounded-0">
                <h6>Manage General Details</h6>
                <Button
                  size="sm"
                  variant="transparent"
                  className="border-0"
                  onClick={handleShow}
                >
                  <PencilFill />
                </Button>
              </Card.Header>
              <Card.Body>
                <ul className="lh-lg">
                  <li>
                    <PersonAdd /> First name: {biz?.firstName}
                  </li>
                  <li>
                    <PeopleFill /> Last name: {biz?.lastName}
                  </li>
                  <li>
                    <BuildingFill /> Business name: {biz?.businessName}
                  </li>
                  <li>
                    <ShieldCheck /> Business ID: {biz?.businessID}
                  </li>
                  <li>
                    <TelephoneInboundFill /> Business Phone:{" "}
                    {biz?.businessPhone}
                  </li>
                  <li>
                    <GeoAltFill /> City: {biz?.city}
                  </li>
                  <li>
                    <GeoAltFill /> State/Region: {biz?.state}
                  </li>
                  <li>
                    <GeoAltFill /> Address: {biz?.address}
                  </li>
                  <li>
                    <BriefcaseFill /> Category: {biz?.category}
                  </li>
                  <li>
                    <EnvelopeAt /> Email: {biz?.email}
                  </li>
                </ul>
              </Card.Body>
            </Card>
          </Tab>
          <Tab eventKey="ratings" title="Ratings">
            {ratings.length > 0 ? (
              ratings?.map((el, i) => (
                <RatingsTemplate
                  key={i}
                  ratedBy={el.ratedBy}
                  ratingsDate={el.ratingsDate}
                  ratingStars={el.ratingStars}
                  ratingsContent={el.ratingsContent}
                  ratingsTitle={el.ratingsTitle}
                />
              ))
            ) : (
              <Alert>
                You currently have no ratings. Please check again later.
              </Alert>
            )}
          </Tab>
        </Tabs>
      </div>
      {show && (
        <EditBusiness user={user} show={show} handleClose={handleClose} />
      )}
    </div>
  );
};

export default ManageBusiness;
