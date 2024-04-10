import { Button, Form } from "react-bootstrap";

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
      <div className="row justify-content-end me-1 gap-1">
        <Button
          size="sm"
          className="custom-pry border-0 w-25 rounded-0"
          type="submit"
        >
          Reply
        </Button>
        <Button
          type="button"
          size="sm"
          className="custom-pry-border bg-transparent text-dark w-25 rounded-0"
          onClick={handleClose}
        >
          Cancel
        </Button>
      </div>
    </Form>
  );
};

export default TextComponent;
