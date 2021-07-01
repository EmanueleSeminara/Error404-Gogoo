import React, { Component } from "react";
import { Button, ButtonGroup } from "reactstrap";
import CardRimuoviVeicolo from "./CardRimuoviVeicolo";
import Axios from "axios";
import { Alert } from "@material-ui/lab";
import NavbarDipendente from "../../../Components/NavbarDipendente";
import Footer from "../../Footer";

export default class PannelloRimuoviVeicolo extends Component {
  state = {
    listvehicles: [],
    type: "car",
  };

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
      } else {
        Axios.get("/api/vehicle/listvehicle/car")
          .then((res) => {
            this.setState({ listvehicles: res.data });
          })
          .catch((err) => {
            window.location.href = "/errorServer";
          });
      }
    }
  }

  search = () => {
    console.log("SONO DENTRO SEARCH");
    console.log(this.state.type);
    Axios.get("/api/vehicle/listvehicle/" + this.state.type)
      .then((res) => {
        this.setState({ listvehicles: res.data });
        console.log(this.state.listvehicles);
      })
      .catch((err) => {
        window.location.href = "/errorServer";
      });
  };

  setRSelected = (num) => {
    this.setState({ type: num });
  };

  remove = (vehiclesID) => {
    Axios.delete("/api/vehicle/delete/" + vehiclesID)
      .then((res) => {
        this.setState({
          listvehicles: this.state.listvehicles.filter(
            (vehicles) => vehicles.id !== vehiclesID
          ),
        });
      })
      .catch((err) => {
        window.location.href = "/errorServer";
      });
  };

  render() {
    return (
      <div className="ez sfondo" style={{ height: "100%" }}>
        <NavbarDipendente />
        <div className="row h-100 justify-content-md-center boxpannel">
          <div className="d-flex flex-column pannell-amministratore">
            <div className="title">Rimuovi veicolo</div>
            {this.state.listvehicles.length === 0 && (
              <Alert severity="error">Non ci sono veicoli</Alert>
            )}
            <ButtonGroup style={{ flexWrap: "wrap" }}>
              <Button
                className={
                  this.state.type === "car"
                    ? "buttonCyanoGruoupSelected"
                    : "buttonCyanoGruoup"
                }
                onClick={async () => {
                  await this.setRSelected("car");
                  this.search();
                }}
                active={this.state.type === "car"}
              >
                Automobile
              </Button>
              <Button
                className={
                  this.state.type === "scooter"
                    ? "buttonCyanoGruoupSelected"
                    : "buttonCyanoGruoup"
                }
                onClick={async () => {
                  await this.setRSelected("scooter");
                  this.search();
                }}
                active={this.state.type === "scooter"}
              >
                Motore
              </Button>
              <Button
                className={
                  this.state.type === "electric scooter"
                    ? "buttonCyanoGruoupSelected"
                    : "buttonCyanoGruoup"
                }
                onClick={async () => {
                  await this.setRSelected("electric scooter");
                  this.search();
                }}
                active={this.state.type === "electric scooter"}
              >
                Monopattino
              </Button>
              <Button
                className={
                  this.state.type === "bicycle"
                    ? "buttonCyanoGruoupSelected"
                    : "buttonCyanoGruoup"
                }
                onClick={async () => {
                  await this.setRSelected("bicycle");
                  this.search();
                }}
                active={this.state.type === "bicycle"}
              >
                Bicicletta
              </Button>
            </ButtonGroup>
            <div class="d-flex flex-column">
              {this.state.listvehicles.map((item) => (
                <div className="p-3 carta">
                  <CardRimuoviVeicolo
                    id={item.id}
                    type={item.type}
                    category={item.category}
                    refParking={item.refParking}
                    state={item.state}
                    remove={this.remove}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
