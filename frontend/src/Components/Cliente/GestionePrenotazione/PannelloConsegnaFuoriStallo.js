import React, { Component } from "react";
import Axios from "axios";
import CardConsegnaFuoriStallo from "./CardConsegnaFuoriStallo";
import NavbarCliente from "../../../Components/NavbarCliente";
import { Alert } from "@material-ui/lab";

export default class PannelloConsegnaFuoriStallo extends Component {
  state = {
    listReservation: [],
    string: "",
    error: false,
  };

  componentDidMount() {
    if (localStorage.getItem("utente") === null) {
      window.location.href = "/";
    } else {
      let c = JSON.parse(localStorage.getItem("utente"));
      if (c.role === "driver") {
        window.location.href = "/pannelloAutista";
      } else if (c.role === "admin") {
        window.location.href = "/pannelloAmministratore";
      } else if (c.role === "valet") {
        window.location.href = "/pannelloParcheggiatore";
      } else {
        Axios.get("/api/reservation/myreservations")
          .then((res) => {
            this.setState({ listReservation: res.data });
          })
          .catch((err) => {
            window.location.href = "/errorServer";
          });
      }
    }
  }

  onValidSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);
  };

  remove = (reservationID, vehicleID, position) => {
    console.log(reservationID, vehicleID, position);
    Axios.delete(
      "/api/guest/deliveryoutofstall?id=" +
        reservationID +
        "&refVehicle=" +
        vehicleID +
        "&position=" +
        position
    )
      .then((res) => {
        this.setState({
          listReservation: this.state.listReservation.filter(
            (reservation) => reservation.id !== reservationID
          ),
        });
        window.location.href = "/pagamento";
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 503) {
          this.setState({
            string: "impossibile effettuare l'operazione riprova più tardi",
          });
          this.setState({ error: true });
        } else if (err.response.status === 422) {
          this.setState({ string: "errore nell'inserimento dei dati" });
          this.setState({ error: true });
        } else {
          window.location.href = "/errorServer";
        }
      });
  };

  render() {
    return (
      <div className="ez sfondo-card">
        <NavbarCliente />
        {this.state.error && (
          <Alert severity="error">{this.state.string}</Alert>
        )}
        <div className="row justify-content-md-center  ">
          <div className="d-flex flex-column pannell-User ">
            <center>
              <div className="title">Consegna fuori stallo</div>
            </center>
            {this.state.listReservation.length === 0 && (
              <Alert severity="info">Non hai prenotazioni</Alert>
            )}
            <div className="d-flex flex-row flex-wrap justify-content-center">
              {this.state.listReservation.map((item) => (
                <div className="p-3 col-12">
                  <CardConsegnaFuoriStallo
                    id={item.id}
                    type={item.type}
                    category={item.category}
                    dateR={item.dateR}
                    dateC={item.dateC}
                    refParkingR={item.refParkingR}
                    refParkingC={item.refParkingC}
                    refDriver={item.refDriver}
                    refVehicle={item.refVehicle}
                    positionC={item.positionC}
                    positionR={item.positionR}
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
