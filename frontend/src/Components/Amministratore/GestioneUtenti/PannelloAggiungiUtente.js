import React, { Component } from "react";
import DateFnsUtils from '@date-io/date-fns';
import "../../../ComponentsCss/Pannel.css";

import {
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
    AvRadio,
    AvRadioGroup,
    AvField,
} from "availity-reactstrap-validation";

import { Alert, AlertTitle } from '@material-ui/lab';
import Axios from 'axios'


export default class PannelloAggiugiUtente extends Component {

    state = {
        name: "",
        surname: "",
        email: "",
        birthdate: "",
        password: "",
        phone: "",
        role: "guest",
        error: false,
        success: false,
        string: ""
    };


    setRSelected = (type) => {
        this.setState({ role: type });
    }


    handleChange = (input) => (e) => {
        this.setState({ [input]: e.target.value });
    };

    register = () => {
        console.log(this.state)
        Axios.post('/api/admin/createuser', this.state)
            .then((res) => {
                this.setState({ error: false });
                this.setState({ success: true });
            }).catch((err) => {
                this.setState({ success: false });
                if (err.response.status === 513) {
                    this.setState({ string: "email già associata ad un account" });
                    this.setState({ error: true });
                } else if (err.response.status === 422) {
                    this.setState({ string: "errore nell'inserimento dei dati" });
                    this.setState({ error: true });
                } else if (err.response.status === 503) {
                    console.log("inpossibile regitrarsi al momento")
                    this.setState({ string: "impossibile regitrarsi al momento, riprova più tardi" });
                    this.setState({ error: true });
                } else {
                    window.location.href = "/serverError"
                }
            });
    }

    onValidSubmit = (event) => {
        event.preventDefault();
        this.register();
    };

    isStrongPassword(value, ctx, input, cb) {

        if (!value || value === '') {
            cb(false);
            return;
        }

        if (value.match(/[$&+,:;=?@#|'<>.^*()%!-]+/) && value.match(/[a-z]+/) && value.match(/[A-Z]+/) && value.match(/[0-9]+/)) {
            cb(true);
            return;
        } else {
            cb(false);
            return;

        }
    }


    render() {
        let sixteenYearsAgo = new Date();
        sixteenYearsAgo.setFullYear(sixteenYearsAgo.getFullYear() - 16);
        sixteenYearsAgo = sixteenYearsAgo.toJSON().split("T")[0];

        return (
            <div className="row h-100 justify-content-md-center"
                style={{ margin: "1%", minHeight: "85vh" }}>
                <div className="col-sm-12 col-md-8 col-lg-6 my-auto">

                    <ListGroup>
                        {/*ptipologia veicolo*/}
                        <center>
                            <ListGroupItem style={{ backgroundColor: "#2e1534", padding: "10px", borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }}>

                                <ButtonGroup style={{ margin: "10px", flexWrap: "wrap" }}>
                                    <Button 
                                        color="primary" 
                                        onClick={() => {
                                            this.setRSelected("guest");
                                            this.setState({ error: false });
                                            this.setState({ success: false });
                                        }}
                                        active={this.state.role === "guest"} 
                                        >
                                            Cliente
                                    </Button>
                                    <Button
                                        color="primary"
                                        onClick={() => {
                                            this.setRSelected("driver");
                                            this.setState({ error: false });
                                            this.setState({ success: false });
                                        }}
                                        active={this.state.role === "driver"}
                                        >
                                            Autista
                                    </Button>
                                    <Button
                                        color="primary"
                                        onClick={() => {
                                            this.setRSelected("valet");
                                            this.setState({ error: false });
                                            this.setState({ success: false });
                                        }}
                                        active={this.state.role === "valet"}
                                        >
                                            Parcheggiatore
                                    </Button>
                                    <Button
                                        color="primary"
                                        onClick={() => {
                                            this.setRSelected("admin");
                                            this.setState({ error: false });
                                            this.setState({ success: false });
                                        }}
                                        active={this.state.role === "admin"}
                                        >
                                            Amministratore
                                    </Button>
                                </ButtonGroup>
                            </ListGroupItem>
                        </center>
                        <Jumbotron>
                            <AvForm onValidSubmit={this.onValidSubmit}>
                                {/* Riga nome e cognome */}
                                <div className="row">
                                    <div className="col-12 col-md-6">
                                        <AvField
                                            name="nome"
                                            type="text"
                                            label="Nome"
                                            onChange={this.handleChange("name")}
                                            style={{ label: { color: "white" } }}

                                            validate={{
                                                required: {
                                                    value: true,
                                                    errorMessage: "Il campo è richiesto",
                                                },
                                            }}
                                        />
                                    </div>

                                    <div className="col-12 col-md-6">
                                        <AvField
                                            name="cognome"
                                            type="text"
                                            label="Cognome"
                                            onChange={this.handleChange("surname")}
                                            required
                                            validate={{
                                                required: {
                                                    value: true,
                                                    errorMessage: "Il campo è richiesto.",
                                                },
                                            }}
                                        />
                                    </div>
                                </div>


                                <br />
                                

                                {/* Riga data di nascita */}
                                <div className="row">
                                    <div className="col-12">
                                        <AvField
                                            name="dataNascita"
                                            label="Data di nascita"
                                            type="date"
                                            max={sixteenYearsAgo}
                                            onChange={this.handleChange("birthdate")}
                                            errorMessage="Devi essere maggiorenne"
                                            validate={{
                                                required: {
                                                    value: true,
                                                    errorMessage: "Il campo è richiesto.",
                                                },
                                            }}
                                        />
                                    </div>
                                </div>

                                <br />
                                

                                {/*Riga email */}
                                <div className="row">
                                    <div className="col-12">
                                        <AvField
                                            name="email"
                                            label="Email"
                                            type="email"
                                            onChange={this.handleChange("email")}
                                            errorMessage="Campo non valido."
                                            required
                                        />
                                    </div>
                                </div>

                                <br />
                                

                                {/* Riga password */}
                                <div className="row">
                                    <div className="col-12 ">
                                        <AvField
                                            name="password"
                                            label="Password"
                                            type="password"
                                            validate={{
                                                required: {
                                                    value: true,
                                                    errorMessage: "Il campo è richiesto"
                                                },
                                                minLength: { value: 8, errorMessage: "La password deve contenere almeno 8 caratteri" },
                                                isStrong: this.isStrongPassword
                                            }}
                                            errorMessage="La password deve contenere almeno una lettera minuscola, una lettere maiuscola, un numero e un carattere speciale"
                                            onChange={this.handleChange("password")}
                                        />
                                    </div>
                                </div>

                                <br />
                                

                                {/* Riga numero di telefono */}
                                <div className="row">
                                    <div className="col-12 ">
                                        <AvField
                                            name="telefono"
                                            label="Numero di cellulare"
                                            type="tel"
                                            validate={{
                                                required: { value: true },
                                                minLength: { value: 10 },
                                                maxLength: { value: 10 },
                                            }}
                                            errorMessage="numero non valido"
                                            onChange={this.handleChange("phone")}
                                        />
                                    </div>
                                </div>
                                

                                {/* Pulsante aggiungi*/}
                                <center>
                                    <Button color="success" type="submit" style={{ padding: "8px", marginTop: "30px" }} >
                                        aggiungi
                                    </Button>
                                </center>

                            </AvForm>

                            <br />
                            {this.state.error && <Alert severity="error">{this.state.string}</Alert>}
                            {this.state.success && <Alert severity="success">Utente inserito correttamente</Alert>}

                        </Jumbotron>
                    </ListGroup>
                </div>
            </div >
        );

    }
}

