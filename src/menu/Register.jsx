import React, { useEffect, useState } from "react";
import "react-bootstrap";
import axios from "axios";
import "../App.css";
import { Button, Container, Form } from "react-bootstrap";
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

const Register = ({ user }) => {
  const [userId, setUserId] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const getCustomer = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/signup?userEmail=${user.email}`
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
  }, [user.email]);

  //Form input states for updating user account with newly registered business
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
    image: "",
    imageId: `${Date.now() + 200}`,
  });

  //Merge vendor filled form Object with identifying data for querying
  const formData = Object.assign(vendor, {
    userId: userId,
    userEmail: userEmail,
    userName: userName,
  });

  const uid = {
    clientUID: user.uid,
  };

  //Submit form to update
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/api/register", formData)
      .then((res) => {
        console.log(res.status);
      })
      .catch((error) => {
        console.warn(error.message);
      });

    axios
      .post(
        `http://localhost:8080/api/signup/add-client?userEmail=${user.email}`,
        uid
      )
      .then((res) => console.log(res.statusText))
      .catch((err) => console.warn(err.message));
  };

  return (
    <Container fluid className="col-9 p-3 custom-pry-color">
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
          <Form.Label htmlFor="photos">
            <Upload /> Upload photos:
          </Form.Label>
          <small className="text-primary">
            (Only JPG/JPEG and PNG are accepted.)
          </small>
          <Form.Control
            type="file"
            className="rounded-0"
            name="photos"
            accept=".jpeg, .jpg, .png, .pdf, .docx, .pptx"
            value={vendor.image}
            onChange={(e) => setVendor({ ...vendor, image: e.target.value })}
          />
          <Button type="submit" className="w-25 custom-pry rounded-0 border-0">
            Submit
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default Register;
