import React, { Component } from "react";
import Axios from "axios";
import CardRitardoConsegna from "./CardRitardoConsegna";
import NavbarCliente from "../../../Components/NavbarCliente";
import { Alert } from "@material-ui/lab";

export default class PannelloRitardoConsegna extends Component {
  state = {
    listReservation: [],
    error: false,
    string: "",
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
        Axios.get("/api/guest/myreservationslatedelivery")
          .then((res) => {
            this.setState({ listReservation: res.data });
            console.log(this.state.listReservation);
          })
          .catch((err) => {
            window.location.href = "/errorServer";
          });
      }
    }
  }

  changeDestination = (reservationID, parkingC) => {
    const data = {
      id: reservationID,
      refParkingC: parkingC,
    };
    console.log(data);
    Axios.put("/api/guest/changedestinationparking", data)
      .then((res) => {
        this.setState({
          listReservation: this.state.listReservation.filter(
            (reservation) => reservation.id !== reservationID
          ),
        });
      })
      .catch((err) => {
        if (err.response.status === 422) {
          this.setState({ string: "errore nell'inserimento dei dati" });
          this.setState({ error: true });
        } else if (err.response.status === 503) {
          this.setState({
            string:
              "impossibile cambiare le opzioni di consegna al momento, riprova più tardi",
          });
          this.setState({ error: true });
        } else {
          console.log(err);
          window.location.href = "/serverError";
        }
      });
  };

  changeTime = (reservationID, dateC) => {
    const data = {
      id: reservationID,
      dateC: dateC,
    };
    console.log(data);
    Axios.put("/api/guest/deliverydelay", data)
      .then((res) => {
        this.setState({
          listReservation: this.state.listReservation.filter(
            (reservation) => reservation.id !== reservationID
          ),
        });
        localStorage.setItem("price", 25);
        this.setState({ error: false });
        window.location.href = "/pagamento";
      })
      .catch((err) => {
        if (err.response.status === 422) {
          this.setState({ string: "errore nell'inserimento dei dati" });
          this.setState({ error: true });
        } else if (err.response.status === 503) {
          this.setState({
            string:
              "impossibile cambiare le opzioni di consegna al momento, riprova più tardi",
          });
          this.setState({ error: true });
        } else {
          console.log(err);
          window.location.href = "/serverError";
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
              <div className="title">Ritardo Consegna</div>
            </center>
            {this.state.listReservation.length === 0 && (
              <Alert severity="info">Non hai prenotazioni in ritardo</Alert>
            )}
            <div className="d-flex flex-row flex-wrap justify-content-center">
              {this.state.listReservation.map((item) => (
                <div className="p-3 col-12">
                  <CardRitardoConsegna
                    id={item.id}
                    type={item.type}
                    category={item.category}
                    dateR={item.dateR}
                    dateC={item.dateC}
                    refParkingR={item.refParkingR}
                    refParkingC={item.refParkingC}
                    refVehicle={item.refVehicle}
                    positionR={item.positionR}
                    state={item.state}
                    changeDestination={this.changeDestination}
                    changeTime={this.changeTime}
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
