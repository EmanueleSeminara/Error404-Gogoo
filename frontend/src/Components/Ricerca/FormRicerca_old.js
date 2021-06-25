import React, { Component } from "react";
import DateFnsUtils from '@date-io/date-fns';
import "../../ComponentsCss/Pannel.css";
import * as moment from 'moment';


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
import CardPrenotaVeicolo from './CardPrenotaVeicolo';
import Axios from 'axios';


export default class FormRicerca extends Component {
    state = {
        list: [],
        rSelected: "1",
        type: "car",
        refParkingR: "Via Libertà",
        refParkingC: "Via Libertà",
        dateR: moment(new Date()).format('YYYY-MM-DD HH:mm'),
        dateC: moment(new Date()).format('YYYY-MM-DD HH:mm'),
        category: "",
        positionR: "",
        positionC: "",

    };


    handleChange = (input) => (e) => {
        this.setState({ [input]: e.target.value });
    };

    handleChangeDataArrivo = (date) => {
        const d = (moment(date).format('YYYY-MM-DD HH:mm'));
        this.setState({ dateC: d });
    };

    handleChangeDataPartenza = (date) => {
        const d = (moment(date).format('YYYY-MM-DD HH:mm'));
        this.setState({ dateR: d });
    };

    search = () => {
        Axios.post('/api/search/searchvehicles')
            .then((res) => {
                this.setState({ list: res.data });
            }).catch((err) => {
                console.log(err);
            })
    }


    setRSelected = (num) => {
        this.setState({ rSelected: num });
    }

    g = () => {
        const reservation = JSON.parse(localStorage.getItem("reservation"))
        reservation.id = 1
        window.localStorage.setItem("reservation", JSON.stringify(reservation));
    }

    stampa = (state) => {
        console.log(state);
    };

    onValidSubmit = (event) => {
        event.preventDefault();
        this.search();
        const reservation = {
            id: "",
            type: this.state.type,
            refParkingR: this.state.refParkingR,
            refParkingC: this.state.refParkingC,
            dateR: this.state.dateR,
            dateC: this.state.dateC,
            category: this.state.category,
            positionR: this.state.positionR,
            positionC: this.state.positionC,
        };
        window.localStorage.setItem("reservation", JSON.stringify(reservation));
        console.log(JSON.parse(localStorage.getItem("reservation")));
        this.g();
        console.log(JSON.parse(localStorage.getItem("reservation")));
    };

