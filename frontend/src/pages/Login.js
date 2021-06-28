import { AvField, AvForm } from "availity-reactstrap-validation";
import React, { Component } from 'react';
import { Col, Container, Row, Jumbotron, Button } from "reactstrap";
import "../ComponentsCss/Pannel.css";
import "../ComponentsCss/util.css";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import logo_testo from "../images/logo_testo.svg";
import "../ComponentsCss/Pannel.css";
import { Alert, AlertTitle } from '@material-ui/lab';
import Axios from 'axios';
import "../ComponentsCss/Login.css"


export default class Login extends Component {

    /* state = {
        username: "samu@gmail.com",
        password: "Samu966&",
        error: false
    }; */
    /* state = {
        username: "super@gmail.com",
        password: "Super966&",
        error: false
    }; */
    state = {
        username: "p.liberta@gmail.com",
        password: "Roma966&",
        error: false
    }

    componentDidMount() {
        if (localStorage.getItem("utente") !== null) {
            let c = JSON.parse(localStorage.getItem("utente"));
            if (c.role === "guest") {
                window.location.href = "/ricerca";
            } else if (c.role === "admin") {
                window.location.href = "/pannelloAmministratore";
            } else if (c.role === "valet") {
                window.location.href = "/pannelloParcheggiatore";
            } else {
                window.location.href = "/pannelloAutista";
            }
        }
    }

    handleChange = (input) => (e) => {
        this.setState({ [input]: e.target.value });
    };

    login = () => {
        console.log("funzione login");
        console.log(this.state);
        Axios.post('/api/user/sessions', this.state)
            .then((res) => {
                this.setState({ error: false });
                if (res.data.role === "guest") {
                    console.log(JSON.stringify(res.data));
                    window.localStorage.setItem("utente", JSON.stringify(res.data));
                    window.location.href = "/ricerca";
                    let c = JSON.parse(localStorage.getItem("utente"));
                    console.log(c.phone, c.role, c.birthdate);
                } else if (res.data.role === "admin") {
                    console.log(JSON.stringify(res.data));
                    window.localStorage.setItem("utente", JSON.stringify(res.data));
                    window.location.href = "/pannelloAmministratore";
                } else if (res.data.role === "valet") {
                    console.log(JSON.stringify(res.data));
                    window.localStorage.setItem("utente", JSON.stringify(res.data));
                    window.location.href = "/pannelloParcheggiatore";
                } else  {
                    console.log(JSON.stringify(res.data));
                    window.localStorage.setItem("utente", JSON.stringify(res.data));
                    window.location.href = "/pannelloAutista";
                }
            }).catch((err) => {
                if (err.response.status === 401) {
                    this.setState({ error: true });
                } else {
                    window.location.href = "/serverError"
                }
            });
    }


    onValidSubmit = (event) => {
        console.log("tasto cliccato")
        event.preventDefault();
        this.login();
    };

    render() {
        return (


            <div className="ez sfondo" >
                {/* <Navbar /> */}
                <div className="navMobile" style={{ display: "none" }}>
                    <Navbar />
                </div>
                {this.state.error &&

                    <Alert severity="error">Email o password non validi</Alert>
                }

                <div
                    className="row"

                >
                    <div className="col-6 imageLogo">
                        <img src={logo_testo} />
                    </div>
                    <div className="col boxpannel">

                        {/* <Jumbotron style={{ backgroundColor: "#27394c", color: "beige" }}> */}
                        <div className="row pannelLogin">
                            <div className="col-10">

                                {/* <Container fluid> */}
                                {/* <center>
                                    <img
                                        src={imageLogo}
                                        height="94px"
                                        width="94px"
                                        alt="Errore"
                                    />
                                </center> */}
                                <div className="titleLogin">Login</div>
                                <p>Please sign in to continue</p>

                                <AvForm className="formEmail" onValidSubmit={this.onValidSubmit}>
                                    <center>
                                        <AvField
                                            className="inputEmail"
                                            name="emailLogin"
                                            type="email"
                                            placeholder="email"
                                            onChange={this.handleChange("username")}
                                            errorMessage="Non sembra tu abbia inserito una mail"
                                            //required TODO: levare commento
                                            style={{ marginTop: "27px" }}
                                        />




                                        <AvField
                                            name="pswLogin"
                                            type="password"
                                            placeholder="password"
                                            onChange={this.handleChange("password")}
                                            errorMessage="Campo obbligatorio"
                                        //required TODO: levare commento

                                        />
                                    </center>



                                    <center>
                                        <Button className="buttonLogin" type="submit">
                                            Login
                                        </Button>
                                    </center>

                                </AvForm>
                                {/* </Container> */}


                                <center style={{ marginTop: "30px" }}>
                                    <a href="/recuperoPassword" style={{ color: "#43AAA6", textDecoration: "none" }}>
                                        Forgot password?
                                    </a>
                                </center>

                                <center style={{ color: '#554774', marginTop: "80px" }}>
                                    Don't have an account? {" "}
                                    <a href="/registrazione" style={{ color: "#9dffe8", textDecoration: "none" }}>
                                        Sign Up
                                    </a>
                                </center>
                            </div>




                            {/* </Jumbotron> */}

                        </div>

                    </div>


                </div>

                <Footer />
            </div>

        );
    }

}