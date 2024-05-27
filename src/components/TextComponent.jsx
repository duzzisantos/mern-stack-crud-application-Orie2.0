import { Button, Col, Form } from "react-bootstrap";

const TextComponent = ({
  handleClose,
  handleSave,
  content,
  setContent,
  title,
}) => {
  return (
    <Form
      className=" rounded-1 bg-light d-flex flex-column gap-2 p-2"
      onSubmit={() => {
        handleSave();
      }}
    >
      <Form.Label
        className="text-secondary smaller-text mb-0 fw-bold"
        htmlFor={title}
      >
        {title}
      </Form.Label>
      <Form.Control
        as={"textarea"}
        className="rounded-0"
        rows={2}
        autoCorrect="true"
        id={title}
        name={title}
        title={title}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <Col className="d-flex justify-content-end hastack gap-2">
        <Button
          size="sm"
          className="custom-pry custom-pry-border rounded-3"
          type="submit"
          disabled={content === ""}
        >
          Reply
        </Button>
        <Button
          type="button"
          size="sm"
          className="custom-pry-border bg-transparent custom-pry-color rounded-3"
          onClick={handleClose}
        >
          Cancel
        </Button>
      </Col>
    </Form>
  );
};

export default TextComponent;
