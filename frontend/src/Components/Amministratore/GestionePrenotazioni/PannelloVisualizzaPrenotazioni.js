import React, { Component } from "react";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { Button } from "reactstrap";
import CardPrenotazione from "./CardPrenotazione";
import Axios from "axios";
import NavbarDipendente from "../../../Components/NavbarDipendente"
import { Alert } from '@material-ui/lab';

export default class PannelloViasualizzaPrenotazioni extends Component {
    state = {
        listReservation: [],
        email: ""
    };

    componentDidMount() {
        if (localStorage.getItem("utente") === null) {
            window.location.href = '/'
        } else {
            let c = JSON.parse(localStorage.getItem("utente"));
            if (c.role === "driver") {
                window.location.href = "/pannelloAutista";
            } else if (c.role === "guest") {
                window.location.href = "/ricerca";
            } else if (c.role === "valet") {
                window.location.href = "/pannelloParcheggiatore";
            }
        }
    }


    handleChange = (input) => (e) => {
        this.setState({ [input]: e.target.value });
    };



    onValidSubmit = (event) => {
        console.log("premuto")
        event.preventDefault();
        Axios.get('/api/admin/reservations?email=' + this.state.email)
            .then((res) => {
                this.setState({ listReservation: res.data })
                if (res.data.length === 0) {
                    this.setState({ string: "Il cliente selezionato non ha prenotazioni o non esiste" });
                    this.setState({ error: true });
                }
            }).catch((err) => {
                if (err.response.status === 422) {
                    this.setState({ string: "errore nell'inserimento dei dati" });
                    this.setState({ error: true });
                } else if (err.response.status === 503) {
                    this.setState({ string: "Per il momento non è possibile cercare gli utenti, riprova più tardi" });
                    this.setState({ error: true });
                } else {
                    window.location.href = "/errorServer";
                }
            })
    };

    remove = (reservationID) => {
        Axios.delete('/api/admin/deletereservation/' + reservationID)
            .then((res) => {
                this.setState({ listReservation: this.state.listReservation.filter(reservation => reservation.id !== reservationID) });
            }).catch((err) => {
                window.location.href = '/errorServer';
            });
    };



    render() {
        return (
            <div className="ez sfondo" style={{ height: "100%" }}>
                <NavbarDipendente />
                <div className="row h-100 justify-content-md-center boxpannel">
                    <div className="d-flex flex-column pannell-amministratore">

                        <div className="title">Visualizza Prenotazioni</div>

                        <AvForm onValidSubmit={this.onValidSubmit}>
                            {/* Riga nome e cognome */}
                            <div className="row">
                                {/*Riga email */}
                                <div className="row">

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

                            <center>
                                <Button className="buttonCyano" type="submit">
                                    cerca
                                </Button>
                            </center>
                        </AvForm>
                        <br />
                        {this.state.error && <Alert severity="error">{this.state.string}</Alert>}

                        {<div>
                            {this.state.listReservation.map(((item) => (
                                <div className="p-4">
                                    <CardPrenotazione id={item.id} type={item.type} category={item.category} dateR={item.dateR} dateC={item.dateC} refParkingR={item.refParkingR} refParkingC={item.refParkingC} refDriver={item.refDriver} refVehicle={item.refVehicle} positionC={item.positionC} positionR={item.positionR} remove={this.remove} />
                                </div>
                            )))}
                        </div>}


                    </div>
                </div>
            </div>
        );
    }
}

