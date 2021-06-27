import React, { Component } from "react";
import {ListGroup, ListGroupItem } from "reactstrap";


import faker from 'faker';
import Axios from "axios";
import CardConsegnaFuoriStallo from "./CardConsegnaFuoriStallo";


export default class PannelloRitiroConsegna extends Component {
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

    setRSelected = (num) => {
        this.setState({ rSelected: num });
    }

    handleChange = (input) => (e) => {
        this.setState({ [input]: e.target.value });
    };

    setModifica = (bool) => {
        this.setState({ modifica: bool });
    }

    onValidSubmit = (event) => {
        event.preventDefault();
        console.log(this.state);
    };

    remove = (reservationID) => {
        Axios.delete('/api/reservation/delete/' + reservationID)
            .then((res) => {
                this.setState({ listReservation: this.state.listReservation.filter(reservation => reservation.id !== reservationID) });
                window.location.href = '/pagamento';
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
                                    <CardConsegnaFuoriStallo id={item.id} type={item.type} category={item.category} dateR={item.dateR} dateC={item.dateC} refParkingR={item.refParkingR} refParkingC={item.refParkingC} refDriver={item.refDriver} refVehicle={item.refVehicle} positionC={item.positionC} positionR={item.positionR} state={"withdrawn"} remove={this.remove} />
                                )))}
                            </div>}
                    </ListGroup>
                </div>
            </div>
        );
    }
}

