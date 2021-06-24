import React, { Component } from "react";


import { Jumbotron, Container, Button } from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";

import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import imageLogo from "../images/logo.svg";
import { Alert, AlertTitle } from '@material-ui/lab';
import Axios from 'axios';

export default class recuperoPassword extends Component {
    state = {
        email: "",
        error: false,
        success: false,
        string: ""
    };
    
    handleChange = (input) => (e) => {
        this.setState({ [input]: e.target.value });
    };


    onValidSubmit = (event) => {
        console.log("tasto cliccato")
        event.preventDefault();
        this.retrievePassword();
    };

    retrievePassword = () => {
        Axios.post('/api/user/forgotpassword', this.state)
        .then((res) => {
            this.setState({ error: false });
            this.setState({ success: true });
        }).catch((err) => {
            this.setState({ success: false });
            if (err.response.status === 513) {
                this.setState({ string: "email non è associata ad un account" });
                this.setState({ error: true });
            } else if (err.response.status === 503) {
                this.setState({ string: "impossibile recuperare la password al momento, riprova più tardi" });
                this.setState({ error: true });
            } else {
                window.location.href = "/serverError"
            }
        });
    }
  


    render() {
        return (
            <div className="ez">
                <Navbar />

                <div
                    className="row h-100 justify-content-md-center"
                    style={{ margin: "5%", minHeight: "85vh" }}
                >
                    <div className="col-sm-12 col-md-8 col-lg-6 my-auto">
                        <Jumbotron style={{backgroundColor: "#27394c"}}>
                            <Container fluid>
                                <center>
                                    <img
                                        src={imageLogo}
                                        height="90px"
                                        width="90px"
                                        alt="Impossibile caricare la foto"
                                        style={{marginBottom : "30px"}}
                                    />
                                </center>

                                <br />
                                <AvForm onValidSubmit={this.onValidSubmit}>
                                    <AvField
                                        name="email"
                                        type="email"
                                        placeholder="email"
                                        onChange={this.handleChange("email")}
                                        errorMessage="Non sembra tu abbia inserito una mail"
                                        validate={{
                                            required: {
                                                value: true,
                                                errorMessage: "Il campo è richiesto",
                                            },
                                        }}
                                    />

                                    <br />
                                    <center>
                                        <Button color="outline-primary" size="lg" type="submit">Recupera password</Button>
                                    </center>
                                    <br />

                                    {this.state.error && <Alert severity="error">{this.state.string}</Alert>}
                                    {this.state.success && <Alert severity="success">Nuova password inviata per email</Alert>}
                                </AvForm>
                            </Container>
                        </Jumbotron>
                    </div>
                </div>

                <Footer />
            </div>
        );
    }
}
