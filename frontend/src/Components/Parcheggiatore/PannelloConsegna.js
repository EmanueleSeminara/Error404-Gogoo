import React, { Component } from "react";
import "../../ComponentsCss/Pannel.css";
import CardConsegna from "./CardConsegna";
import Axios from "axios";
import { Alert } from "@material-ui/lab";


export default class PannelloConsegna extends Component {
  state = {
    listReservation: [],
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
      } else if (c.role === "admin") {
        window.location.href = "/pannelloAmministratore";
      } else {
        Axios.get("/api/valet/vehiclesgoingtomyparking")
          .then((res) => {
            this.setState({ listReservation: res.data });
            console.log(res.data);
          })
          .catch((err) => {
            window.location.href = '/errorServer';
          });
      }
    }
  }

  remove = (reservationID, vehicleID) => {
    Axios.delete(
      "/api/valet/retirevehicle?id=" +
        reservationID +
        "&refVehicle=" +
        vehicleID
    )
      .then((res) => {
        this.setState({
          listReservation: this.state.listReservation.filter(
            (reservation) => reservation.id !== reservationID
          ),
        });
      })
      .catch((err) => {
        window.location.href = "/errorServer";
      });
  };

  render() {
    return (
      <div
        className="row h-100 justify-content-md-center"
        style={{ margin: "1%", minHeight: "45vh" }}
      >
        <div className="col-sm-12 col-md-8 col-lg-6 my-auto ">
          <div
            style={{
              padding: "3vh",
              borderTopLeftRadius: "10px",
              borderTopRightRadius: "10px",
            }}
          ></div>
          {this.state.listReservation.length === 0 && (
            <Alert severity="info">Non hai prenotazioni da consegnare</Alert>
          )}

          {
            <div>
              {this.state.listReservation.map((item) => (
                <div className="p-3">
                  <CardConsegna
                    id={item.id}
                    state={item.state}
                    type={item.type}
                    category={item.category}
                    dateR={item.dateR}
                    dateC={item.dateC}
                    refParkingR={item.refParkingR}
                    refParkingC={item.refParkingC}
                    refVehicle={item.refVehicle}
                    name={item.name}
                    surname={item.surname}
                    remove={this.remove}
                  />
                </div>
              ))}
            </div>
          }
        </div>
      </div>
    );
  }
}
