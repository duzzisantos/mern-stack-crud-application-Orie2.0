import { Button, OverlayTrigger, Popover } from "react-bootstrap";
import { ThreeDotsVertical } from "react-bootstrap-icons";

const MenuPopover = ({ children, show, setShow }) => {
  return (
    <OverlayTrigger
      trigger="click"
      placement="bottom"
      overlay={
        <Popover className="rounded-2 shadow-lg mt-0 border-0">
          <Popover.Body className="p-0 custom-pry-color">
            {children}
          </Popover.Body>
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
