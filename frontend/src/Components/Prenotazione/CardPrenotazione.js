/* email Cliente
id veicolo
tipo
data 
ora
parcheggi
driver
 */

import React, { Component } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import "bootstrap/dist/js/bootstrap.min.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import Switch from '@material-ui/core/Switch';
import NavbarCliente from '../NavbarCliente';
import Alert from '@material-ui/lab/Alert';

import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, ListGroupItem, Label, Col, Input, ListGroup, Row, FormGroup, CustomInput, Jumbotron,
} from 'reactstrap';

import {
    AvForm,
    AvGroup,
    AvRadio,
    AvRadioGroup,
    AvField,
} from "availity-reactstrap-validation";

import {
    DatePicker,
    TimePicker,
    DateTimePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';




export default class CardPrenotazione extends Component {
    state = {
        type: this.props.tipo,
        refParkingR: this.props.refParkingR,
        refParkingC: this.props.refParkingC,
        dateR: this.props.dateR,
        dateC: this.props.dateC,
        driver: this.props.driver,
        modifica: false,
        refVehicle: this.props.refVehicle,
        errore: false,

    };

    stampa = (state) => {
        console.log(state);
    };

    setModifica = (bool) => {
        this.setState({ modifica: bool });
    }

    handleChange = (input) => (e) => {
        this.setState({ [input]: e.target.value });
    }

    onValidSubmit = (event) => {
        event.preventDefault();
        console.log(this.state);
    };
    handleChangeDateArrivo = (date) => {
        this.setState({ dateC: date });
    };

    handleChangeDatePartenza = (date) => {
        this.setState({ dateR: date });
    };




    render() {
        return (
            <div className="card mb-3" style={{ maxWidth: " 940px", padding: "10px" }}>

                <div className="row no-gutters">
                    <div className="col-md-12">
                        <div className="card-body">

                            <div className="row no-gutters">
                                <div className="col-md-12">

                                    <center><h5 style={{ marginBottom: "50px" }}>Riepilogo prenotazione</h5></center>
                                    <p ><strong>ID veicolo:  {this.state.refVehicle}</strong></p>
                                    <hr style={{ backgroundColor: "white" }} />
                                </div>


                            </div>
                            <div className="row no-gutters">
                                <div className="col-md-6">
                                    <p><strong>Tipo:</strong> {this.state.type} {this.state.type === "car" ? <> {this.state.category}</> : <></>}</p>
                                    {this.state.refParkingR !== "" &&
                                        <p><strong>Parcheggio ritiro:</strong>   {this.state.refParkingR}</p>
                                    }
                                    {this.state.positionR !== "" &&
                                        <p><strong>Posizione di ritiro:</strong>   {this.state.positionR}</p>
                                    }
                                    <p><strong>Data ritiro:</strong>   {this.state.dateR}</p>
                                </div>
                                <div className="col-md-6">
                                    <p><strong>Autista:</strong> {this.state.autista}</p>       {/* TODO ########### */}
                                    {this.state.refParkingC !== "" &&
                                        <p><strong>Parcheggio consegna:</strong>   {this.state.refParkingC}</p>
                                    }
                                    {this.state.positionC !== "" &&
                                        <p><strong>Posizione di consegna:</strong>   {this.state.positionC}</p>
                                    }
                                    <p><strong>Data consegna:</strong>   {this.state.dateC}</p>
                                </div>
                            </div>
                            
                            <center>
                                <Button type="button" color="outline-success" onClick={() => this.setModifica(true)} style={{ marginRight: "10px", marginTop: "20px" }}  >
                                    Modifica
                                </Button>
                                <Button type="button" color="outline-danger" style={{ marginRight: "10px", marginTop: "20px" }}  >
                                    Elimina
                                </Button>
                            </center>
                        </div>
                    </div>
                </div>
                {this.state.modifica &&
                    <center>
                        <ListGroup>
                            <ListGroupItem>
                                <AvForm onValidSubmit={this.onValidSubmit}>
                                    <Row>
                                        <Col>
                                            <FormGroup>
                                                <Label for="exampleSelect">Tipo veicolo</Label>
                                                <Input type="select" name="select" id="exampleSelect" onClick={this.handleChange("tipologiaMezzo")}>
                                                    <option>Auto</option>
                                                    <option>Moto</option>
                                                    <option>Monopattino</option>
                                                    <option>Bicicletta</option>
                                                </Input>
                                            </FormGroup>
                                        </Col>

                                        <Col>
                                            <Label >Autista</Label>
                                            <AvRadioGroup inline name="autista" required errorMessage="il campo è richiesto" style={{ boxShadow: "none" }} onClick={this.handleChange("autista")}>
                                                <AvRadio label="Si" value="true" />
                                                <AvRadio label="No" value="false" />
                                            </AvRadioGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col >
                                            <Label sm={12}>Partenza</Label>
                                            <Input type="select" name="selectRitiro" id="parcheggioRitiro" onClick={this.handleChange("parcRitiro")} >
                                                <option>Parcheggio A</option>
                                                <option>Parcheggio B</option>
                                                <option>Parcheggio C</option>
                                                <option>Parcheggio D</option>
                                                <option>Parcheggio E</option>
                                            </Input>
                                        </Col>
                                        <Col>
                                            <Label sm={12}>Destinazione</Label>
                                            <Input type="select" name="selectConsegna" id="parcheggioConsegna" onClick={this.handleChange("parcConsegna")} >
                                                <option>Parcheggio A</option>
                                                <option>Parcheggio B</option>
                                                <option>Parcheggio C</option>
                                                <option>Parcheggio D</option>
                                                <option>Parcheggio E</option>
                                            </Input>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <ListGroupItem>
                                                <center>
                                                    <div className="row ">
                                                        <div className="col">
                                                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                                <DateTimePicker label="Ritiro" inputVariant="outlined" value={this.state.dataPartenza} selected={this.state.DataPartenza} onChange={this.handleChangeDatePartenza} />
                                                            </MuiPickersUtilsProvider>
                                                        </div>
                                                    </div>
                                                </center>
                                            </ListGroupItem>
                                        </Col>
                                        <Col>
                                            <ListGroupItem>
                                                <center>
                                                    <div className="row ">
                                                        <div className="col">
                                                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                                <DateTimePicker label="Consegna" inputVariant="outlined" value={this.state.dataConsegna} selected={this.state.DataConsegna} onChange={this.handleChangeDateArrivo} />
                                                            </MuiPickersUtilsProvider>
                                                        </div>
                                                    </div>
                                                </center>
                                            </ListGroupItem>
                                        </Col>
                                    </Row>

                                    {/* Pulsante modifica*/}

                                    <Button type="submit" color="outline-success" onClick={() => this.setModifica(false)} style={{ padding: "8px", margin: "10px" }}  >
                                        Modifica
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




