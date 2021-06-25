import React, { Component } from "react";
import { AvForm } from "availity-reactstrap-validation";
import { Button, ListGroup, ListGroupItem, Card, Jumbotron, Table, ButtonGroup } from "reactstrap";

import CardRimuoviVeicolo from "./CardRimuoviVeicolo";
import faker from 'faker';
import Axios from 'axios';


export default class PannelloRimuoviVeicolo extends Component {
    state = {
        listvehicles: [],
        type: "car",
    };

    componentDidMount() {
        Axios.get('/api/vehicle/listvehicle/car')
            .then((res) => {
                this.setState({ listvehicles: res.data });
            }).catch((err) => {
                window.location.href = '/errorServer';
            });
    }

    search = () => {
        console.log("SONO DENTRO SEARCH")
        console.log(this.state.type);
        Axios.get('/api/vehicle/listvehicle/' + this.state.type)
            .then((res) => {
                this.setState({ listvehicles: res.data });
                console.log(this.state.listvehicles);
            }).catch((err) => {
                window.location.href = '/errorServer';
            });
    }

    setRSelected = (num) => {
        this.setState({ type: num });
    }

    remove = (vehiclesID) => {
        Axios.delete('/api/vehicle/delete/' + vehiclesID)
            .then((res) => {
                this.setState({ listvehicles: this.state.listvehicles.filter(vehicles => vehicles.id !== vehiclesID) });
            }).catch((err) => {
                window.location.href = '/errorServer';
            });
    };


    render() {
        return (
            <div className="row h-100 justify-content-md-center"
                style={{ margin: "1%", minHeight: "85vh" }}>
                <div className="col-sm-12 col-md-8 col-lg-6 my-auto">
                    <center>
                        
                            <ListGroupItem style={{ backgroundColor: "#2e1534", padding: "10px", borderTopLeftRadius: "10px", borderTopRightRadius: "10px"}}>

                                <ButtonGroup style={{ margin: "10px", flexWrap: "wrap" }}>
                                    <Button 
                                        color="primary" 
                                        onClick={ async () => {
                                            await this.setRSelected("car");
                                            this.search();
                                        }} 
                                        active={this.state.type === "car"} 
                                         >
                                            Automobile
                                    </Button>
                                    <Button
                                        color="primary"
                                        onClick={async () => {
                                            await this.setRSelected("scooter");
                                            this.search();
                                        }}
                                        active={this.state.type === "scooter"}
                                         >
                                            Motore
                                    </Button>
                                    <Button
                                        color="primary"
                                        onClick={async () => {
                                            await this.setRSelected("electric scooter");
                                            this.search();
                                        }}
                                        active={this.state.type === "electric scooter"}
                                         >
                                            Monopattino
                                    </Button>
                                    <Button
                                        color="primary"
                                        onClick={async () => {
                                            await this.setRSelected("bicycle");
                                            this.search();
                                        }}
                                        active={this.state.type === "bicycle"}
                                         >
                                            Bicicletta
                                    </Button>
                                </ButtonGroup>
                            </ListGroupItem>
                        
                        {<div>
                            {this.state.listvehicles.map(((item) => (
                                <center>

                                    <CardRimuoviVeicolo id={item.id} type={item.type} category={item.category} refParking={item.refParking} state={item.state} remove={this.remove}/>

                                </center>


                            )))}
                        </div>}
                    </center>
                </div>
            </div>
        );
    }


}


