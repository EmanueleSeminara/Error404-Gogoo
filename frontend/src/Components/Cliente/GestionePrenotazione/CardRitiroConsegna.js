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
import Axios from 'axios';



export default class CardPrenotazioneRitiroConsegna extends Component {
    state = {
        ritiro: false,
        consegna: false,
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
        const data = {
            id: this.props.id,
            refVehicle: this.props.refVehicle,
            dateC: this.props.dateC
        }
        Axios.put('/api/guest/retirevehicle', data)
        .then((res) => {
            this.setState({ ritiro: false })
            this.setState({ consegna: true })
        }).catch((err) => {
            console.log(err)
            if (err.response.status === 422) {
				this.setState({ string: "errore nell'inserimento dei dati" });
				this.setState({ error: true });
			} else if (err.response.status === 503) {
				this.setState({ string: "impossibile cambiare password al momento, riprova più tardi" });
				this.setState({ error: true });
			} else {
				window.location.href = "/serverError"
			}
        })

    }



    render() {
        return (
            <div>
             <div className="card card-css">

                <div className="row no-gutters">
                    <div className="col">
                        <div className="card-body">

                            <div className="row no-gutters">
                                <div className="col-md-12">
                                    <p className="infoCard"><strong>ID veicolo:  {this.props.refVehicle}</strong></p>
                                    <hr style={{ backgroundColor: "white" }} />
                                </div>


                            </div>
                            <div className="row no-gutters">
                                <div className="col-md-6">
                                    <p className="infoCard"><strong>Tipo:</strong> {this.props.type} {this.props.type === "car" ? <> {this.props.category}</> : <></>}</p>
                                    {this.props.refParkingR != null &&
                                        <p className="infoCard"><strong>Parcheggio ritiro:</strong>   {this.props.refParkingR}</p>
                                    }
                                    {this.props.positionR != null &&
                                        <p className="infoCard"><strong>Posizione di ritiro:</strong>   {this.props.positionR}</p>
                                    }
                                    <p className="infoCard"><strong>Data ritiro:</strong>   {this.props.dateR}</p>
                                </div>
                                <div className="col-md-6">
                                    <p className="infoCard"><strong>Autista:</strong> {this.props.refDriver}</p>       {/* TODO ########### */}
                                    {this.props.refParkingC != null &&
                                        <p className="infoCard"><strong>Parcheggio consegna:</strong>   {this.props.refParkingC}</p>
                                    }
                                    {this.props.positionC != null &&
                                        <p className="infoCard"><strong>Posizione di consegna:</strong>   {this.props.positionC}</p>
                                    }
                                    <p className="infoCard"><strong>Data consegna:</strong>   {this.props.dateC}</p>
                                </div>
                            </div>


                            <center>
                                <Button type="button" className="buttonRitiro" onClick={() => this.ritira()} style={{ marginRight: "10px", marginTop: "20px" }} disabled={!this.state.ritiro}>
                                    Ritiro
                                </Button>
                                <Button type="button" className="buttonConsegna" onClick={() => this.props.remove(this.props.id)} style={{ marginRight: "10px", marginTop: "20px" }}  disabled={!this.state.consegna}>
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
            </div>
        );
    }

}
