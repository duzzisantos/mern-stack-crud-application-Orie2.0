import { Button, Card, Tab, Tabs } from "react-bootstrap";
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

const ManageBusiness = ({
  commonBiggerBoxclasses,
  commonHeaderClasses,
  business,
}) => {
  const obj = business.registeredBusinesses;

  return (
    <div className={commonBiggerBoxclasses}>
      <h2 className={commonHeaderClasses}>Manage Business</h2>
      <div className="px-2">
        <Tabs className="mb-3">
          <Tab eventKey="details" title="Details">
            <Card className="border-0">
              <Card.Header className="d-flex justify-content-between bg-transparent shadow-sm">
                <h6>Manage General Details</h6>
                <Button
                  size="sm"
                  variant="transparent"
                  className="border-0 btn-outline-primary"
                >
                  <PencilFill />
                </Button>
              </Card.Header>
              <Card.Body>
                {obj?.map((el, i) => (
                  <ul key={i} className="lh-lg">
                    <li>
                      <PersonAdd /> First name: {el.firstName}
                    </li>
                    <li>
                      <PeopleFill /> Last name: {el.lastName}
                    </li>
                    <li>
                      <BuildingFill /> Business name: {el.businessName}
                    </li>
                    <li>
                      <ShieldCheck /> Business ID: {el.businessID}
                    </li>
                    <li>
                      <TelephoneInboundFill /> Business Phone:{" "}
                      {el.businessPhone}
                    </li>
                    <li>
                      <GeoAltFill /> Address: {el.address}
                    </li>
                    <li>
                      <BriefcaseFill /> Category: {el.category}
                    </li>
                    <li>
                      <EnvelopeAt /> Email: {el.email}
                    </li>
                  </ul>
                ))}
              </Card.Body>
            </Card>
          </Tab>
          <Tab eventKey="ratings" title="Ratings">
            Tab content for ratings
          </Tab>
          <Tab eventKey="follow-up" title="Follow up">
            Tab content for ratings
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default ManageBusiness;
