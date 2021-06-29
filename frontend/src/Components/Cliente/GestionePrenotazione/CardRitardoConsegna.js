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
    Button, ListGroupItem, Label, Col, Input, ListGroup,  FormGroup, 
} from 'reactstrap';

import {
    AvForm,
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
        mostra: false,
        disabled: true,
        viaRiferimento: "",

    };

    stampa = (state) => {
        console.log(state);
    };

    setRitiro = (bool) => {
        this.setState({ ritiro: bool });
    }

    setMostra = (bool) => {
        this.setState({ mostra: bool });
        this.setState({ disabled: true });
    }

    setConsegna = (bool) => {
        this.setState({ consegna: bool });
    }

    handleChange = (input) => (e) => {
        this.setState({ [input]: e.target.value });
    }

    onValidSubmit = (event) => {
        event.preventDefault();
        this.setState({ mostra: false });

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
                                <Button type="button" className="buttonRed" onClick={() => this.setMostra(true)} style={{ marginRight: "10px", marginTop: "20px" }} size="lg" disabled={this.state.ritiro}>
                                    Ritardo consegna
                                </Button>
                            </center>
                        </div>
                    </div>
                </div>
                {(this.state.mostra) &&
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

                                    <FormGroup row style={{marginTop: "10px"}}>

                                        <Col >
                                            <Label for="exampleText" style={{marginTop: "20px" }} >Motivo del ritardo (opzionale)</Label>
                                            <Input type="textarea" name="text" id="exampleText" />
                                        </Col>
                                    </FormGroup>

                                    {/* Pulsante Conferma*/}

                                    <Button type="submit" className="buttonModify" style={{ padding: "8px", margin: "10px" }} >
                                        Conferma
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
