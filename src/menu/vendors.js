import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import "../App.css";
import { Button } from "react-bootstrap";

const Vendors = () => {
  const [vendor, setVendor] = useState([]);
  const [search, setSearch] = useState("");
  const getVendorData = async () => {
    try {
      const res = await axios.get("http://localhost:8080/register");
      console.log(res.statusText);
      setVendor(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getVendorData();
  });

  const buttonStyle = {
    backgroundColor: "transparent",
    borderRadius: "15px",
    border: "1px solid rgba(0,0,0,0.5)",
    padding: "5px",
    width: "80px",
    color: "gray",
    marginLeft: "10px",
    fontSize: "12px"
  }
  
  return (
    <div className="page-wrapper-vendors">
      <h3>Search for vendors</h3>
      <label htmlFor="search-category" className="search-label">
        Search By Category
      </label>
      <select id="category" onChange={(e) => setSearch(e.target.value)}>
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
      <hr></hr>

      <div className="vendor-display-wrapper">
        {vendor
          .filter((business) =>
            search === "No Selection"
              ? !business
              : search.match(new RegExp(`${business.category}`), "gi")
              ? business
              : !business
          )
          .map((business) => (
            <div className="one-vendor" key={business._id}>
              <div className="one-vendor-image-area">
                <div className="one-vendor-carousel">
                  <img src={business.photos} alt="Logo"></img>
                  {/* <img src={business.photos.data[1]} alt="Pictures"></img>
                  <img src={business.photos.data[2]} alt="Pictures"></img>
                  <img src={business.photos.data[3]} alt="Pictures"></img> */}
                </div>
              </div>
              <hr></hr>
              <div className="one-vendor-info">
                <ul className="vendor-list">
                  <li>
                    <strong>Company name</strong>: {business.businessName}
                  </li>
                  <li>
                    <strong>Address</strong>: {business.address}
                  </li>
                  <li>
                    <strong>Email:</strong> {business.email}
                    {"      "}
                    <Button size="sm" className="contact-btn" style={buttonStyle}>
                      {" "}
                      <a href={`mailto:${business.email}`}>Send</a>
                    </Button>
                  </li>
                  <li>
                    <strong>Phone</strong>: {business.businessPhone} {"      "}
                    <Button size="sm" className="contact-btn" style={buttonStyle}>
                      <a href={`tel:${business.businessPhone}`}>Call</a>
                    </Button>
                  </li>
                  <li>
                    <strong>Category</strong>: {business.category}
                  </li>
                  <li>
                    <strong>Contact person</strong>:{" "}
                    {business.firstName + " " + business.lastName}
                  </li>
                </ul>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Vendors;
