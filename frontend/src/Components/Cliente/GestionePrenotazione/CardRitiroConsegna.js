import React, { Component } from 'react';
import "bootstrap/dist/js/bootstrap.min.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import Alert from '@material-ui/lab/Alert';

import {
    Button, ListGroupItem, ListGroup,
} from 'reactstrap';

import {
    AvForm,
    AvField,
} from "availity-reactstrap-validation";
import * as moment from 'moment';
import axios from 'axios';



export default class CardPrenotazioneRitiroConsegna extends Component {
    state = {
        ritiro: false,
        consegna: false,
        errore: false,
        mostra: false,
        disabled: true,

    };

    setting = () => {
        if (this.props.state === "withdrawn") {
            this.setState({ ritiro: false })
            this.setState({ consegna: true })
        } else {
            let dateNow = moment(new Date())
            let dateR = moment(this.props.dateR)
            console.log(dateNow + " " + dateR)
            if (dateNow > dateR) {
                console.log("sono dentro")
                this.setState({ ritiro: true })
                this.setState({ consegna: false })
            }
        }
    }

    componentDidMount() {
        this.setting();
    }

    componentDidUpdate(propsPrecedenti) {
        if (this.props !== propsPrecedenti) {
            this.setting();
        }
    }

    ritira = () => {
        // cambiare lo stato della prenotazione
        //Axios.put('')

        this.setState({ ritiro: false })
        this.setState({ consegna: true })
    }








    render() {
        return (
            <div className="card mb-3" style={{ maxWidth: " 940px", padding: "10px" }}>

                <div className="row no-gutters">
                    <div className="col-md-12">
                        <div className="card-body">

                            <div className="row no-gutters">
                                <div className="col-md-12">
                                    <p ><strong>ID veicolo:  {this.props.refVehicle}</strong></p>
                                    <hr style={{ backgroundColor: "white" }} />
                                </div>


                            </div>
                            <div className="row no-gutters">
                                <div className="col-md-6">
                                    <p><strong>Tipo:</strong> {this.props.type} {this.props.type === "car" ? <> {this.props.category}</> : <></>}</p>
                                    {this.props.refParkingR != null &&
                                        <p><strong>Parcheggio ritiro:</strong>   {this.props.refParkingR}</p>
                                    }
                                    {this.props.positionR != null &&
                                        <p><strong>Posizione di ritiro:</strong>   {this.props.positionR}</p>
                                    }
                                    <p><strong>Data ritiro:</strong>   {this.props.dateR}</p>
                                </div>
                                <div className="col-md-6">
                                    <p><strong>Autista:</strong> {this.props.refDriver}</p>       {/* TODO ########### */}
                                    {this.props.refParkingC != null &&
                                        <p><strong>Parcheggio consegna:</strong>   {this.props.refParkingC}</p>
                                    }
                                    {this.props.positionC != null &&
                                        <p><strong>Posizione di consegna:</strong>   {this.props.positionC}</p>
                                    }
                                    <p><strong>Data consegna:</strong>   {this.props.dateC}</p>
                                </div>
                            </div>


                            <center>
                                <Button type="button" color="primary" onClick={() => this.ritira()} style={{ marginRight: "10px", marginTop: "20px" }} size="lg" disabled={!this.state.ritiro}>
                                    Ritiro
                                </Button>
                                <Button type="button" color="success" onClick={() => this.props.remove(this.props.id)} style={{ marginRight: "10px", marginTop: "20px" }} size="lg" disabled={!this.state.consegna}>
                                    Consegna
                                </Button>
                            </center>
                        </div>
                    </div>
                </div>
                {/*
                {(this.state.mostra) &&
                    <center>
                        <ListGroup>
                            <ListGroupItem style={{display: "flex", justifyContent: "center", /* alignItems: "center"}}>
                                <AvForm onValidSubmit={this.onValidSubmit}>
                                    <center>
                                        <div className="row">
                                            <div className="col-12 col-md-12">
                                                <AvField
                                                    name="id"
                                                    type="text"
                                                    label="ID veicolo"
                                                    placeholder={this.state.nome}
                                                    onChange={this.handleChange("id")}
                                                    style={{ label: { color: "white" } }}
                                                    validate={{
                                                        required: {
                                                            value: true,
                                                            errorMessage: "Il campo è richiesto.",
                                                        },
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </center>

                                    

                                    <Button type="submit" color="primary" style={{ padding: "8px", margin: "10px" }} size="lg">
                                        Conferma
                                    </Button>
                                </AvForm>
                            </ListGroupItem>
                        </ListGroup>
                        {this.state.errore && <Alert severity="error">This is an error alert — check it out!</Alert>}
                    </center>}
                     */}

            </div>
        );
    }

}
