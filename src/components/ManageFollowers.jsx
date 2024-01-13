import { Tab, Tabs } from "react-bootstrap";
import UserContentTemplate from "./UserContent";
import ContentPhotos from "./ContentPhotos";

const ManageFollowers = ({
  commonBiggerBoxclasses,
  commonHeaderClasses,
  content,
}) => {
  return (
    <div className={commonBiggerBoxclasses}>
      <h2 className={"text-start fs-6 fw-bold mx-2 mb-4"}>Manage Content</h2>
      <div className="px-2">
        <Tabs className="mb-3">
          <Tab eventKey="home" title="Content">
            {content[0]?.map((item, index) => (
              <UserContentTemplate
                key={index}
                contentBody={item.contentBody}
                contentImage={item.contentImage}
              />
            ))}
          </Tab>
          <Tab eventKey="profile" title="Photos">
            <ContentPhotos content={content} />
          </Tab>
          <Tab eventKey="contact" title="Messages">
            Tab content for Messages
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default ManageFollowers;
