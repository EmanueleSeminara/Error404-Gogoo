/* email Cliente
id veicolo
tipo
data 
ora
parcheggi
autista
 */

import React, { Component } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import "bootstrap/dist/js/bootstrap.min.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import Switch from '@material-ui/core/Switch';
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
        tipologiaMezzo: this.props.tipo,
        parcRitiro: this.props.parcRitiro,
        parcConsegna: this.props.parcConsegna,
        dataPartenza: this.props.dataPartenza,
        dataArrivo: this.props.dataArrivo,
        autista: this.props.autista,
        modifica: false,
        id: this.props.id,
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
        this.setState({ dataArrivo: date });
    };

    handleChangeDatePartenza = (date) => {
        this.setState({ dataPartenza: date });
    };




    render() {
        return (
            <div className="card mb-3" style={{ maxWidth: " 940px", padding: "10px" }}>

                <div className="row no-gutters">
                    <div className="col-md-12">
                        <div className="card-body">

                            <div className="row no-gutters">
                                <div className="col-md-12">
                                    <h3 >Id veicolo:  {this.props.id}{/* {props.idVeicolo} */}</h3>
                                    <hr style={{ backgroundColor: "white" }} />
                                </div>


                            </div>
                            <div className="row no-gutters">
                                <div className="col-md-6">
                                    <p><strong>Tipo:</strong> {this.props.tipo}</p>
                                    <p><strong>parcheggio ritiro:</strong>   {this.props.parcRitiro}</p>
                                    <p><strong>data ritiro:</strong>   {this.props.dataRitiro}</p>
                                </div>
                                <div className="col-md-6">
                                    <p><strong>Autista:</strong> {this.props.autista}</p>
                                    <p><strong>parcheggio consegna:</strong>   {this.props.parcConsegna}</p>
                                    <p><strong>data consegna:</strong>   {this.props.dataConsegna}</p>
                                </div>
                            </div>
                            <center>
                                <Button type="button" color="outline-success" onClick={() => this.setModifica(true)} style={{ marginRight: "10px", marginTop: "20px" }} size="lg">
                                    Modifica
                                </Button>
                                <Button type="button" color="outline-danger" style={{ marginRight: "10px", marginTop: "20px" }} size="lg">
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

                                    <Button type="submit" color="outline-success" onClick={() => this.setModifica(false)} style={{ padding: "8px", margin: "10px" }} size="lg">
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
