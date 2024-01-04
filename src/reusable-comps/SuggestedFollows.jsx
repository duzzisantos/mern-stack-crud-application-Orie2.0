import { Card, Button } from "react-bootstrap";
import { Plus, Search } from "react-bootstrap-icons";

const SuggestedFollows = ({ user, businessName, category }) => {
  return (
    <Card className="bg-transparent p-2 gap-2 shadow-sm border-0">
      <p className="text-secondary">{businessName ?? "My Business Limited"}</p>
      <small className="text-secondary">{category ?? "Financial"}</small>
      <div className="d-flex justify-content-start gap-2">
        <Button
          size="sm"
          variant="transparent"
          className="border border-secondary"
        >
          <Plus />
          Follow
        </Button>
        {user && (
          <Button
            size="sm"
            variant="transparent"
            className="border border-secondary"
          >
            <Search />
            <a className="text-decoration-none text-dark" href="/">
              View
            </a>
          </Button>
        )}
      </div>
    </Card>
  );
};

export default SuggestedFollows;
