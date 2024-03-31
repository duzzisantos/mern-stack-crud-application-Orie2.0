import { Button, OverlayTrigger, Popover } from "react-bootstrap";
import { ThreeDotsVertical } from "react-bootstrap-icons";

const MenuPopover = ({ children, show, setShow }) => {
  return (
    <OverlayTrigger
      trigger={"focus"}
      placement="bottom"
      overlay={
        <Popover className="rounded-0">
          <Popover.Body className="p-0">{children}</Popover.Body>
        </Popover>
      }
    >
      <Button
        variant="transparent"
        size="sm"
        className="border-0"
        onClick={() => setShow(!show)}
      >
        <ThreeDotsVertical />
      </Button>
    </OverlayTrigger>
  );
};

export default MenuPopover;