    render() {
        return (
            <div className="row h-100 justify-content-md-center" style={{ margin: "1%", minHeight: "85vh" }}>
                <div className="col-sm-12 col-md-8 col-lg-6 my-auto ">
                    <div style={{ backgroundColor: "#27394c", padding: "1vh", paddingTop: "1vh", borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }}>
                        <center>
                            <ButtonGroup style={{ margin: "10px" }}>
                                <Button
                                    color="primary"
                                    onClick={() => {
                                        this.setRSelected("1");
                                        this.setState({ type: "car" });
                                    }}
                                    active={this.state.rSelected === "1"}
                                >
                                    Veicoli nei parcheggi
                                </Button>
                                <Button
                                    color="primary"
                                    onClick={() => {
                                        this.setRSelected("2");
                                        this.setState({ type: "car" });
                                        this.setState({ refParkingR: "" });
                                    }}
                                    active={this.state.rSelected === "2"}
                                >
                                    Automobili fuori stallo
                                </Button>
                                <Button
                                    color="primary"
                                    onClick={() => {
                                        this.setRSelected("3");
                                        this.setState({ type: "car" });
                                        this.setState({ refParkingR: "" });
                                        this.setState({ refParkingC: "" });
                                    }} active={this.state.rSelected === "3"}
                                >
                                    Automobile con autista
                                </Button>
                            </ButtonGroup>
                        </center>
                    </div>

                    <AvForm onValidSubmit={this.onValidSubmit} >
                        <ListGroup>
                            <ListGroupItem >

                                {(this.state.rSelected === "1") &&
                                    <div>
                                        <div style={{ display: "flex", justifyContent: "center", paddingTop: "20px", paddingBottom: "20px" }}>
                                            <AvRadioGroup
                                                inline
                                                name="TipoVeicolo"
                                                label=""
                                                value="car"
                                                onClick={this.handleChange("informatio[0].type")}
                                            >
                                                <AvRadio label="Auto" value="car" />
                                                <AvRadio label="Moto" value="scooter" />
                                                <AvRadio label="Bici" value="bicycle" />
                                                <AvRadio label="Monopattino" value="electric scooter" />
                                            </AvRadioGroup>
                                        </div>
                                        <div style={{ paddingBottom: "20px" }}>
                                            <AvField type="select" name="select" label="Ritiro" onClick={this.handleChange("refParkingR")}>
                                                <option>Via Libertà</option>
                                                <option>Via Roma</option>
                                                <option>Via Ernesto Basile</option>
                                                <option>Viale Regione</option>
                                                <option>Via Tersicore</option>
                                            </AvField>
                                        </div>
                                    </div>
                                }
                                {(this.state.rSelected === "1" || this.state.rSelected === "2") &&
                                    <div style={{ paddingBottom: "30px" }}>
                                        <AvField type="select" name="select" label="Consegna" onClick={this.handleChange("refParkingC")}>
                                            <option>Via Libertà</option>
                                            <option>Via Roma</option>
                                            <option>Via Ernesto Basile</option>
                                            <option>Viale Regione</option>
                                            <option>Via Tersicore</option>
                                        </AvField>
                                    </div>
                                }
                                {this.state.rSelected === "3" &&
                                    <div>
                                        <div style={{ display: "flex", justifyContent: "center", paddingTop: "20px", marginBottom: "0", paddingBottom: "20px" }}>
                                            <AvRadioGroup
                                                inline
                                                name="TipoAuto"
                                                label=""
                                                value="utilitarie"
                                                onClick={this.handleChange("category")}
                                            >
                                                <AvRadio label="utilitaria" value="utilitaire" />
                                                <AvRadio label="suv" value="suv" />
                                                <AvRadio label="berlina" value="sedan" />
                                            </AvRadioGroup>
                                        </div>
                                        <div style={{ paddingBottom: "20px" }}>
                                            <AvField
                                                name="ViaRiferimento"
                                                type="text"
                                                label="Dove ti trovi?"
                                                placeholder="inserisci la via in cui ti trovi"
                                                onChange={this.handleChange("positionR")}
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
                                        <div style={{ paddingBottom: "30px" }}>
                                            <AvField
                                                name="LuogoArrivo"
                                                type="text"
                                                label="Destinazione"
                                                placeholder="inserisci la via di destinazione"
                                                onChange={this.handleChange("positionC")}
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


                                <center>
                                    <div className="row " style={{ paddingBottom: "30px" }}>
                                        <div className="col">
                                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                <DateTimePicker format={"dd/MM/yyyy hh:mm"} minDateTime={new Date()} label="Ritiro" inputVariant="outlined" value={this.state.dateR} selected={this.state.dateR} onChange={this.handleChangeDataPartenza} />
                                            </MuiPickersUtilsProvider>
                                        </div>
                                        <div className="col">
                                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                <DateTimePicker format={"dd/MM/yyyy hh:mm"} minDateTime={this.state.dateR} label="Consegna" inputVariant="outlined" value={this.state.dateC} selected={this.state.dateC} onChange={this.handleChangeDataArrivo} />
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

                    {<div>

                        {this.state.list.map(((item) => (
                            <CardPrenotaVeicolo id={item.id} type={item.type} category={item.category} positionR={item.positionR} state={item.state} />
                        )))}
                    </div>}
                </div>
            </div>
        );
    }
}

