import { Button } from "react-bootstrap";
import { CalendarDateFill, PersonFill } from "react-bootstrap-icons";
import ReplyMessage from "./modals/ReplyMessage";

const MessagesTemplate = ({
  subject,
  sender,
  sendDate,
  messageBody,
  id,
  setShow,
  show,
  user,
}) => {
  return (
    <>
      <div className="d-flex flex-column vstack gap-1 p-3 shadow-sm rounded-0 my-3">
        <h2 className="fs-6 fw-bold">
          {subject}: {id}
        </h2>
        <div className="d-flex vstack gap-1 smaller-text text-secondary">
          <div>
            {" "}
            <PersonFill /> <small>{sender.split("@")[0] ?? sender}</small>
          </div>
          <div>
            <CalendarDateFill /> <small>{sendDate}</small>
          </div>
        </div>

        <p>{messageBody}</p>
        {sender.includes("Do not reply") ? null : ( //If message is from admin, the reply button is thus disabled, otherwise, user has access to reply other messages.
          <Button
            className={`w-25 btn-sm bg-transparent custom-pry-color custom-pry-border`}
            onClick={() => setShow(true)}
          >
            Reply
          </Button>
        )}
      </div>
      {show && (
        <ReplyMessage
          show={show}
          handleClose={() => setShow(false)}
          messageId={id}
          sender={sender}
          user={user}
          repliedBy={user.email}
        />
      )}
    </>
  );
};

export default MessagesTemplate;
