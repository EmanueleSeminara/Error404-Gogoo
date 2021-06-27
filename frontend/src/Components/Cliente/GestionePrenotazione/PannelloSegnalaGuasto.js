import React, { Component } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";

import Axios from "axios";
import CardSegnalaGuasto from "./CardSegnalaGuasto";



export default class PannelloSegnalaGuasto extends Component {
    state = {
        listReservation: [],
    };

    componentDidMount() {
        Axios.get('/api/reservation/myreservations')
            .then((res) => {
                this.setState({ listReservation: res.data })
                console.log(this.state.listReservation)
            }).catch((err) => {
                console.log(err);
                //window.location.href = '/errorServer'
            })
    }


    segnaleGuasto = (reservationID, position) => {
        const data = {
            id: reservationID,
            position: position
        }
        Axios.put('/api/guest/damagedvehicle', data)
            .then((res) => {
                this.setState({ listReservation: this.state.listReservation.filter(reservation => reservation.id !== reservationID) });
            }).catch((err) => {
                window.location.href = '/errorServer';
            });
    };



    render() {
        return (
            <div className="row h-100 justify-content-md-center">
                <div className="col-sm-12 col-md-8 col-lg-6 my-auto" style={{ margin: "1%", minHeight: "100vh" }}>
                    <ListGroup>
                        <ListGroupItem style={{ backgroundColor: "#2e1534", padding: "10px", borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }}></ListGroupItem>
                        {<div>
                            {this.state.listReservation.map(((item) => (
                                <CardSegnalaGuasto id={item.id} type={item.type} category={item.category} dateR={item.dateR} dateC={item.dateC} refParkingR={item.refParkingR} refParkingC={item.refParkingC} refDriver={item.refDriver} refVehicle={item.refVehicle} positionC={item.positionC} positionR={item.positionR} state={item.state} segnaleGuasto={this.segnaleGuasto} />
                            )))}
                        </div>}
                    </ListGroup>
                </div>
            </div>
        );
    }
}

