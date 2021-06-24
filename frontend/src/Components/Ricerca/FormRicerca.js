import React, { Component } from "react";
import DateFnsUtils from '@date-io/date-fns';
import "../ComponentsCss/Pannel.css";

import {
    DatePicker,
    TimePicker,
    DateTimePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';


import {
    ListGroup,
    ListGroupItem,
    Button,
    Input,
    Jumbotron,
    FormGroup,
    Label,
    Col,
    Form,
    ButtonGroup,
} from "reactstrap";

import {
    AvForm,
    AvGroup,
    AvField,
    AvRadio,
    AvRadioGroup,
} from "availity-reactstrap-validation";


export default class FormRicerca extends Component {
    state = {
        tipologiaMezzo: "Auto",
        parcPartenza: "Parcheggio A",
        parcArrivo: "Parcheggio A",
        dataPartenza: new Date(),
        dataArrivo: new Date(),
        rSelected: "1",
        viaRiferimento: "",
        tipologiaAuto: "tipo1",
        viaPartenza: "",
        viaDestinazione: "",

    };


    handleChange = (input) => (e) => {
        this.setState({ [input]: e.target.value });
    };




    handleChangeDateArrivo = (date) => {
        this.setState({ dataArrivo: date });
    };

    handleChangeDatePartenza = (date) => {
        this.setState({ dataPartenza: date });
    };


    setRSelected = (num) => {
        this.setState({ rSelected: num });
    }



    stampa = (state) => {
        /*  console.log(state); */
        console.log(state);
    };

    onValidSubmit = (event) => {
        event.preventDefault();
        console.log(this.state);
    };

    render() {
        return (
            <div className="row h-100 justify-content-md-center" style={{ margin: "1%", minHeight: "85vh" }}>
                <div className="col-sm-12 col-md-8 col-lg-6 my-auto ">
                    <div style={{ backgroundColor: "#27394c", padding: "1vh", paddingTop: "1vh", borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }}>
                        <center>
                            <ButtonGroup style={{ margin: "10px" }}>
                                <Button color="primary" onClick={() => this.setRSelected(1)} active={this.state.rSelected === 1}>Veicoli nei parcheggi</Button>
                                <Button color="primary" onClick={() => this.setRSelected(2)} active={this.state.rSelected === 2}>Automobili fuori stallo</Button>
                                <Button color="primary" onClick={() => this.setRSelected(3)} active={this.state.rSelected === 3}>Automobile con autista</Button>
                            </ButtonGroup>
                        </center>
                    </div>

                    <AvForm onValidSubmit={this.onValidSubmit} >
                        <ListGroup>
                            <ListGroupItem >

                                {(this.state.rSelected == "1") &&
                                    <div>
                                        <div style={{ display: "flex", justifyContent: "center", paddingTop: "20px", paddingBottom: "20px" }}>
                                            <AvRadioGroup
                                                inline
                                                name="TipoVeicolo"
                                                label=""
                                                value="Auto"
                                                onClick={this.handleChange("tipologiaMezzo")}


                                            >
                                                <AvRadio label="Auto" value="Auto" />
                                                <AvRadio label="Moto" value="Moto" />
                                                <AvRadio label="Bici" value="Bici" />
                                                <AvRadio label="Monopattino" value="Monopattino" />
                                            </AvRadioGroup>
                                        </div>
                                        <div style={{ paddingBottom: "20px" }}>
                                            <AvField type="select" name="select" label="Ritiro" onClick={this.handleChange("parcPartenza")}>
                                                <option>Parcheggio A</option>
                                                <option>Parcheggio B</option>
                                                <option>Parcheggio C</option>
                                                <option>Parcheggio D</option>
                                                <option>Parcheggio E</option>
                                            </AvField>
                                        </div>
                                    </div>
                                }
                                {(this.state.rSelected == "2" || this.state.rSelected == "3") &&
                                    <div>
                                        <div style={{ display: "flex", justifyContent: "center", paddingTop: "20px", marginBottom: "0", paddingBottom: "20px" }}>
                                            <AvRadioGroup
                                                inline
                                                name="TipoAuto"
                                                label=""
                                                value="tipo1"
                                                onClick={this.handleChange("tipologiaAuto")}
                                            >
                                                <AvRadio label="AutoTipo1" value="tipo1" />
                                                <AvRadio label="AutoTipo2" value="tipo2" />
                                                <AvRadio label="AutoTipo3" value="tipo3" />
                                            </AvRadioGroup>
                                        </div>
                                        <div style={{ paddingBottom: "20px" }}>
                                            <AvField
                                                name="ViaRiferimento"
                                                type="text"
                                                label="Dove ti trovi?"
                                                placeholder="inserisci la via in cui ti trovi"
                                                onChange={this.handleChange("viaRiferimento")}
                                                errorMessage="Non sembra tu abbia inserito una via"
                                                validate={{
                                                    required: {
                                                        value: true,
                                                        errorMessage: "Il campo è richiesto",
                                                    },
                                                }}
                                                required
                                            />
                                        </div>
                                    </div>
                                }
                                {(this.state.rSelected == "1" || this.state.rSelected == "2") &&
                                    <div style={{ paddingBottom: "30px" }}>
                                        <AvField type="select" name="select" label="Consegna" onClick={this.handleChange("parcArrivo")}>
                                            <option>Parcheggio A</option>
                                            <option>Parcheggio B</option>
                                            <option>Parcheggio C</option>
                                            <option>Parcheggio D</option>
                                            <option>Parcheggio E</option>
                                        </AvField>
                                    </div>
                                }
                                {(this.state.rSelected == "3") &&
                                    <div style={{ paddingBottom: "30px" }}>
                                        <AvField
                                            name="LuogoArrivo"
                                            type="text"
                                            label="Destinazione"
                                            placeholder="inserisci la via di destinazione"
                                            onChange={this.handleChange("viaRiferimento")}
                                            errorMessage="Non sembra tu abbia inserito una via"
                                            validate={{
                                                required: {
                                                    value: true,
                                                    errorMessage: "Il campo è richiesto",
                                                },
                                            }}
                                            required
                                        />
                                    </div>
                                }


                                <center>
                                    <div className="row " style={{ paddingBottom: "30px" }}>
                                        <div className="col">
                                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                <TimePicker label="Ritiro" inputVariant="outlined" value={this.state.dataPartenza} selected={this.state.dataPartenza} onChange={this.handleChangeDataPartenza} />
                                            </MuiPickersUtilsProvider>
                                        </div>
                                        <div className="col">
                                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                <TimePicker label="Consegna" inputVariant="outlined" value={this.state.dataArrivo} selected={this.state.dataArrivo} onChange={this.handleChangeDataArrivo} />
                                            </MuiPickersUtilsProvider>
                                        </div>
                                    </div>

                                    <div style={{ paddingBottom: "30px" }}>
                                        <Button color="primary" type="submit" size="lg"  >
                                            CERCA
                                        </Button>
                                    </div>

                                </center>
                            </ListGroupItem>
                        </ListGroup>
                    </AvForm>

                </div>
            </div>
        );
    }

}

