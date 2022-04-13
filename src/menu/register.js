import React, { useState } from "react";
import "react-bootstrap";
import axios from "axios";
import "../App.css";
import qs from "qs";

const Register = () => {
  const [vendor, setVendor] = useState({
    ID: Date.now(),
    firstName: "",
    lastName: "",
    businessName: "",
    address: "",
    email: "",
    businessPhone: 0,
    category: "",
    photos: "",
  });

  const handleSubmit = () => {
    axios
      .post("http://localhost:8080/register", qs.stringify(vendor))
      .then((res) => {
        console.log(res.data);
        console.log(vendor);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="page-wrapper-form">
      <form
        className="registration-form"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <h3>Register a business</h3>
        <label htmlFor="vendorID">Your ID:</label>
        <input
          type="number"
          value={vendor.ID}
          id="ID"
          name="ID"
          onChange={(e) => setVendor({ ...vendor, ID: e.target.value })}
          disabled
          style={{ backgroundColor: "gray", color: "white" }}
        />
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          required
          id="firstName"
          name="firstName"
          minLength={1}
          maxLength={50}
          spellCheck="false"
          autoCapitalize="on"
          value={vendor.firstName}
          onChange={(e) => setVendor({ ...vendor, firstName: e.target.value })}
        />
        <label htmlFor="lastname">Last Name:</label>
        <input
          type="text"
          required
          id="lastName"
          name="lastName"
          minLength={1}
          maxLength={50}
          spellCheck="false"
          autoCapitalize="on"
          value={vendor.lastName}
          onChange={(e) => setVendor({ ...vendor, lastName: e.target.value })}
        />
        <label htmlFor="businessname">Business Name:</label>
        <input
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
        <label htmlFor="address">Address:</label>
        <input
          type="text"
          required
          id="address"
          name="address"
          minLength={1}
          maxLength={50}
          spellCheck="false"
          autoCapitalize="on"
          value={vendor.address}
          onChange={(e) => setVendor({ ...vendor, address: e.target.value })}
        />
        <label htmlFor="email">Email:</label>
        <input
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
        <label htmlFor="businessPhone">Business Phone:</label>
        <input
          type="tel"
          required
          id="businessPhone"
          name="businessPhone"
          size={11}
          value={vendor.businessPhone}
          onChange={(e) =>
            setVendor({ ...vendor, businessPhone: e.target.value })
          }
        />
        <label htmlFor="category">Category:</label>
        <select
          id="category"
          required
          value={vendor.category}
          onChange={(e) => setVendor({ ...vendor, category: e.target.value })}
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
          accept=".jpeg, .jpg, .png, .pdf, .docx, .pptx"
          value={vendor.photos}
          onChange={(e) => setVendor({ ...vendor, photos: e.target.value })}
        />
        <button type="submit" id="register-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Register;
