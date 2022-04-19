import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button } from "react-bootstrap";
import { Link, Routes, Route } from "react-router-dom";
import EditVendor from "./edit-vendor";


const Admin = () => {
  const [tabulate, setTabulate] = useState([]);
  const getRequest = async () => {
    try {
      const res = await axios.get("http://localhost:8080/register");
      console.log(res.statusText);
      setTabulate(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getRequest();
  }, []);

  const handleDelete = (_id) => {
    axios
      .delete("http://localhost:8080/register/" + _id)
      .then((res) => {
        console.log(res.statusText);
        getRequest();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="page-wrapper">
      <h3>Database Administrator</h3>
      <Table striped bordered hover className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Business Name</th>
            <th>Address</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Category</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {tabulate.map((item) => (
            <tr key={item._id}>
              <td>{item.ID}</td>
              <td>{item.firstName}</td>
              <td>{item.lastName}</td>
              <td>{item.businessName}</td>
              <td>{item.address}</td>
              <td>{item.email}</td>
              <td>{item.businessPhone}</td>
              <td>{item.category}</td>
              <td>
                <Button
                  bg="success"
                  variant="dark"
                  style={{
                    color: "white",
                    marginLeft: "0px",
                    fontSize: "10px",
                    backgroundColor: "#25D366"
                  }}
                >
                  <Link to={`/edit-vendor/${item._id}`} className="links">
                    Edit
                  </Link>
                  <Routes>
                    <Route
                      path="/edit-vendor/:ID"
                      element={<EditVendor />}
                    />
                  </Routes>
                </Button>
              </td>
              <td>
                <Button
                  bg="danger"
                  variant="dark"
                  size="sm"
                  style={{
                    color: "white",
                    marginLeft: "0px",
                    fontSize: "10px",
                  }}
                  onClick={(e) => handleDelete(item._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Admin;
