import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import axios from "axios";

export default class TableRow extends Component {
  constructor(props) {
    super(props);
    this.deleteVendor = this.deleteVendor.bind(this);
  }
  deleteVendor() {
    axios
      .delete(
        "http://localhost:4000/api/registered" + this.props.obj._id
      )
      .then((res) => {
        console.log(
          res.status(200).json({ message: "Successfullt deleted data" })
        );
      })
      .catch(err => {
        console.log(err)
      })
  }
  render() {
    return (
      <tr>
        <td>{this.props.obj.id}</td>
        <td>{this.props.obj.firstName}</td>
        <td>{this.props.obj.lastName}</td>
        <td>{this.props.obj.businessName}</td>
        <td>{this.props.obj.address}</td>
        <td>{this.props.obj.email}</td>
        <td>{this.props.obj.businessPhone}</td>
        <td>{this.props.obj.category}</td>
        <td>
          <Link to={"/edit-vendor/" + this.props.obj._id} className="links">
            Edit
          </Link>
          <Button bg="danger" variant="dark" size="sm">
            Delete
          </Button>
        </td>
      </tr>
    );
  }
}
