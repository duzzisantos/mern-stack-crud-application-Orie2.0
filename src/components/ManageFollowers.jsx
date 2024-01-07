import { Tab, Tabs } from "react-bootstrap";

const ManageFollowers = ({
  commonBiggerBoxclasses,
  commonHeaderClasses,
  content,
}) => {
  return (
    <div className={commonBiggerBoxclasses}>
      <h2 className={commonHeaderClasses}>Manage Content</h2>
      <div className="px-2">
        <Tabs className="mb-3">
          <Tab eventKey="home" title="Content">
            Tab content for Posts
          </Tab>
          <Tab eventKey="profile" title="Photos">
            Tab content for Photos
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
