import React, { Component } from "react";
import "../../../ComponentsCss/Pannel.css";
import { Button, ButtonGroup } from "reactstrap";
import CardRimuoviUtente from "./CardRimuoviUtente";
import Axios from "axios";
import { Alert } from "@material-ui/lab";
import NavbarDipendente from "../../../Components/NavbarDipendente";

export default class PannelloRimuoviUtente extends Component {
  state = {
    listusers: [],
    role: "guest",
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
        Axios.get("api/admin/listusers/guest")
          .then((res) => {
            this.setState({ listusers: res.data });
          })
          .catch((err) => {
            window.location.href = "/errorServer";
          });
      }
    }
  }

  search = () => {
    console.log("SONO DENTRO SEARCH");
    console.log(this.state.role);
    Axios.get("api/admin/listusers/" + this.state.role)
      .then((res) => {
        this.setState({ listusers: res.data });
        console.log(this.state.listusers);
      })
      .catch((err) => {
        window.location.href = "/errorServer";
      });
  };

  setRSelected = (type) => {
    this.setState({ role: type });
  };

  remove = (userID) => {
    Axios.delete("/api/admin/delete/" + userID)
      .then((res) => {
        this.setState({
          listusers: this.state.listusers.filter((user) => user.id !== userID),
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
            <div className="title">Rimuovi utente</div>
            <ButtonGroup style={{ margin: "10px", flexWrap: "wrap" }}>
              <Button
                className={
                  this.state.role === "guest"
                    ? "buttonCyanoGruoupSelected"
                    : "buttonCyanoGruoup"
                }
                onClick={async () => {
                  await this.setRSelected("guest");
                  this.search();
                }}
                active={this.state.role === "guest"}
              >
                Cliente
              </Button>
              <Button
                className={
                  this.state.role === "driver"
                    ? "buttonCyanoGruoupSelected"
                    : "buttonCyanoGruoup"
                }
                onClick={async () => {
                  await this.setRSelected("driver");
                  this.search();
                }}
                active={this.state.role === "driver"}
              >
                Autista
              </Button>
              <Button
                className={
                  this.state.role === "valet"
                    ? "buttonCyanoGruoupSelected"
                    : "buttonCyanoGruoup"
                }
                onClick={async () => {
                  await this.setRSelected("valet");
                  this.search();
                }}
                active={this.state.role === "valet"}
              >
                Parcheggiatore
              </Button>
              <Button
                className={
                  this.state.role === "admin"
                    ? "buttonCyanoGruoupSelected"
                    : "buttonCyanoGruoup"
                }
                onClick={async () => {
                  await this.setRSelected("admin");
                  this.search();
                }}
                active={this.state.role === "admin"}
              >
                Amministratore
              </Button>
            </ButtonGroup>
            {this.state.listusers.length === 0 && (
              <Alert severity="error">
                Non sono presenti utenti della categoria selezionata
              </Alert>
            )}
            <div class="d-flex flex-column">
              {this.state.listusers.map((item) => (
                <div className="p-3 carta">
                  <CardRimuoviUtente
                    name={item.name}
                    surname={item.surname}
                    email={item.email}
                    id={item.id}
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
