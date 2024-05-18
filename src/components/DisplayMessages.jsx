import { useState } from "react";
import { Badge, Button } from "react-bootstrap";
import { CalendarDateFill, PersonFill, Send } from "react-bootstrap-icons";
import ReplyMessage from "./modals/ReplyMessage";

const MessagesTemplate = ({
  subject,
  sender,
  receiver,
  sendDate,
  messageBody,
  id,
  user,
  Replies,
  secondParty,
}) => {
  const [show, setShow] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [whichReply, setWhichReply] = useState("");
  const handleClose = () => {
    setShow(false);
  };
  return (
    <>
      <div className="d-flex flex-column vstack gap-1 p-3 shadow-sm rounded-0 my-3">
        <h2 className="fs-6 fw-bold">
          {subject}: {id}
        </h2>
        <div className="d-flex vstack gap-1 smaller-text text-secondary">
          {sender === user.email ? (
            <Badge
              className="bg-success p-2"
              pill
              style={{ width: "fit-content" }}
            >
              Sent
            </Badge>
          ) : (
            <Badge
              className="bg-warning text-dark p-2"
              pill
              style={{ width: "fit-content" }}
            >
              Received
            </Badge>
          )}
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
          <div className="hstack gap-2">
            <Button
              size="sm"
              variant="transparent"
              about="To reply a message"
              title="Reply message"
              className={`bg-transparent custom-pry-color custom-pry-border`}
              onClick={() => setShow(!show)}
            >
              <Send /> Follow up
            </Button>
            <Button
              size="sm"
              variant="transparent"
              className="text-secondary border border-secondary"
              onClick={() => {
                setShowReplies(!showReplies);
                setWhichReply(id);
              }}
            >
              Responses
            </Button>
          </div>
        )}
        {showReplies && whichReply && Replies}
      </div>
      {show && (
        <ReplyMessage
          show={show}
          handleClose={handleClose}
          messageId={id}
          sender={sender}
          user={user}
          repliedBy={user.email}
          secondParty={secondParty}
        />
      )}
    </>
  );
};

export default MessagesTemplate;
