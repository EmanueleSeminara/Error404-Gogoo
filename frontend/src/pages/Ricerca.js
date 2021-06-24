import React, { Component } from 'react';
import "../ComponentsCss/util.css";
import "../ComponentsCss/main.css";


import NavbarRicerca from "../Components/Ricerca/NavbarRicerca";
import FormRicerca from "../Components/Ricerca/FormRicerca";



// pick a date util library


export default class Ricerca extends Component {

  componentDidMount() {
    if (localStorage.getItem("utente") !== null) {
      let c = JSON.parse(localStorage.getItem("utente"));
      if (c.role === "admin") {
        window.location.href = "/pannelloAmministratore";
      }
    } else {
      window.location.href = "/login";
    }
  }


  render() {
    return (
      <div>
        <NavbarRicerca />
        <FormRicerca />

      </div>


    );
  }

}