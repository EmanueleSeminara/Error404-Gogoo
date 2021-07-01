import React, { Component } from "react";

import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Cane from "../images/serverError.png";
export default class Errorpage extends Component {
  componentDidMount() {
    window.localStorage.clear();
  }

  render() {
    return (
      <>
        <div
          className="ez flex-column error"
          style={{
            backgroundColor: "#1C1927",
            display: "flex",
            alignItems: "center",
            height: "100vh",
            height: "100%",
            overflow: "hidden",
          }}
        >
          <Navbar />

          <img src={Cane} style={{ width: "650px", paddingTop: "20px" }} />
        </div>
        <Footer />
      </>
    );
  }
}
