import React, { Component } from "react";
import DateFnsUtils from '@date-io/date-fns';
import "../../ComponentsCss/Pannel.css";

import {
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
        rSelected: 1,
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
        if (this.state.rSelected === 1) {
            return (
                <div className="row h-100 justify-content-md-center"
                    style={{ margin: "1%", minHeight: "85vh" }}>
                    <div className="col-sm-12 col-md-8 col-lg-6 my-auto">
                        <Jumbotron style={{ backgroundColor: "#27394c", padding: "6vh", paddingTop: "1vh" }}>
                            <center>
                                <ButtonGroup style={{ margin: "10px", flexWrap: "wrap" }}>
                                    <Button color="primary" onClick={() => this.setRSelected(1)} active={this.state.rSelected === 1}>Veicoli nei parcheggi</Button>
                                    <Button color="primary" onClick={() => this.setRSelected(2)} active={this.state.rSelected === 2}>Automobili fuori stallo</Button>
                                    <Button color="primary" onClick={() => this.setRSelected(3)} active={this.state.rSelected === 3}>Automobile con autista</Button>
                                </ButtonGroup>
                            </center>
                            <AvForm onValidSubmit={this.onValidSubmit}>
                            <ListGroup>
                                {/* Filtro Auto/Moto/Bici/Monopattino */}
                                <ListGroupItem >
                                    
                                        <AvGroup check style={{ display: "flex", justifyContent: "center", paddingTop: "20px", marginBottom: "0" }}>
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
                                        </AvGroup>
                                </ListGroupItem>
                                {/* Filtro Partenza/Destinazione*/}
                                <ListGroupItem>
                                    <center>
                                        <FormGroup>
                                            <Label sm={2}>Ritiro</Label>
                                            <Col >
                                                <Input type="select" name="SelectRitiro" id="SelectPartenza" onClick={this.handleChange("parcPartenza")} >
                                                    <option>Parcheggio A</option>
                                                    <option>Parcheggio B</option>
                                                    <option>Parcheggio C</option>
                                                    <option>Parcheggio D</option>
                                                    <option>Parcheggio E</option>
                                                </Input>
                                            </Col>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label sm={2}>Consegna</Label>
                                            <Col >
                                                <Input type="select" name="SelectConsegna" id="SelectDestinazione" onClick={this.handleChange("parcArrivo")}>
                                                    <option>Parcheggio A</option>
                                                    <option>Parcheggio B</option>
                                                    <option>Parcheggio C</option>
                                                    <option>Parcheggio D</option>
                                                    <option>Parcheggio E</option>
                                                </Input>
                                            </Col>
                                        </FormGroup>
                                    </center>
                                </ListGroupItem>
                                {/* Filtro date*/}
                                <ListGroupItem>
                                    <center>
                                        <div className="row ">
                                            <div className="col">
                                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                    <DateTimePicker label="Ritiro" inputVariant="outlined" value={this.state.dataPartenza} selected={this.state.DataPartenza} onChange={this.handleChangeDatePartenza} />
                                                </MuiPickersUtilsProvider>
                                            </div>
                                            <div className="col">
                                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                    <DateTimePicker label="Consegna" inputVariant="outlined" value={this.state.dataArrivo} selected={this.state.DataArrivo} onChange={this.handleChangeDateArrivo} />
                                                </MuiPickersUtilsProvider>
                                            </div>
                                        </div>
                                    </center>
                                </ListGroupItem>
                                {/* Pulsante cerca*/}
                                <ListGroupItem style={{ padding: "20px" }}>
                                    <center>
                                        <Button color="outline-primary" type="submit" style={{ padding: "8px" }} >
                                            CERCA
                                        </Button>
                                    </center>
                                </ListGroupItem>
                            </ListGroup>
                            </AvForm>

                        </Jumbotron>
                    </div>
                </div>
            );
        }
        if (this.state.rSelected === 2) {
            return (
                <div className="row h-100 justify-content-md-center"
                    style={{ margin: "1%", minHeight: "85vh" }}>
                    <div className="col-sm-12 col-md-8 col-lg-6 my-auto">
                        <Jumbotron style={{ backgroundColor: "#323e4a", padding: "6vh", paddingTop: "1vh" }}>
                            <center>
                                <ButtonGroup style={{ margin: "10px", flexWrap: "wrap" }}>
                                    <Button color="primary" onClick={() => this.setRSelected(1)} active={this.state.rSelected === 1}>Veicoli nei parcheggi</Button>
                                    <Button color="primary" onClick={() => this.setRSelected(2)} active={this.state.rSelected === 2}>Automobili fuori stallo</Button>
                                    <Button color="primary" onClick={() => this.setRSelected(3)} active={this.state.rSelected === 3}>Automobile con autista</Button>
                                </ButtonGroup>
                            </center>
                            <AvForm  onValidSubmit={this.onValidSubmit}>
                            <ListGroup>
                                {/*Via di riferimento*/}
                                <ListGroupItem style={{ paddingTop: "30px" }}>
                                   
                                        <AvField
                                            name="ViaRiferimento"
                                            type="text"
                                            label="inserisci una via vicino a te"
                                            placeholder="dove ti trovi?"
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
                                </ListGroupItem>
                                {/*Parcheggio di destinazione*/}
                                <ListGroupItem style={{ paddingBottom: "30px" }}>
                                    <FormGroup>
                                        <Label sm={2}>Consegna</Label>
                                        <Col >
                                            <Input type="select" name="select" id="SelectDestinazione" onClick={this.handleChange("parcArrivo")} >
                                                <option>Parcheggio A</option>
                                                <option>Parcheggio B</option>
                                                <option>Parcheggio C</option>
                                                <option>Parcheggio D</option>
                                                <option>Parcheggio E</option>
                                            </Input>
                                        </Col>
                                    </FormGroup>
                                </ListGroupItem>
                                {/* Filtro date*/}
                                <ListGroupItem>
                                    <center>
                                        <div className="row ">
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
                                    </center>
                                </ListGroupItem>
                                {/* Pulsante cerca*/}
                                <ListGroupItem style={{ padding: "20px" }}>
                                    <center>
                                        <Button color="outline-primary" type="submit"  style={{ padding: "8px" }} >
                                            CERCA
                                        </Button>
                                    </center>
                                </ListGroupItem>
                            </ListGroup>
                            </AvForm>

                        </Jumbotron>
                    </div>
                </div>
            );
        }
        if (this.state.rSelected === 3) {
            return (
                <div className="row h-100 justify-content-md-center"
                    style={{ margin: "1%", minHeight: "85vh" }}>
                    <div className="col-sm-12 col-md-8 col-lg-6 my-auto">
                        <Jumbotron style={{ backgroundColor: "#323e4a", padding: "6vh", paddingTop: "1vh" }}>
                            <center>
                                <ButtonGroup style={{ margin: "10px", flexWrap: "wrap"}}>
                                    <Button color="primary" onClick={() => this.setRSelected(1)} active={this.state.rSelected === 1}>Veicoli nei parcheggi</Button>
                                    <Button color="primary" onClick={() => this.setRSelected(2)} active={this.state.rSelected === 2}>Automobili fuori stallo</Button>
                                    <Button color="primary" onClick={() => this.setRSelected(3)} active={this.state.rSelected === 3}>Automobile con autista</Button>
                                </ButtonGroup>
                            </center>
                            <AvForm onValidSubmit={this.onValidSubmit}>
                                <ListGroup>
                                    {/* Tipologia Veicolo*/}
                                    <ListGroupItem >

                                        <AvGroup check style={{ display: "flex", justifyContent: "center", paddingTop: "20px", marginBottom: "0" }}>
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
                                                <AvRadio label="AutoTipo4" value="tipo4" />
                                            </AvRadioGroup>
                                        </AvGroup>
                                    </ListGroupItem>
                                {/* Luogo di Partenza*/}
                                <ListGroupItem>

                                    <AvField
                                        name="LuogoPartenza"
                                        type="text"
                                        label="Inserisci la via di partenza"
                                        placeholder="dove ti trovi?"
                                        onChange={this.handleChange("viaPartenza")}
                                        errorMessage="Non sembra tu abbia inserito una via"
                                        validate={{
                                            required: {
                                                value: true,
                                                errorMessage: "Il campo è richiesto",
                                            },
                                        }}
                                        required
                                    />
                                </ListGroupItem>
                                {/*Luogo di Arrivo*/}
                                <ListGroupItem>
                                        <AvField
                                            name="LuogoArrivo"
                                            type="text"
                                            label="inserisci la via di destinazione"
                                            placeholder="dove vuoi andare?"
                                            onChange={this.handleChange("viaDestinazione")}
                                            errorMessage="Non sembra tu abbia inserito una via"
                                            validate={{
                                                required: {
                                                    value: true,
                                                    errorMessage: "Il campo è richiesto",
                                                },
                                            }}
                                            required
                                        />
                                    </ListGroupItem>
                                    {/* Filtro date*/}
                                    <ListGroupItem>
                                        <center>
                                            <div className="row ">
                                                <div className="col">
                                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                        <TimePicker label="Ritiro" inputVariant="outlined" value={this.state.dataPartenza} selected={this.state.DataPartenza} onChange={this.handleChangeDataPartenza} />
                                                    </MuiPickersUtilsProvider>
                                                </div>
                                                <div className="col">
                                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                        <TimePicker label="Consegna" inputVariant="outlined" value={this.state.dataArrivo} selected={this.state.DataArrivo} onChange={this.handleChangeDataArrivo} />
                                                    </MuiPickersUtilsProvider>
                                                </div>
                                            </div>
                                        </center>
                                    </ListGroupItem>
                                    {/* Pulsante cerca*/}
                                    <ListGroupItem style={{ padding: "20px" }}>
                                        <center>
                                            <Button type="submit" color="outline-primary" style={{ padding: "8px" }} >
                                                CERCA
                                            </Button>
                                        </center>
                                    </ListGroupItem>
                                </ListGroup>
                            </AvForm>
                        </Jumbotron>
                    </div>
                </div>
            );
        }
    }
}
