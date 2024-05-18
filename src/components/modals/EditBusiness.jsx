import { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Form, Button, Col } from "react-bootstrap";
import { optionsArray } from "../../helpers/hardCodedData";
import {
  BriefcaseFill,
  BuildingFill,
  EnvelopeAt,
  GeoAltFill,
  GlobeAmericas,
  Map,
  PencilFill,
  PeopleFill,
  PersonPlusFill,
  TelephoneInbound,
  Upload,
} from "react-bootstrap-icons";
import { getHost } from "../../helpers/getHost";
import { encodeImageAsURL } from "../../helpers/stringHelpers";

const EditBusiness = ({ user, show, handleClose }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [email, setEmail] = useState("");
  const [businessPhone, setBusinessPhone] = useState("");
  const [category, setCategory] = useState("");
  const [converted, setConverted] = useState("");

  useEffect(() => {
    const getOneBusiness = async () => {
      try {
        const response = await axios.get(
          `${getHost()}/api/register/business-entity?clientUID=${user.uid}`,
          {
            headers: {
              Authorization: `Bearer ${user.accessToken}`,
            },
          }
        );
        if (response.status !== 200) {
          throw new Error(`${response.status} ${response.statusText}`);
        } else {
          const data = response.data[0];

          setFirstName(data.firstName);
          setLastName(data.lastName);
          setBusinessName(data.businessName);
          setAddress(data.address);
          setCity(data.city);
          setState(data.state);
          setEmail(data.email);
          setBusinessPhone(data.businessPhone);
          setCategory(data.category);
        }
      } catch (err) {
        console.warn(err);
      }
    };
    getOneBusiness();
  }, [user]);

  const editedItems = {
    businessName: businessName,
    firstName: firstName,
    lastName: lastName,
    address: address,
    city: city,
    state: state,
    email: email,
    businessPhone: businessPhone,
    category: category,
    clientUID: user.uid,
  };
  const handleEditBusiness = () => {
    axios
      .post(
        `${getHost()}/api/register/edit?clientUID=${user.uid}`,
        Object.assign(editedItems, {
          photos: [{ image: converted }],
        }),
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      )
      .then((res) => console.log(res.status))
      .catch((err) => console.warn(err.message));
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      size="lg"
      className="custom-pry-color"
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <PencilFill /> Editing My Business
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          onSubmit={handleEditBusiness}
          encType="multipart/form-data"
          className="gap-3 vstack"
        >
          <div>
            {" "}
            <Form.Label htmlFor="firstName">
              <PersonPlusFill /> First Name:
            </Form.Label>
            <Form.Control
              type="text"
              className="rounded-0"
              required
              id="firstName"
              name="firstName"
              minLength={1}
              maxLength={50}
              spellCheck="false"
              autoCapitalize="on"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div>
            <Form.Label htmlFor="lastname">
              <PeopleFill /> Last Name:
            </Form.Label>
            <Form.Control
              type="text"
              className="rounded-0"
              required
              id="lastName"
              name="lastName"
              minLength={1}
              maxLength={50}
              spellCheck="false"
              autoCapitalize="on"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div>
            {" "}
            <Form.Label htmlFor="businessname">
              <BuildingFill /> Business Name:
            </Form.Label>
            <Form.Control
              type="text"
              className="rounded-0"
              required
              id="businessName"
              name="businessName"
              minLength={1}
              maxLength={50}
              spellCheck="false"
              autoCapitalize="on"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
            />
          </div>
          <div>
            {" "}
            <Form.Label htmlFor="address">
              <GeoAltFill /> Address:
            </Form.Label>
            <Form.Control
              type="text"
              className="rounded-0"
              required
              id="address"
              name="address"
              minLength={1}
              maxLength={50}
              spellCheck="false"
              autoCapitalize="on"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div>
            {" "}
            <Form.Label htmlFor="city">
              <GlobeAmericas /> City:
            </Form.Label>
            <Form.Control
              type="text"
              className="rounded-0"
              required
              id="city"
              name="city"
              minLength={1}
              maxLength={50}
              spellCheck="false"
              autoCapitalize="on"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div>
            {" "}
            <Form.Label htmlFor="state">
              <Map /> State:
            </Form.Label>
            <Form.Control
              type="text"
              className="rounded-0"
              required
              id="state"
              name="state"
              minLength={1}
              maxLength={50}
              spellCheck="false"
              autoCapitalize="on"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </div>
          <div>
            {" "}
            <Form.Label htmlFor="email">
              <EnvelopeAt /> Email:
            </Form.Label>
            <Form.Control
              type="text"
              className="rounded-0"
              required
              id="email"
              name="email"
              minLength={1}
              maxLength={50}
              spellCheck="false"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <Form.Label htmlFor="businessPhone">
              <TelephoneInbound /> Business Phone:
            </Form.Label>
            <Form.Control
              type="text"
              className="rounded-0"
              required
              id="businessPhone"
              name="businessPhone"
              size={11}
              value={businessPhone}
              onChange={(e) => setBusinessPhone(e.target.value)}
            />
          </div>
          <Form.Label htmlFor="category">
            <BriefcaseFill /> Category:
          </Form.Label>
          <Form.Select
            id="category"
            className="rounded-0"
            required
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Please select</option>
            {optionsArray.map((item, index) => (
              <option key={index}>{item}</option>
            ))}
          </Form.Select>
          <Form.Label htmlFor="image-edit">
            <Upload /> Upload photos:
          </Form.Label>
          <small className="text-primary">
            (Only JPG/JPEG and PNG are accepted.)
          </small>
          <Form.Control
            type="file"
            className="rounded-0"
            name="image"
            id="image-edit"
            accept=".jpeg, .jpg, .png"
            onChange={(e) => encodeImageAsURL("image-edit", setConverted)}
          />
          <Col className="hstack gap-2">
            <Button
              type="submit"
              className="w-25 custom-pry rounded-0 custom-pry-border"
            >
              Submit
            </Button>
            <Button
              onClick={handleClose}
              className="w-25 rounded-0 bg-transparent custom-pry-color custom-pry-border"
            >
              Close
            </Button>
          </Col>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditBusiness;
