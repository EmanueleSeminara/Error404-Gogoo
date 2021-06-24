import React from "react";
import "../ComponentsCss/Footer.css";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#455565" }}>
      <a href="/" style={{ color: 'white', textDecoration: 'none' }}>
        <p>
          © 2020 Copyright: DCBs
          <br />
        </p>
      </a>
    </footer>
  );
}
