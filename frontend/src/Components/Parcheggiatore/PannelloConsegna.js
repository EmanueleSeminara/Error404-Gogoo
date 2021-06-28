import React, { Component } from "react";

import { Jumbotron, Button } from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
import "../../ComponentsCss/Pannel.css";
import faker from 'faker';
import CardConsegna from "./CardConsegna";
import Axios from 'axios';

const data = new Array(10).fill().map((value, index) => ({ id: index, type: faker.lorem.words(1), category: faker.lorem.word(1) }))

export default class PannelloConsegna extends Component {
    state = {
        listReservation: []
    }

    componentDidMount() {
        Axios.get('/api/valet/vehiclesgoingtomyparking')
            .then((res) => {
                this.setState({ listReservation: res.data });
                console.log(res.data)
            }).catch((err) => {
                console.log(err)
                //window.location.href = '/errorServer';
            });
    }

    remove = (reservationID, vehicleID) => {
        const data={
            id: reservationID,
            refVehicle : vehicleID
        }
        Axios.delete('/api/valet/retirevehicle', data)
            .then((res) => {
                this.setState({ listReservation: this.state.listReservation.filter(reservation => reservation.id !== reservationID) });
                // MOSTRA ALLERT SUCCESSO+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
            }).catch((err) => {
                window.location.href = '/errorServer';
            });
    };

    render() {
        return (
            <div className="row h-100 justify-content-md-center" style={{ margin: "1%", minHeight: "45vh" }}>
                <div className="col-sm-12 col-md-8 col-lg-6 my-auto ">
                    <div style={{ backgroundColor: "#27394c", padding: "3vh", borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }}>
                    </div>

                    {<div>
                        {this.state.listReservation.map(((item) => (

                            <CardConsegna id={item.id} state={item.state} type={item.type} category={item.category} dateR={item.dateR} dateC={item.dateC} refParkingR={item.refParkingR} refParkingC={item.refParkingC} refVehicle={item.refVehicle} name={item.name} surname={item.surname} remove={this.remove}  />

                        )))}
                    </div>}
                </div>
            </div>
        );
    }
}