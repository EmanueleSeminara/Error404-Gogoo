import React, { Component } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import "bootstrap/dist/js/bootstrap.min.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import Alert from '@material-ui/lab/Alert';
import * as moment from 'moment';



import {
    Button, ListGroupItem, Label, Col, Input, ListGroup, FormGroup,
} from 'reactstrap';

import {
    AvForm,
    AvGroup,
    AvField,
} from "availity-reactstrap-validation";

import {
    DateTimePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';



export default class CardSegnalaGuasto extends Component {
    state = {
        mostraRitardo: false,
        mostraCambiaLuogo: false,
        disabled: true,
        refParkingC: "",
        viaRiferimento: "",
        dateC: new Date(),
        success: false,
        errorTime: false

    };

    setting = () => {
        this.setState({ mostraRitardo: false });
        this.setState({ mostraCambiaLuogo: false });
        this.setState({ refParkingC: this.props.refParkingC });
        this.setState({ dateC: this.props.dateC });
    }

    componentDidMount() {
        this.setting();
    }

    componentDidUpdate(propsPrecedenti) {
        if (this.props !== propsPrecedenti) {
            this.setting();
        }
    }

    setMostraRitardo = () => {
        this.setState({ mostraRitardo: true });
        this.setState({ mostraCambiaLuogo: false });
    }
    setMostraCambiaLuogo = () => {
        this.setState({ mostraRitardo: false });
        this.setState({ mostraCambiaLuogo: true });
    }

    handleChange = (input) => (e) => {
        this.setState({ [input]: e.target.value });
    }

    /* onValidSubmit = (event) => {
        event.preventDefault();
        this.setState({ disabled: true });
        this.setState({ mostra: false });
        this.setState({ success: true});
        
    }; */

    timeChange = (event) => {
        event.preventDefault();
        console.log("sono dentri")
        if (moment(this.state.dateC) > moment(new Date())) {
            this.props.changeTime(this.props.id, this.state.dateC)
        } else {
            this.setState({ errorTime: true })
        }
    }

    destinationChange = (event) => {
        event.preventDefault();
        this.props.changeDestination(this.props.id, this.state.refParkingC);
    }

    handleChangeDataArrivo = (date) => {
        const d = (moment(date).format('YYYY-MM-DD HH:mm'));
        this.setState({ dateC: d });
    };





    render() {
        return (
            <div>
                <div className="card card-css">
                    <center>
                        <div className="row no-gutters">
                            <div className="col">
                                <div className="card-body">

                                    <div className="row no-gutters">
                                        <div className="col-md-12">
                                            <h3 className="infoCard">Id veicolo:  {this.props.refVehicle}</h3>
                                            <hr style={{ backgroundColor: "white" }} />
                                        </div>


                                    </div>
                                    <div className="row no-gutters">
                                        <div className="col-md-6">
                                            <p className="infoCard"><strong>Tipo:</strong> {this.props.type}</p>
                                            {this.props.refParkingR != null &&
                                                <p className="infoCard"><strong>Parcheggio ritiro:</strong>   {this.props.refParkingR}</p>
                                            }
                                            {this.props.positionR != null &&
                                                <p className="infoCard"><strong>Posizione di ritiro:</strong>   {this.props.positionR}</p>
                                            }
                                            <p className="infoCard"><strong>data ritiro:</strong>   {this.props.dateR}</p>
                                        </div>
                                        <div className="col-md-6">
                                            <p className="infoCard"></p>
                                            <p className="infoCard"><strong>parcheggio consegna:</strong>   {this.state.refParkingC}</p>
                                            <p className="infoCard"><strong>data consegna:</strong>   {this.props.dateC}</p>
                                        </div>
                                    </div>
                                    <center>

                                        <Button type="button" className="buttonRed" onClick={() => this.setMostraRitardo()} style={{ marginRight: "10px", marginTop: "20px" }} disabled={this.state.ritiro}>
                                            Ritardo consegna
                                        </Button>
                                        <Button type="button" className="buttonVerde" onClick={() => this.setMostraCambiaLuogo()} style={{ marginRight: "10px", marginTop: "20px" }} disabled={this.state.ritiro}>
                                            Cambia luogo consegna
                                        </Button>
                                        {this.state.success && <Alert style={{ marginTop: "20px" }} severity="success">Segnalazione avvenuta con successo!</Alert>} {/* mettere delay */}

                                    </center>
                                </div>
                            </div>
                        </div>
                        {(this.state.mostraRitardo) &&
                            <center>
                                <AvForm onValidSubmit={this.timeChange}>
                                    <Col>

                                        <center>
                                            <Label for="exampleText" >Ora della consegna</Label>
                                            <div className="row " style={{ marginTop: "10px", marginBotton: "20px" }}>

                                                <div className="col">

                                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                        <DateTimePicker format={"dd/MM/yyyy HH:mm"} minDate={this.state.dateC} maxDate={moment(this.state.dateC)} inputVariant="outlined" value={this.state.dateC} selected={this.state.dateC} onChange={this.handleChangeDataArrivo} />
                                                    </MuiPickersUtilsProvider>
                                                </div>
                                            </div>
                                            {this.state.errorTime &&
                                                <h6 style={{ color: "#ef462c" }}>Non puoi andare indietro nel tempo </h6>
                                            }
                                        </center>

                                    </Col >

                                    <FormGroup row style={{ marginTop: "10px" }}>

                                        <Col >
                                            <Label for="exampleText" style={{ marginTop: "20px" }} >Motivo del ritardo (opzionale)</Label>
                                            <Input type="textarea" name="text" id="exampleText" />
                                        </Col>
                                    </FormGroup>

                                    {/* Pulsante Conferma*/}

                                    <Button type="submit" className="buttonModify" style={{ padding: "8px", margin: "10px" }} >
                                        Conferma
                                    </Button>
                                    <Button className="buttonModify" onClick={() => this.setting()} style={{ padding: "8px", margin: "10px" }} >
                                        Annulla
                                    </Button>
                                </AvForm>

                                {this.state.errore && <Alert severity="error">This is an error alert — check it out!</Alert>}
                            </center>}
                        {(this.state.mostraCambiaLuogo) &&
                            <center>
                                <AvForm onValidSubmit={this.destinationChange}>
                                    <Col>

                                        <center>

                                            <div className="row " style={{ marginTop: "10px", marginBotton: "20px" }}>

                                                <div className="col">

                                                    <AvField type="select" name="parcheggioArrivo" label="Consegna" onClick={this.handleChange("refParkingC")}>
                                                        <option>Via Libertà</option>
                                                        <option>Via Roma</option>
                                                        <option>Via Ernesto Basile</option>
                                                        <option>Viale Regione</option>
                                                        <option>Via Tersicore</option>
                                                    </AvField>
                                                </div>
                                            </div>
                                        </center>

                                    </Col >

                                    <FormGroup row style={{ marginTop: "10px" }}>

                                        <Col >
                                            <Label for="exampleText" style={{ marginTop: "20px" }} >Motivo del ritardo (opzionale)</Label>
                                            <Input type="textarea" name="text" id="exampleText" />
                                        </Col>
                                    </FormGroup>

                                    {/* Pulsante Conferma*/}

                                    <Button type="submit" className="buttonModify" style={{ padding: "8px", margin: "10px" }} >
                                        Conferma
                                    </Button>
                                    <Button className="buttonModify" onClick={() => this.setting()} style={{ padding: "8px", margin: "10px" }} >
                                        Annulla
                                    </Button>
                                </AvForm>

                                {this.state.errore && <Alert severity="error">This is an error alert — check it out!</Alert>}
                            </center>}
                    </center>
                </div>
            </div>
        );
    }

}
