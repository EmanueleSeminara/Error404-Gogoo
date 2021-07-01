import React, { Component } from "react";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../ComponentsCss/PannelloAmministratore.css";
import AggiungiUtente from "../../images/svgAmministratore/AggiungiUtente.svg";
import AggiungiVeicolo from "../../images/svgAmministratore/AggiungiVeicolo.svg";
import Logout from "../../images/svgAmministratore/Logout.svg";
import ModificaDatiUtente from "../../images/svgAmministratore/ModificaDatiUtente.svg";
import RimuoviVeicolo from "../../images/svgAmministratore/RimuoviVeicolo.svg";
import ModificaStatoVeicolo from "../../images/svgAmministratore/ModificaStatoVeicolo.svg";
import PrenotazioniEffettuate from "../../images/svgAmministratore/PrenotazioniEffettuate.svg";
import RimuoviUtente from "../../images/svgAmministratore/RimuoviUtente.svg";
import { Button } from "reactstrap";
import Axios from "axios";
import NavbarDipendente from "../../Components/NavbarDipendente";

import Footer from "../Footer";

export default class PannelloAmministratore extends Component {
  componentDidMount() {
    if (localStorage.getItem("utente") === null) {
      window.location.href = "/";
    } else {
      let c = JSON.parse(localStorage.getItem("utente"));
      if (c.role === "driver") {
        window.location.href = "/pannelloAutista";
      } else if (c.role === "guest") {
        window.location.href = "/ricerca";
      } else if (c.role === "valet") {
        window.location.href = "/pannelloParcheggiatore";
      }
    }
  }

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

  render() {
    return (
      <div>
        <NavbarDipendente />
        <div className="row h-100 justify-content-md-center ">
          <center className="screen">
            <div className="pannellAdmin ">
              <div className="d-flex justify-content-center flex-wrap">
                <div>
                  <center>
                    <Button
                      className="p-3 buttonAdmin "
                      href="/aggiungiVeicolo"
                    >
                      <img className="iconAdmin" src={AggiungiVeicolo} alt="AggiungiVeicolo"/>
                    </Button>
                    <Button className="p-3 buttonAdmin " href="/rimuoviVeicolo">
                      <img className="iconAdmin" src={RimuoviVeicolo} alt="RimuoviVeicolo"/>
                    </Button>
                  </center>
                </div>
                <div>
                  <center>
                    <Button
                      className="p-3 buttonAdmin "
                      href="/modificaVeicolo"
                    >
                      <img className="iconAdmin" src={ModificaStatoVeicolo} alt="ModificaStatoVeicolo"/>
                    </Button>

                    <Button
                      className="p-3 buttonAdmin "
                      href="/visualizzaPrenotazioni"
                    >
                      <img className="iconAdmin" src={PrenotazioniEffettuate} alt="PrenotazioniEffettuate"/>
                    </Button>
                  </center>
                </div>
              </div>
              <div className="d-flex justify-content-center flex-wrap">
                <div>
                  <center>
                    <Button className="p-3 buttonAdmin " href="/aggiungiUtente">
                      <img className="iconAdmin" src={AggiungiUtente} alt="AggiungiUtente"/>
                    </Button>

                    <Button className="p-3 buttonAdmin " href="/rimuoviUtente">
                      <img className="iconAdmin" src={RimuoviUtente} alt="RimuoviUtente"/>
                    </Button>
                  </center>
                </div>
                <div>
                  <Button className="p-3 buttonAdmin " href="/modificaUtente">
                    <img className="iconAdmin" src={ModificaDatiUtente} alt="ModificaDatiUtente"/>
                  </Button>

                  <Button
                    className="p-3 buttonAdmin "
                    onClick={() => this.logout()}
                  >
                    <img className="iconAdmin" src={Logout} alt="Logout"/>
                 </Button>
                </div>
              </div>
            </div>
          </center>
        </div>
        <Footer />
      </div>
    );
  }
}
