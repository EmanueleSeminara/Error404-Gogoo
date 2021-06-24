import { AvField, AvForm } from "availity-reactstrap-validation";
import React, { Component } from 'react';
import { Col, Container, Row, Jumbotron, Button } from "reactstrap";
import "../ComponentsCss/Pannel.css";
import "../ComponentsCss/util.css";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import imageLogo from "../images/logo.svg";
import "../ComponentsCss/Pannel.css";
import { Alert, AlertTitle } from '@material-ui/lab';
import Axios from 'axios';


export default class Login extends Component {
    
    state = {
        username: "super@gmail.com",
        password: "Super966&",
        error: false
    };

    componentDidMount() {
        if (localStorage.getItem("utente") !== null) {
            let c = JSON.parse(localStorage.getItem("utente"));
            if (c.role === "guest") {
                window.location.href = "/ricerca";
            } else if (c.role === "admin"){
                window.location.href = "/pannelloAmministratore";
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
            if(res.data.role === "guest"){
                console.log(JSON.stringify(res.data));
                window.localStorage.setItem("utente", JSON.stringify(res.data));
                window.location.href = "/ricerca";
                let c = JSON.parse(localStorage.getItem("utente"));
                console.log(c.phone, c.role, c.birthdate);
            } else if (res.data.role === "admin") {
                console.log(JSON.stringify(res.data));
                window.localStorage.setItem("utente", JSON.stringify(res.data));
                window.location.href = "/pannelloAmministratore";
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


            <div className="ez" >
                <Navbar />

                <div
                    className="row h-100 justify-content-md-center"
                    style={{ margin: "1px", minHeight: "85vh" }}
                >
                    <div className="col-sm-12 col-md-8 col-lg-6 my-auto">
                        <Jumbotron style={{ backgroundColor: "#27394c", color: "beige" }}>
                            <Container fluid>
                                <center>
                                    <img
                                        src={imageLogo}
                                        height="94px"
                                        width="94px"
                                        alt="Errore"
                                    />
                                </center>

                                <AvForm onValidSubmit={this.onValidSubmit}>
                                    <AvField
                                        name="email"
                                        type="email"
                                        placeholder="email"
                                        onChange={this.handleChange("username")}
                                        errorMessage="Non sembra tu abbia inserito una mail"
                                        //required TODO: levare commento
                                        style={{ marginTop: "27px" }}
                                    />

                                    <br />

                                    <AvField
                                        name="psw"
                                        type="password"
                                        placeholder="password"
                                        onChange={this.handleChange("password")}
                                        errorMessage="Campo obbligatorio"
                                        //required TODO: levare commento

                                    />

                                    <br />

                                    <center>
                                        <Button type="submit" color="primary" size="lg">
                                            Login
                                        </Button>
                                    </center>
                                    <br />
                                </AvForm>
                            </Container>

                            <center style={{ color: 'white' }}>
                                Non hai un account?{" "}
                                <a href="/registrazione" style={{ color: "#9dffe8", textDecoration: "none" }}>
                                    Registrati
                                </a>
                            </center>
                            <center style={{ color: 'white' }}>
                                Hai smarrito la password?{" "}
                                <a href="/recuperoPassword" style={{ color: "#9dffe8", textDecoration: "none" }}>
                                    Recupera password
                                </a>
                            </center>

                            <br />
                            
                            {this.state.error && <Alert severity="error">Email o password non validi</Alert>}
                        </Jumbotron>
                    </div>
                </div>

                <Footer />
            </div>

        );
    }

}