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
import Alert from '@material-ui/lab/Alert';



import {
    Button, ListGroupItem, Label, Col, Input, ListGroup, FormGroup,
} from 'reactstrap';

import {
    AvForm,
    AvGroup,
    AvField,
} from "availity-reactstrap-validation";

import {
    TimePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';




export default class CardSegnalaGuasto extends Component {
    state = {
        ritiro: false,
        consegna: false,
        id: this.props.id,
        errore: false,
        mostraRitardo: false,
        mostraCambiaLuogo: false,
        disabled: true,
        viaRiferimento: "",
        success: false,

    };

    stampa = (state) => {
        console.log(state);
    };

    setRitiro = (bool) => {
        this.setState({ ritiro: bool });
    }

    setMostraRitardo = () => {
        this.setState({ mostraRitardo: true });
        this.setState({ mostraCambiaLuogo: false });
    }
    setMostraCambiaLuogo = () => {
        this.setState({ mostraRitardo: false });
        this.setState({ mostraCambiaLuogo: true });
    }

    annulla = () => {
        this.setState({ mostraRitardo: false });
        this.setState({ mostraCambiaLuogo: false });
    }


    setConsegna = (bool) => {
        this.setState({ consegna: bool });
    }

    handleChange = (input) => (e) => {
        this.setState({ [input]: e.target.value });
    }

    onValidSubmit = (event) => {
        event.preventDefault();
        this.setState({ disabled: true });
        this.setState({ mostra: false });
        this.setState({ success: true});

    };

    handleChangeDateArrivo = (date) => {
        this.setState({ dataArrivo: date });
    };

    handleChangeDatePartenza = (date) => {
        this.setState({ dataPartenza: date });
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
                                            <h3 className="infoCard">Id veicolo:  {this.props.id}{/* {props.idVeicolo} */}</h3>
                                            <hr style={{ backgroundColor: "white" }} />
                                        </div>


                                    </div>
                                    <div className="row no-gutters">
                                        <div className="col-md-6">
                                            <p className="infoCard"><strong>Tipo:</strong> {this.props.tipo}</p>
                                            <p className="infoCard"><strong>parcheggio ritiro:</strong>   {this.props.parcRitiro}</p>
                                            <p className="infoCard"><strong>data ritiro:</strong>   {this.props.dataRitiro}</p>
                                        </div>
                                        <div className="col-md-6">
                                            <p className="infoCard"><strong>Autista:</strong> {this.props.autista}</p>
                                            <p className="infoCard"><strong>parcheggio consegna:</strong>   {this.props.parcConsegna}</p>
                                            <p className="infoCard"><strong>data consegna:</strong>   {this.props.dataConsegna}</p>
                                        </div>
                                    </div>
                                    <center>
                                        
                                            <Button type="button" className="buttonRed" onClick={() => this.setMostraRitardo()} style={{ marginRight: "10px", marginTop: "20px" }} disabled={this.state.ritiro}>
                                                Ritardo consegna
                                            </Button>
                                            <Button type="button" className="buttonVerde" onClick={() => this.setMostraCambiaLuogo()} style={{ marginRight: "10px", marginTop: "20px" }} disabled={this.state.ritiro}>
                                                Cambia luogo consegna
                                            </Button>
                                            {this.state.success && <Alert style={{marginTop: "20px" }} severity="success">Segnalazione avvenuta con successo!</Alert>} {/* mettere delay */}
                                    
                                    </center>
                                </div>
                            </div>
                        </div>
                        {(this.state.mostraRitardo) &&
                            <center>
                                <AvForm onValidSubmit={this.onValidSubmit}>
                                    <Col>

                                        <center>
                                            <Label for="exampleText" >Ora della consegna</Label>
                                            <div className="row " style={{ marginTop: "10px", marginBotton: "20px" }}>

                                                <div className="col">

                                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                        <TimePicker inputVariant="outlined" value={this.state.dataPartenza} selected={this.state.DataPartenza} onChange={this.handleChangeDatePartenza} />
                                                    </MuiPickersUtilsProvider>
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
                                    <Button className="buttonModify" onClick={() => this.annulla()} style={{ padding: "8px", margin: "10px" }} >
                                        Annulla
                                    </Button>
                                </AvForm>
                                
                                {this.state.errore && <Alert severity="error">This is an error alert — check it out!</Alert>}
                            </center>}
                        {(this.state.mostraCambiaLuogo) &&
                            <center>
                                <AvForm onValidSubmit={this.onValidSubmit}>
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
                                    <Button className="buttonModify" onClick={() => this.annulla()} style={{ padding: "8px", margin: "10px" }} >
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
