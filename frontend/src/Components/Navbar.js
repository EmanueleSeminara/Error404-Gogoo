import React, { Component } from "react";

import 'bootstrap/dist/js/bootstrap.min.js';

export default class Navbar extends Component {

  render() {
    return (
      <nav
        className="navbar navbar-expand-sm navbar-dark justify-content-end"
        style={{ backgroundColor: "#39304D" }}
      >
        <a
          className="navbar-brand glacialReg"
          href="/"
          style={{ fontSize: "20px" }}
        >
          GoGoo!
        </a>
      </nav>
    );
  }
}
