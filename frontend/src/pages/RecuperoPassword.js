import React, { Component } from "react";


import { Jumbotron, Container, Button } from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";

import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import imageLogo from "../images/logo.svg";
import { Alert, AlertTitle } from '@material-ui/lab';
import Axios from 'axios';
import "../ComponentsCss/RecuperoPassword.css";

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
            <div className="ez sfondo">
                <Navbar />
                {this.state.error && <Alert severity="error">{this.state.string}</Alert>}
                {this.state.success && <Alert severity="success">Nuova password inviata per email</Alert>}

                <div
                    className="row "

                >
                    <div className="col boxpannel recoveryPannel">
                        <div className="row pannelRecuperoPassword">
                            <div className="col-9">
                                <div className="title-password">Recovery password</div>





                                <AvForm className="formEmail" onValidSubmit={this.onValidSubmit}>
                                    <AvField
                                        name="emailRecovery"
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


                                    <center>
                                        <Button className="buttonRecovery" type="submit">Recovery</Button>
                                    </center>



                                </AvForm>

                            </div>
                        </div>


                        <Footer />
                    </div>
                </div>
            </div>
        );
    }
}
