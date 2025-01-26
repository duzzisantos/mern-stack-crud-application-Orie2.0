import axios from "axios";
import { useState } from "react";
import { Form } from "react-bootstrap";
import { getHost } from "../helpers/getHost";
import { X } from "react-bootstrap-icons";

const ContentPhotos = ({ user }) => {
  const [status, setStatus] = useState(0);
  const [show, setShow] = useState(false);

  function handleUpload(e) {
    const file = e.target.files[0];
    const form = new FormData();

    form.append("image", file);

    axios
      .post(`${getHost()}/api/upload-image?clientID=${user?.uid}`, form, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      })
      .then((res) => {
        if (res.status !== 200 || res.status !== 201) {
          setStatus(res.status);
        } else {
          setStatus(res.status);
        }

        setShow(true);
      })
      .catch((err) => {
        console.error(err.message);
        setShow(true);
      });
  }
  return (
    <Form className="d-flex flex-column vstack gap-2 rounded-2">
      <Form.Label htmlFor="image" className="btn btn-dark btn-sm w-25">
        Upload
      </Form.Label>

      <Form.Control
        type="file"
        id="image"
        className="rounded-0 visually-hidden"
        name="image"
        accept=".jpeg, .jpg, .png"
        onChange={handleUpload}
      />
      <div className="d-flex justify-content-between">
        {" "}
        <Form.Text>
          Max Upload 100 KB. (Only JPG/JPEG and PNG are accepted.)
        </Form.Text>
        {show ? (
          <div
            className={`alert alert-${
              status !== 200 ? "danger" : "success"
            } w-25 p-2 hstack d-flex justify-content-between`}
          >
            <span>
              {status !== 200
                ? "Error uploading data."
                : "Success uploading data"}
            </span>{" "}
            <button
              onClick={() => setShow(false)}
              className="bg-transparent btn btn-sm text-dark"
            >
              <X />
            </button>
          </div>
        ) : null}
      </div>
    </Form>
  );
};

export default ContentPhotos;
