import { Alert, Tab, Tabs } from "react-bootstrap";
import UserContentTemplate from "./UserContent";
import ContentPhotos from "./ContentPhotos";
import MessagesTemplate from "./DisplayMessages";
import Replies from "./Replies";
import CustomerPhotoGrid from "./CustomerPhotoGrid";

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
          <Tab eventKey="content" title={`Posts (${content[0]?.length})`}>
            <div className="bg-light p-4">
              <h6>{content[0]?.length} Posts</h6>
              {content[0]?.map((item, index) => (
                <UserContentTemplate
                  key={index}
                  contentBody={item.contentBody}
                  contentImage={""}
                />
              ))}
            </div>
          </Tab>
          <Tab eventKey="photos" title="Photos">
            <ContentPhotos content={content} user={user} />
            <CustomerPhotoGrid user={user} />
          </Tab>
          <Tab eventKey="messages" title={`Messages (${messages?.length})`}>
            <div className="bg-light p-4">
              <h6> {messages?.length} Messages</h6>
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
                <Alert variant="warning" className="border-0">
                  No messages to see yet.
                </Alert>
              )}
            </div>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default ManageFollowers;
