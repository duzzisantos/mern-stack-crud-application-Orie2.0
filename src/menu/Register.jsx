import React, { useEffect, useState } from "react";
import "react-bootstrap";
import axios from "axios";
import "../App.css";
import { Button, Col, Container, Form } from "react-bootstrap";
import { optionsArray } from "../helpers/hardCodedData";
import {
  BriefcaseFill,
  BuildingFill,
  EnvelopeAt,
  GeoAltFill,
  GlobeAmericas,
  Map,
  PeopleFill,
  PersonPlusFill,
  ShieldFillCheck,
  TelephoneInbound,
  Upload,
} from "react-bootstrap-icons";
import { getHost } from "../helpers/getHost";
import { encodeImageAsURL } from "../helpers/stringHelpers";
import { getBase64Size } from "../helpers/getBase64Size";

const Register = ({ user }) => {
  const [userId, setUserId] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const getCustomer = async () => {
      try {
        const res = await axios.get(
          `${getHost()}/api/signup?userEmail=${user.email}`,
          {
            headers: {
              Authorization: user.accessToken,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );
        if (res.status !== 200) {
          throw new Error(`${res.status} ${res.statusText}`);
        } else {
          setUserEmail(res.data[0].userEmail);
          setUserId(res.data[0].userId);
          setUserName(res.data[0].userEmail);
        }
      } catch (err) {
        console.warn(err.response);
      }
    };
    getCustomer();
  }, [user]);

  //Form input states for updating user account with newly registered business
  const [converted, setConverted] = useState("");

  const [vendor, setVendor] = useState({
    businessID: `${Date.now()}`,
    firstName: "",
    lastName: "",
    businessName: "",
    address: "",
    city: "",
    state: "",
    email: "",
    businessPhone: "",
    category: "",
    imageId: `${Date.now() + 200}`,
  });

  //Merge vendor filled form Object with identifying data for querying
  const formData = Object.assign(vendor, {
    userId: userId,
    userEmail: userEmail,
    photos: [{ image: converted }],
    userName: userName,
  });

  const uid = {
    clientUID: user.uid,
  };

  //Submit form to update
  const handleSubmit = () => {
    axios
      .post(`${getHost()}/api/register`, formData, {
        headers: {
          Authorization: user.accessToken,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res.status);
      })
      .catch((error) => {
        console.warn(error.message);
      });

    axios
      .post(`${getHost()}/api/signup/add-client?userEmail=${user.email}`, uid, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((res) => console.log(res.statusText))
      .catch((err) => console.warn(err.message));
  };

  const fileSize = getBase64Size(converted);

  return (
    <Container fluid className="col-lg-9 col-sm-12 p-3">
      <h1 className="fs-3 fw-bold">Add Business</h1>
      <div className="py-3 d-flex justify-content-center">
        <Form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="gap-3 vstack"
        >
          <Form.Group>
            <Form.Label htmlFor="businessID">
              <ShieldFillCheck /> Business ID:
            </Form.Label>
            <Form.Control
              type="number"
              className="rounded-0"
              value={vendor.businessID}
              id="businessID"
              name="businessID"
              onChange={(e) =>
                setVendor({ ...vendor, businessID: e.target.value })
              }
              disabled
            />
          </Form.Group>
          <Form.Group>
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
              value={vendor.firstName}
              onChange={(e) =>
                setVendor({ ...vendor, firstName: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group>
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
              value={vendor.lastName}
              onChange={(e) =>
                setVendor({ ...vendor, lastName: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group>
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
              value={vendor.businessName}
              onChange={(e) =>
                setVendor({ ...vendor, businessName: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group>
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
              value={vendor.address}
              onChange={(e) =>
                setVendor({ ...vendor, address: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group>
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
              value={vendor.city}
              onChange={(e) => setVendor({ ...vendor, city: e.target.value })}
            />
          </Form.Group>
          <Form.Group>
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
              value={vendor.state}
              onChange={(e) => setVendor({ ...vendor, state: e.target.value })}
            />
          </Form.Group>
          <Form.Group>
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
              value={vendor.email}
              onChange={(e) => setVendor({ ...vendor, email: e.target.value })}
            />
          </Form.Group>
          <Form.Group>
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
              value={vendor.businessPhone}
              onChange={(e) =>
                setVendor({ ...vendor, businessPhone: e.target.value })
              }
            />
          </Form.Group>
          <Form.Label htmlFor="category">
            <BriefcaseFill /> Category:
          </Form.Label>
          <Form.Select
            id="category"
            className="rounded-0"
            required
            value={vendor.category}
            onChange={(e) => setVendor({ ...vendor, category: e.target.value })}
          >
            <option>Please select</option>
            {optionsArray.map((item, index) => (
              <option key={index}>{item}</option>
            ))}
          </Form.Select>
          <Form.Label htmlFor="image-register">
            <Upload /> Upload photo:
          </Form.Label>

          <Form.Control
            type="file"
            id="image-register"
            className="rounded-0"
            name="image"
            accept=".jpeg, .jpg, .png"
            onChange={() => encodeImageAsURL("image-register", setConverted)}
          />
          <div className="d-flex justify-content-between">
            {" "}
            <Form.Text>
              Max Upload 100 KB. (Only JPG/JPEG and PNG are accepted.)
            </Form.Text>
            {fileSize > 100000 && (
              <div className="bg-warning-subtle px-2 rounded-2">
                File cannot exceed 100 KB.
              </div>
            )}
          </div>
          <Col className="hstack gap-2">
            <Button
              type="submit"
              className="custom-pry rounded-3 custom-pry-border text-dark"
              disabled={Object.values(vendor).every((el) => !el)}
            >
              Submit
            </Button>
            <input
              title="Reset"
              type="reset"
              className="btn bg-transparent custom-pry-border rounded-3"
              onClick={() => setVendor("")}
            />
          </Col>
        </Form>
      </div>
    </Container>
  );
};

export default Register;
