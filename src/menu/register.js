import React, { useEffect, useState } from "react";
import { auth } from "../authentication/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "react-bootstrap";
import axios from "axios";
import "../App.css";
import { Button, Container, Form } from "react-bootstrap";

const Register = () => {
  const [user] = useAuthState(auth);
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

  console.log(userId, userEmail, userName);
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

  //Submit form to update
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/api/register", formData)
      .then((res) => {
        console.log(res.data);
        console.log(vendor);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const optionsArray = [
    "Okirika",
    "Fabrics",
    "Computers and accessories",
    "Auto parts",
    "Groceries",
    "Leather goods",
    "Building materials",
    "Vehicles",
    "Medical",
    "Education",
    "Legal",
    "Information Technology",
    "Maintenance",
    "Financial",
    "Hospitality",
  ];

  return (
    <Container fluid className="col-12 px-0 d-flex justify-content-center">
      <div className="mt-3 py-5 col-lg-6 col-sm-12 col-md-10">
        <h1>Register a business</h1>
        <Form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="gap-3 vstack"
        >
          <div>
            <Form.Label htmlFor="businessID">Business ID:</Form.Label>
            <Form.Control
              type="number"
              value={vendor.businessID}
              id="businessID"
              name="businessID"
              onChange={(e) =>
                setVendor({ ...vendor, businessID: e.target.value })
              }
              disabled
            />
          </div>
          <div>
            {" "}
            <Form.Label htmlFor="firstName">First Name:</Form.Label>
            <Form.Control
              type="text"
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
          </div>
          <div>
            <Form.Label htmlFor="lastname">Last Name:</Form.Label>
            <Form.Control
              type="text"
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
          </div>
          <div>
            {" "}
            <Form.Label htmlFor="businessname">Business Name:</Form.Label>
            <Form.Control
              type="text"
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
          </div>
          <div>
            {" "}
            <Form.Label htmlFor="address">Address:</Form.Label>
            <Form.Control
              type="text"
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
          </div>
          <div>
            {" "}
            <Form.Label htmlFor="city">City:</Form.Label>
            <Form.Control
              type="text"
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
          </div>
          <div>
            {" "}
            <Form.Label htmlFor="state">State:</Form.Label>
            <Form.Control
              type="text"
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
          </div>
          <div>
            {" "}
            <Form.Label htmlFor="email">Email:</Form.Label>
            <Form.Control
              type="text"
              required
              id="email"
              name="email"
              minLength={1}
              maxLength={50}
              spellCheck="false"
              value={vendor.email}
              onChange={(e) => setVendor({ ...vendor, email: e.target.value })}
            />
          </div>
          <div>
            <Form.Label htmlFor="businessPhone">Business Phone:</Form.Label>
            <Form.Control
              type="text"
              required
              id="businessPhone"
              name="businessPhone"
              size={11}
              value={vendor.businessPhone}
              onChange={(e) =>
                setVendor({ ...vendor, businessPhone: e.target.value })
              }
            />
          </div>
          <Form.Label htmlFor="category">Category:</Form.Label>
          <Form.Select
            id="category"
            required
            value={vendor.category}
            onChange={(e) => setVendor({ ...vendor, category: e.target.value })}
          >
            <option>Please select</option>
            {optionsArray.map((item, index) => (
              <option key={index}>{item}</option>
            ))}
          </Form.Select>
          <Form.Label htmlFor="photos">Upload photos:</Form.Label>
          <small className="text-primary">
            (Only JPG/JPEG and PNG are accepted.)
          </small>
          <Form.Control
            type="file"
            name="photos"
            accept=".jpeg, .jpg, .png, .pdf, .docx, .pptx"
            value={vendor.image}
            onChange={(e) => setVendor({ ...vendor, image: e.target.value })}
          />
          <Button
            type="submit"
            className="w-25 custom-yellow text-dark border-0"
          >
            Submit
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default Register;
