import { useState } from "react";
import { Alert, Tab, Tabs } from "react-bootstrap";
import UserContentTemplate from "./UserContent";
import ContentPhotos from "./ContentPhotos";
import MessagesTemplate from "./DisplayMessages";

const ManageFollowers = ({
  commonBiggerBoxclasses,
  content,
  messages,
  user,
}) => {
  const [show, setShow] = useState(false);
  return (
    <div className={commonBiggerBoxclasses + "h-100 overflow-y-auto"}>
      <h2 className={"text-start fs-6 fw-bold mx-2 mb-4"}>Manage Content</h2>
      <div className="px-2">
        <Tabs className="mb-3">
          <Tab eventKey="content" title="Content">
            {content[0]?.map((item, index) => (
              <UserContentTemplate
                key={index}
                contentBody={item.contentBody}
                contentImage={item.contentImage}
              />
            ))}
          </Tab>
          <Tab eventKey="photos" title="Photos">
            <ContentPhotos content={content} />
          </Tab>
          <Tab eventKey="messages" title="Messages">
            {messages[0]?.length > 0 ? (
              messages[0]?.map((file) => (
                <MessagesTemplate
                  key={file._id}
                  subject={file.subject}
                  id={file._id}
                  sender={file.sender}
                  sendDate={file.sendDate}
                  messageBody={file.messageBody}
                  user={user}
                  show={show}
                  setShow={setShow}
                />
              ))
            ) : (
              <Alert>No messages to see yet.</Alert>
            )}
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default ManageFollowers;
