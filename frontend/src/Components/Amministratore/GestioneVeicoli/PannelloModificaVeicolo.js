import React, { Component } from "react";
import { AvForm } from "availity-reactstrap-validation";
import { Button, ListGroup, ListGroupItem, Card, Jumbotron, Table, ButtonGroup } from "reactstrap";

import CardModificaVeicolo from "./CardModificaVeicolo";
import faker from 'faker';
import Axios from 'axios';
import { Alert, AlertTitle } from '@material-ui/lab';




export default class PannelloModificaVeicolo extends Component {
    state = {
        listvehicles: [],
        type: "car",
    };

    componentDidMount() {
        if (localStorage.getItem("utente") === null) {
            window.location.href = '/'
        } else {
            let c = JSON.parse(localStorage.getItem("utente"));
            if (c.role === "driver") {
                window.location.href = "/pannelloAutista";
            } else if (c.role === "guest") {
                window.location.href = "/ricerca";
            } else if (c.role === "valet") {
                window.location.href = "/pannelloParcheggiatore";
            } else {
                Axios.get('/api/vehicle/listvehicle/car')
                    .then((res) => {
                        this.setState({ listvehicles: res.data });
                    }).catch((err) => {
                        window.location.href = '/errorServer';
                    });
            }
        }
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
            <div className="ez sfondo" style={{ height: "100%" }}>           
                <div className="row h-100 justify-content-md-center boxpannel">
                    <div className="d-flex flex-column pannell-amministratore ">
                        <div className="title">Modifica veicolo</div>
                        <ButtonGroup style={{ margin: "10px", flexWrap: "wrap" }}>
                            <Button
                                className="buttonCyanoGruoup"
                                onClick={async () => {
                                    await this.setRSelected("car");
                                    this.search();
                                }}
                                active={this.state.type === "car"}
                            >
                                Automobile
                            </Button>
                            <Button
                                className="buttonCyanoGruoup "
                                onClick={async () => {
                                    await this.setRSelected("scooter");
                                    this.search();
                                }}
                                active={this.state.type === "scooter"}
                            >
                                Motore
                            </Button>
                            <Button
                                className="buttonCyanoGruoup "
                                onClick={async () => {
                                    await this.setRSelected("electric scooter");
                                    this.search();
                                }}
                                active={this.state.type === "electric scooter"}
                            >
                                Monopattino
                            </Button>
                            <Button
                                className="buttonCyanoGruoup "
                                onClick={async () => {
                                    await this.setRSelected("bicycle");
                                    this.search();
                                }}
                                active={this.state.type === "bicycle"}
                            >
                                Bicicletta
                            </Button>
                        </ButtonGroup>
                        {this.state.listvehicles.length == 0 && <Alert severity="error">Non ci sono veicoli</Alert>}          
                            <div className="d-flex flex-row flex-wrap justify-content-center">

                                {this.state.listvehicles.map(((item) => (

                                    <div className="p-3 col-12">
                                        <CardModificaVeicolo id={item.id} type={this.state.type} category={item.category} refParking={item.refParking} state={item.state} />
                                    </div>
                                )))}
                            </div>
                    
                    </div>
                </div>
            </div>
        );
    }


}

