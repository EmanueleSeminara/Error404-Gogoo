import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Axios from "axios";

import { Navbar, NavbarBrand } from "reactstrap";

export default class NavbarCliente extends Component {
  state = {
    isOpen: false,
  };

  logout = () => {
    window.localStorage.clear();
    Axios.post("/api/user/logout")
      .then((res) => {
        window.location.href = "/login";
      })
      .catch((err) => {
        if (err.response.status === 401) {
          window.location.href = "/login";
        } else {
          window.location.href = "/errorServer";
        }
      });
  };

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    return (
      <div>
        <Navbar
          light
          expand="md"
          style={{ backgroundColor: "#39304d", marginBottom: "45px" }}
          fixed="top"
        >
          <NavbarBrand href="/" style={{ color: "white" }}>
            dropcar
          </NavbarBrand>
        </Navbar>
      </div>
    );
  }
}
