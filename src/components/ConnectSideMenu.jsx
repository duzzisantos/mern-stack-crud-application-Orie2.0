import Offcanvas from "react-bootstrap/Offcanvas";

function ConnectSideMenu({ children, show, setShow }) {
  const handleClose = () => setShow(false);

  return (
    <>
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="custom-pry-color">
            Connect
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>{children}</Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default ConnectSideMenu;
