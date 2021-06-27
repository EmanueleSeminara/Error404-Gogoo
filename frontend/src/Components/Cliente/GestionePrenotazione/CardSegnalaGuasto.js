import React, { Component } from 'react';
import "bootstrap/dist/js/bootstrap.min.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import Alert from '@material-ui/lab/Alert';

import {
    Button, ListGroupItem, Label, Col, Input, ListGroup, FormGroup, 
} from 'reactstrap';

import {
    AvForm,
    AvField,
} from "availity-reactstrap-validation";



export default class CardSegnalaGuasto extends Component {
    state = {
        guasto: false,
        mostra: false,
        viaRiferimento: "",
    };

    setting = () => {
        this.setState({ viaRiferimento: "" })
        this.setState({ mostra: false })
        if (this.props.state === "withdrawn") {
            this.setState({ guasto: true })
        } else {
            this.setState({ guasto: false })
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

    setMostra = (input) => {
        this.setState({ mostra: !this.state[input] });
    }

    handleChange = (input) => (e) => {
        this.setState({ [input]: e.target.value });
    }

    onValidSubmit = (event) => {
        event.preventDefault();
        this.props.segnaleGuasto(this.props.id);
        //MOSTRARE MESSAGGIO DI CORRETTO FUNZIONAMENTO***********************************************************************************************************
    };



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
                                    <p><strong>Autista:</strong> x{this.props.refDriver}</p>       {/* TODO ########### */}
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
                                <Button type="button" color="danger" onClick={() => this.setMostra("mostra")} style={{ marginRight: "10px", marginTop: "20px" }} size="lg" disabled={!this.state.guasto}>
                                    Segnala Guasto
                                </Button>
                            </center>
                        </div>
                    </div>
                </div>
                {(this.state.mostra) &&
                    <center>
                        <ListGroup>
                            <ListGroupItem >
                                <AvForm onValidSubmit={this.onValidSubmit}>
                                    <center>
                                        <div className="row">
                                            <div className="col-12 col-md-12">
                                                <AvField
                                                    name="id"
                                                    type="text"
                                                    label="Via di riferimento"
                                                    placeholder={this.state.viaRiferimento}
                                                    onChange={this.handleChange("viaRiferimento")}
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
                                    <Label for="exampleText">Motivo del guasto (opzionale)</Label>
                                    <FormGroup row>
                                        <Col >
                                            <Input type="textarea" name="text" id="exampleText" />
                                        </Col>
                                    </FormGroup>

                                    {/* Pulsante Conferma*/}

                                    <Button type="submit" color="primary" style={{ padding: "8px", margin: "10px" }} size="lg">
                                        Conferma
                                    </Button>
                                    <Button type="submit" color="error" onClick={() => this.setMostra("mostra")}style={{ padding: "8px", margin: "10px" }} size="lg">
                                        Annulla
                                    </Button>
                                </AvForm>
                            </ListGroupItem>
                        </ListGroup>
                        {this.state.errore && <Alert severity="error">This is an error alert — check it out!</Alert>}
                    </center>}
            </div>
        );
    }

}
