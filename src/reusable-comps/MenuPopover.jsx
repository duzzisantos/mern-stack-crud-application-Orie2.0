import { Button, OverlayTrigger, Popover } from "react-bootstrap";
import { ThreeDotsVertical } from "react-bootstrap-icons";

const MenuPopover = ({ children, show, setShow }) => {
  return (
    <OverlayTrigger
      trigger={"click"}
      placement="bottom"
      overlay={
        <Popover>
          <Popover.Body>{children}</Popover.Body>
        </Popover>
      }
    >
      <Button onClick={() => setShow(!show)}>
        <ThreeDotsVertical />
      </Button>
    </OverlayTrigger>
  );
};

export default MenuPopover;
