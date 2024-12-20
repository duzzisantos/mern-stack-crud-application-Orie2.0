import { Alert, Tab, Tabs } from "react-bootstrap";
// import UserContentTemplate from "./UserContent";
import ContentPhotos from "./ContentPhotos";
import MessagesTemplate from "./DisplayMessages";
import Replies from "./Replies";

const ManageFollowers = ({
  commonBiggerBoxclasses,
  content,
  messages,
  user,
}) => {
  return (
    <div className={commonBiggerBoxclasses + "h-100 overflow-y-auto mt-5"}>
      <h2 className={"text-start fs-6 fw-bold mx-2 mb-4"}>Manage Content</h2>
      <div className="px-2">
        <Tabs className="mb-3">
          {/* <Tab eventKey="content" title="Content">
            {content[0]?.map((item, index) => (
              <UserContentTemplate
                key={index}
                contentBody={item.contentBody}
                contentImage={""}
              />
            ))}
          </Tab> */}
          <Tab eventKey="photos" title="Photos">
            <ContentPhotos content={content} />
          </Tab>
          <Tab eventKey="messages" title="Messages">
            {messages.flat()?.length > 0 ? (
              messages
                .flat()
                ?.map((file) => (
                  <MessagesTemplate
                    key={file._id}
                    subject={file.subject}
                    id={file._id}
                    sender={file.sender}
                    receiver={file.receiver}
                    sendDate={file.sendDate}
                    messageBody={file.messageBody}
                    secondParty={file.clientUID}
                    user={user}
                    Replies={<Replies replies={file.replies} />}
                  />
                ))
            ) : (
              <Alert className="border-0">No messages to see yet.</Alert>
            )}
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default ManageFollowers;
