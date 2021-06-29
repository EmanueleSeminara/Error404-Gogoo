import React, { Component } from "react";

import { Jumbotron, Button } from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
import "../../ComponentsCss/Pannel.css";
import CardRitiro from "./CardRitiro";
import Axios from 'axios';


export default class PannelloRitiro extends Component {
    state = {
        listReservation: []
    }

    componentDidMount() {
        if (localStorage.getItem("utente") === null) {
            window.location.href = '/'
        } else {
            let c = JSON.parse(localStorage.getItem("utente"));
            if (c.role === "driver") {
                window.location.href = "/pannelloAutista";
            } else if (c.role === "guest") {
                window.location.href = "/ricerca";
            } else if (c.role === "admin") {
                window.location.href = "/pannelloAmministratore";
            } else {
                Axios.get('/api/valet/reservationsinmyparking')
                    .then((res) => {
                        console.log(res.data)
                        this.setState({ listReservation: res.data });
                    }).catch((err) => {
                        window.location.href = '/errorServer';
                    });
            }
        }
    }


    ritira = (reservationID, vehicleID) => {
        const data = {
            id: reservationID,
            refVehicle: vehicleID
        }
        Axios.put('/api/valet/deliveryvehicle', data)
            .then((res) => {
                this.setState({ listReservation: this.state.listReservation.filter(reservation => reservation.id !== reservationID) });
            }).catch((err) => {
                console.log(err)
            })

    }

    render() {
        return (
            <div className="row h-100 justify-content-md-center" style={{ margin: "1%", minHeight: "45vh" }}>
                <div className="col-sm-12 col-md-8 col-lg-6 my-auto ">
                    <div style={{ padding: "3vh", borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }}>
                    </div>

                    {<div>
                        { this.state.listReservation.map(((item) => (

                            <CardRitiro id={item.id} type={item.type} category={item.category} dateR={item.dateR} dateC={item.dateC} refParkingR={item.refParkingR} refParkingC={item.refParkingC} refVehicle={item.refVehicle} name={item.name} surname={item.surname} ritira={this.ritira}/>

                        )))}
                    </div>}
                </div>
            </div>
        );
    }
}