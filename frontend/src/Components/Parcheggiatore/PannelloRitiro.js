import React, { Component } from "react";

import { Jumbotron, Button } from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
import "../../ComponentsCss/Pannel.css";
import faker from 'faker';
import CardRitiro from "./CardRitiro";
import Axios from 'axios';

const data = new Array(10).fill().map((value, index) => ({ id: index, type: faker.lorem.words(1), category: faker.lorem.word(1) }))

export default class PannelloRitiro extends Component {
    state = {
        listvehicles: []
    }

    componentDidMount() {
        Axios.get('/api/valet/reservationsinmyparking')
            .then((res) => {
                this.setState({ listvehicles: res.data });
            }).catch((err) => {
                window.location.href = '/errorServer';
            });
    }

    ritiro = (cardID) => {
        console.log(this.state)
    };

    render() {
        return (
            <div className="row h-100 justify-content-md-center" style={{ margin: "1%", minHeight: "45vh" }}>
                <div className="col-sm-12 col-md-8 col-lg-6 my-auto ">
                    <div style={{ backgroundColor: "#27394c", padding: "3vh", borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }}>
                    </div>

                    {<div>
                        {/* this.state.listvehicles */data.map(((item) => (

                            <CardRitiro id={item.id} type={item.type} category={item.category} dateR={item.dateR} dateC={item.dateC} refParkingR={item.refParkingR} refParkingC={item.refParkingC} refVehicle={item.refVehicle} name={item.name} surname={item.surname} />

                        )))}
                    </div>}
                </div>
            </div>
        );
    }
}