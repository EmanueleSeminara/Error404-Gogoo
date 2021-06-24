import React, { Component } from "react";

import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";

import { Jumbotron, Button } from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
import imageLogo from "../images/logo.svg";
import "../ComponentsCss/Pannel.css";
import { Alert, AlertTitle } from '@material-ui/lab';
import Axios from 'axios'


export default class Registrazione extends Component {

    state = {
        name: "",
        surname: "",
        email: "",
        birthdate: "",
        password: "",
        phone: "",
        error: false,
        string: ""
    };

    handleChange = (input) => (e) => {
        this.setState({ [input]: e.target.value });
    };

    stampa = () =>{
        console.log(this.state);
    }

    register = () => {
        Axios.post('/api/user/register', this.state)
        .then((res) =>{
            this.setState({ error: false });
            window.location.href = "/login";
        }).catch((err) =>{
            if(err.response.status === 513){
                this.setState({ string: "email già associata ad un account" });
                this.setState({ error: true });
            } else if (err.response.status === 422) {
                this.setState({ string: "errore nell'inserimento dei dati" });
                this.setState({ error: true });
            } else if (err.response.status === 503){
                console.log("inpossibile regitrarsi al momento")
                this.setState({ string: "impossibile regitrarsi al momento, riprova più tardi" });
                this.setState({ error: true });
            } else {
                window.location.href="/serverError"
            }
        });
    }

    onValidSubmit = (event) => {
        event.preventDefault();
        this.register();
        console.log(this.state);
    };


    isStrongPassword(value, ctx, input, cb) {

        if (!value || value === '') {
          cb(false);
          return;
        }

        if(value.match(/[$@#&!]+/) && value.match(/[a-z]+/) && value.match(/[A-Z]+/) && value.match(/[0-9]+/)){
            cb(true);
            return;
        } else {
            cb(false);
            return;

        }
    }


    render() {
        // definisco il lower bound per la data di nascita
        let sixteenYearsAgo = new Date();
        sixteenYearsAgo.setFullYear(sixteenYearsAgo.getFullYear() - 16);
        sixteenYearsAgo = sixteenYearsAgo.toJSON().split("T")[0];

        return (
            <div className="ez">
                <Navbar />

                <AvForm
                    style={{ minHeight: "90vh" }}
                    onValidSubmit={this.onValidSubmit}
                >
                    <div
                        className="row h-100 justify-content-md-center"
                        style={{ margin: "5%" }}
                    >
                        <div className="col-sm-12 col-md-8 col-lg-6 my-auto">
                            <Jumbotron style={{backgroundColor: "#27394c", color: "beige"}} >
                                <center>
                                    <a href="/" style={{ textDecoration: "none" }}>
                                        <p
                                            className="glacialReg"
                                            style={{ fontSize: "40px", color: "white" }}
                                        >
                                            <img
                                                src={imageLogo}
                                                alt="Errore"
                                                width="90px"
                                                height="90px"
                                            />

                                        </p>
                                    </a>
                                </center>

                                <br />
                                <hr style={{ backgroundColor: "white" }} />

                                {/* Riga nome e cognome */}
                                <div className="row">
                                    <div className="col-12 col-md-6">
                                        <AvField
                                            name="nome"
                                            type="text"
                                            label="Nome"
                                            onChange={this.handleChange("name")}
                                            style={{label: {color: "white"}}}
                                            
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
                                <hr style={{ backgroundColor: "#3FD0CB" }} />

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
                                <hr style={{ backgroundColor: "#3FD0CB" }} />

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
                                <hr style={{ backgroundColor: "#3FD0CB" }} />

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
                                                    errorMessage: "Il campo è richiesto" },
                                                minLength: { value: 8,  errorMessage: "La password deve contenere almeno 8 caratteri"},
                                                isStrong: this.isStrongPassword
                                            }}
                                            errorMessage="La password deve contenere almeno una lettera minuscola, una lettere maiuscola, un numero e un carattere speciale"
                                            onChange={this.handleChange("password")}
                                        />
                                    </div>
                                </div>

                                <br />
                                <hr style={{ backgroundColor: "#3FD0CB" }} />

                                {/* Riga numero di telefono */}
                                <div className="row">
                                    <div className="col-12 ">
                                        <AvField
                                            name="telefono"
                                            label="Numero di telefono"
                                            type="tel"
                                            validate={{
                                                required: { value: true, errorMessage: "Il campo è richiesto"  },
                                                minLength: { value: 10 },
                                                maxLength: { value: 10 },
                                            }}
                                            errorMessage="il numero di telefono deve contenere 10 cifre"
                                            onChange={this.handleChange("phone")}
                                        />
                                    </div>
                                </div>

                                <hr style={{ backgroundColor: "#3FD0CB" }} />

                                <div className="text-center" style={{ paddingTop: "2%" }}>
                                    <Button color="primary" type="submit" size="lg" >
                                        Registrati
                                    </Button>
                                </div>

                                <br />
                                <br />
                                {this.state.error && <Alert severity="error">{this.state.string}</Alert>}
                            </Jumbotron>
                        </div>
                    </div>
                </AvForm> 

                <Footer />
            </div>
        );
    }
}
