import { Card, Button } from "react-bootstrap";
import {
  Heart,
  HandThumbsDown,
  Bookmark,
  CheckCircleFill,
  ThreeDotsVertical,
} from "react-bootstrap-icons";

const Timeline = ({
  authorName,
  contentImage,
  authorImage,
  businessCategory,
  contentBody,
}) => {
  return (
    <Card className="p-2 col-12 border-0 shadow-sm">
      <fieldset className="d-flex flex-column px-2">
        <div className="d-flex justify-content-between">
          <div className="d-flex justify-content-start hstack gap-3">
            <legend
              style={{ height: "30px", width: "30px", borderRadius: "50px" }}
            >
              <img
                src={
                  authorImage ??
                  "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Mercedes-Logo.svg/1024px-Mercedes-Logo.svg.png"
                }
                alt="user"
                style={{ height: "30px", width: "30px", borderRadius: "50px" }}
              />
            </legend>
            <div className="d-flex flex-column">
              <small className="fw-bold mt-2">
                {authorName ?? "Mercedes Benz"}{" "}
                <CheckCircleFill className="text-primary" />
              </small>
              <small className="text-secondary">
                {businessCategory ?? "Category X"}
              </small>
            </div>
          </div>
          <Button
            variant="transparent"
            id="More Info"
            className="rounded-pill"
            title="More Info"
            aria-label="More Info"
          >
            <ThreeDotsVertical />
          </Button>
        </div>

        <article className="mt-2">
          {contentBody ?? "Loading content..........."}
        </article>
        <div className="justify-content-start hstack mt-3 fw-light col-lg-2 col-sm-9">
          <Button
            variant="transparent"
            className="d-flex flex-column"
            title="Like"
          >
            <Heart />
            <small>{12}</small>
          </Button>
          <Button
            variant="transparent"
            className="d-flex flex-column"
            title="Unlike"
          >
            <HandThumbsDown />
            <small>{2}</small>
          </Button>
          <Button
            variant="transparent"
            className="d-flex flex-column"
            title="Bookmark"
          >
            <Bookmark />
            <small>{2}</small>
          </Button>
        </div>
      </fieldset>
    </Card>
  );
};

export default Timeline;
