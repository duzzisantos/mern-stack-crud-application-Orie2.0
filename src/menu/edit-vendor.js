import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "react-bootstrap";
import axios from "axios";
import "../App.css";
// import qs from "qs";

const EditVendor = () => {
  let navigate = useNavigate();
  const params = useParams();

  const [ID, setVendorID] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [businessPhone, setBusinessPhone] = useState(0);
  const [category, setCategory] = useState("");
  const [photos, setPhotos] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:8080/register/`, {ID: params.ID})
      .then((res) => {
        const vendorData = res.data;
        console.log(vendorData);
        setVendorID(vendorData.ID);
        setFirstName(vendorData.firstName);
        setLastName(vendorData.lastName);
        setBusinessName(vendorData.businessName);
        setAddress(vendorData.address);
        setEmail(vendorData.email);
        setBusinessPhone(vendorData.businessPhone);
        setCategory(vendorData.category);
        setPhotos(vendorData.photos);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [params.ID]);

  const handleUpdate = (id, e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8080/register/${ID}`, {
        ID,
        firstName,
        lastName,
        businessName,
        address,
        email,
        businessPhone,
        category,
        photos,
      })
      .then((res) => {
        console.log(res.data);
        navigate("/admin");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div
      className="page-wrapper-form"
      onSubmit={(ID, e) => handleUpdate(ID, e)}
    >
      <form className="update-form" encType="multipart/form-data">
        <h3>Update Form (Admin)</h3>
        <label htmlFor="vendorID">Your ID:</label>
        <input
          type="number"
          id="ID"
          name="ID"
          // disabled
          value={ID}
          onChange={(e) => {
            setVendorID(e.target.value);
          }}
          style={{ backgroundColor: "gray", color: "white" }}
        />
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          minLength={1}
          maxLength={50}
          spellCheck="false"
          autoCapitalize="on"
          value={firstName}
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
        />
        <label htmlFor="lastname">Last Name:</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          minLength={1}
          maxLength={50}
          spellCheck="false"
          autoCapitalize="on"
          value={lastName}
          onChange={(e) => {
            setLastName(e.target.value);
          }}
        />
        <label htmlFor="businessname">Business Name:</label>
        <input
          type="text"
          id="businessName"
          name="businessName"
          minLength={1}
          maxLength={50}
          spellCheck="false"
          autoCapitalize="on"
          value={businessName}
          onChange={(e) => {
            setBusinessName(e.target.value);
          }}
        />
        <label htmlFor="address">Address:</label>
        <input
          type="text"
          id="address"
          name="address"
          minLength={1}
          maxLength={50}
          spellCheck="false"
          autoCapitalize="on"
          value={address}
          onChange={(e) => {
            setAddress(e.target.value);
          }}
        />
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          name="email"
          minLength={1}
          maxLength={50}
          spellCheck="false"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <label htmlFor="businessPhone">Business Phone:</label>
        <input
          type="tel"
          id="businessPhone"
          name="businessPhone"
          size={11}
          value={businessPhone}
          onChange={(e) => {
            setBusinessPhone(e.target.value);
          }}
        />
        <label htmlFor="category">Category:</label>
        <select
          id="category"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
          }}
        >
          <option value="No selection" name="No Selection">
            --Select--
          </option>
          <option value="Okirika" name="Okrika">
            Okirika
          </option>
          <option value="Fabrics" name="Fabrics">
            Fabrics
          </option>
          <option value="Provisions" name="Provisions">
            Provisions
          </option>
          <option
            value="Computers and accessories"
            name="Computers and accessories"
          >
            Computers and accessories
          </option>
          <option value="Spare parts" name="Spare parts">
            Spare parts
          </option>
          <option value="Foodstuff" name="Foodstuff">
            Foodstuff
          </option>
          <option value="Leather goods" name="Leather goods">
            Leather goods
          </option>
          <option value="Building materials" name="Building materials">
            Building materials
          </option>
          <option value="Vehicles" name="Vehicles">
            Vehicles
          </option>
        </select>
        <label htmlFor="photos">Upload photos:</label>
        <span
          style={{ color: "tomato", fontSize: "0.7rem", marginLeft: "56px" }}
        >
          (Only JPG/JPEG and PNG are accepted.)
        </span>
        <input
          type="text"
          className="photos"
          name="photos"
          value={photos}
          onChange={(e) => {
            setPhotos(e.target.value);
          }}
        />
        <button type="submit" id="update-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default EditVendor;
