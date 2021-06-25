import React, { Component } from "react";
import { AvForm } from "availity-reactstrap-validation";
import { Button, ListGroup, ListGroupItem, Card, Jumbotron, Table, ButtonGroup } from "reactstrap";

import CardModificaVeicolo from "./CardModificaVeicolo";
import faker from 'faker';
import Axios from 'axios';



export default class PannelloModificaVeicolo extends Component {
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


    render() {
        return (


            <div className="row h-100 justify-content-md-center"
                style={{ margin: "1%", minHeight: "85vh", alignItems: "start"}}>
                <div className="col-sm-12 col-md-8 col-lg-6 my-auto">
                    <center>
                        <div >
                            <ListGroupItem style={{ backgroundColor: "#2e1534", padding: "10px", borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }}>
                                <ButtonGroup style={{ margin: "10px", flexWrap: "wrap" }}>
                                    <Button
                                        color="primary"
                                        onClick={async () => {
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
                        </div>


                        {<div>
                            
                            {this.state.listvehicles.map(((item) => (
                                <CardModificaVeicolo id={item.id} type={this.state.type} category={item.category} refParking={item.refParking} state={item.state} />
                            )))}
                        </div>}



                    </center>
                </div>
            </div>
        );
    }


}

