import { Card, Button } from "react-bootstrap";
import {
  Heart,
  HandThumbsDown,
  Bookmark,
  CheckCircleFill,
  ThreeDotsVertical,
} from "react-bootstrap-icons";

const Timeline = ({ user, userName }) => {
  return (
    <Card className="p-2 col-12 border-0 shadow-sm">
      <fieldset className="d-flex flex-column px-2">
        <div className="d-flex justify-content-between">
          <div className="d-flex justify-content-start hstack gap-3">
            <legend
              style={{ height: "30px", width: "30px", borderRadius: "50px" }}
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Mercedes-Logo.svg/1024px-Mercedes-Logo.svg.png"
                alt="user"
                style={{ height: "30px", width: "30px", borderRadius: "50px" }}
              />
            </legend>
            <small className="fw-bold">
              Mercedes Benz <CheckCircleFill className="text-info" />
            </small>
          </div>
          <Button variant="transparent" className="rounded-5">
            <ThreeDotsVertical />
          </Button>
        </div>

        <article>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officiis,
          repudiandae. Odio minima ipsum quas numquam architecto optio neque
          nesciunt non molestiae. Pariatur in sint fugiat corrupti illo deserunt
          nemo iure?
        </article>
        <div className="justify-content-start hstack mt-3 fw-light col-lg-2 col-sm-9">
          <Button variant="transparent" className="d-flex flex-column">
            <Heart />
            <small>{12}</small>
          </Button>
          <Button variant="transparent" className="d-flex flex-column">
            <HandThumbsDown />
            <small>{2}</small>
          </Button>
          <Button variant="transparent" className="d-flex flex-column">
            <Bookmark />
            <small>{2}</small>
          </Button>
        </div>
      </fieldset>
    </Card>
  );
};

export default Timeline;
