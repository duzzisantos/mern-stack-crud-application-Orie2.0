import { Button } from "react-bootstrap";
import { CalendarDateFill, PersonFill } from "react-bootstrap-icons";

const MessagesTemplate = ({ subject, sender, sendDate, messageBody, id }) => {
  return (
    <div className="d-flex flex-column vstack gap-1 p-3 shadow-sm rounded-0 my-3">
      <h2 className="fs-6 fw-bold">
        {subject}: {id}
      </h2>
      <div className="d-flex vstack gap-1 smaller-text text-secondary">
        <div>
          {" "}
          <PersonFill /> <small>{sender.split("@")[0]}</small>
        </div>
        <div>
          <CalendarDateFill /> <small>{sendDate}</small>
        </div>
      </div>

      <p>{messageBody}</p>
      <Button className="w-25 btn-sm bg-transparent custom-pry-color custom-pry-border">
        Reply
      </Button>
    </div>
  );
};

export default MessagesTemplate;
