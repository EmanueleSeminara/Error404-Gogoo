import React, { Component } from "react";
import "../../ComponentsCss/Pannel.css";
import CardRitiraConsegnaAutista from "./CardRitiraConsegnaAutista";
import Axios from "axios";
import { Alert } from "@material-ui/lab";

export default class PannelloRitiraConsegnaAutista extends Component {
  state = {
    listReservationDriver: [],
  };

  componentDidMount() {
    if (localStorage.getItem("utente") === null) {
      window.location.href = "/";
    } else {
      let c = JSON.parse(localStorage.getItem("utente"));
      if (c.role === "admin") {
        window.location.href = "/pannelloAmministratore";
      } else if (c.role === "guest") {
        window.location.href = "/ricerca";
      } else if (c.role === "valet") {
        window.location.href = "/pannelloParcheggiatore";
      } else {
        Axios.get("/api/driver/myreservations")
          .then((res) => {
            console.log(res.data);
            this.setState({ listReservationDriver: res.data });
          })
          .catch((err) => {
            console.log(err);
            //window.location.href = '/errorServer';
          });
      }
    }
  }

  consegna = (reservationID, vehicleID) => {
    Axios.delete(
      "/api/driver/cardelivery/?id=" +
        reservationID +
        "&refVehicle=" +
        vehicleID
    )
      .then((res) => {
        this.setState({
          listReservationDriver: this.state.listReservationDriver.filter(
            (reservation) => reservation.id !== reservationID
          ),
        });
        // MESSAGGIO DI SUCESSO +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      })
      .catch((err) => {
        console.log(err);
        //window.location.href = '/errorServer';
      });
  };

  render() {
    return (
      <div
        className="row h-100 justify-content-md-center"
        style={{ margin: "1%", minHeight: "45vh" }}
      >
        <div className="col-sm-12 col-md-8 col-lg-6 my-auto ">
          {this.state.listReservationDriver.length === 0 && (
            <Alert severity="info">
              Non hai prenotazioni da ritirare o consegnare
            </Alert>
          )}

          {this.state.listReservationDriver.map((item) => (
            <div className="p-3">
              <CardRitiraConsegnaAutista
                type={item.type}
                category={item.category}
                id={item.id}
                dateR={item.dateR}
                dateC={item.dateC}
                refVehicle={item.refVehicle}
                positionC={item.positionC}
                positionR={item.positionR}
                state={item.state}
                name={item.name}
                surname={item.surname}
                consegna={this.consegna}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}
