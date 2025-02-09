import { Card, Button, Form } from "react-bootstrap";
import {
  BriefcaseFill,
  BuildingsFill,
  PlusCircle,
} from "react-bootstrap-icons";
import { handleFollow } from "../api/timelineAPIs";

const SuggestedFollows = ({
  user,
  businessName,
  category,
  secondParty,
  secondPartyEmail,
}) => {
  return (
    <Card className="p-2 gap-2 border-0 shadow-sm rounded-0">
      <small>
        <BuildingsFill /> {businessName ?? "My Business Limited"}
      </small>
      <small>
        <BriefcaseFill /> {category ?? "Financial"}
      </small>
      <div className="d-flex justify-content-start gap-2">
        <Form>
          <Button
            size="sm"
            variant="transparent"
            className="border border-1 border-secondary"
            onClick={() => {
              handleFollow(user, secondParty, secondPartyEmail);
            }}
          >
            <PlusCircle /> Follow
          </Button>
        </Form>
      </div>
    </Card>
  );
};

export default SuggestedFollows;
