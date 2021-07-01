import React, { Component } from "react";
import Axios from "axios";
import CardSegnalaGuasto from "./CardSegnalaGuasto";
import NavbarCliente from "../../../Components/NavbarCliente";
import Alert from '@material-ui/lab/Alert';



export default class PannelloSegnalaGuasto extends Component {
    state = {
        listReservation: [],
        string: "",
        error: false,
        success: false,
    };

    componentDidMount() {
        if (localStorage.getItem("utente") === null) {
            window.location.href = '/'
        } else {
            let c = JSON.parse(localStorage.getItem("utente"));
            if (c.role === "driver") {
                window.location.href = "/pannelloAutista";
            } else if (c.role === "admin") {
                window.location.href = "/pannelloAmministratore";
            } else if (c.role === "valet") {
                window.location.href = "/pannelloParcheggiatore";
            } else {
                Axios.get('/api/reservation/myreservations')
                    .then((res) => {
                        this.setState({ listReservation: res.data })
                        console.log(this.state.listReservation)
                    }).catch((err) => {
                        window.location.href = '/errorServer'
                    })
            }
        }
    }


    segnaleGuasto = (reservationID, position, vehicleID, category, type, refParkingC) => {
        const data = {
            id: reservationID,
            position: position,
            refVehicle: vehicleID,
            refParkingC: refParkingC,
            type: type,
            category: category,
        }
        console.log(data)
        Axios.put('/api/guest/damagedvehicle', data)
            .then((res) => {
                this.setState({ listReservation: this.state.listReservation.filter(reservation => reservation.id !== reservationID) });
                this.setState({ error: false });
				this.setState({ success: true });
            }).catch((err) => {
                this.setState({ success: false });
                if (err.response.status === 422) {
                    this.setState({ string: "errore nell'inserimento dei dati" });
                    this.setState({ error: true });
                } else if (err.response.status === 503) {
                    this.setState({ string: "impossibile segnalare il guasto al momento, riprova più tardi" });
                    this.setState({ error: true });
                } else {
                    window.location.href = "/serverError"
                }
            });
    };



    render() {
        return (
            <div className="ez sfondo-card">
                <NavbarCliente />
                {this.state.error && <Alert severity="error">{this.state.string}</Alert>}
                {this.state.success && <Alert severity="success"> segnalazione avvenuta con successo</Alert>}
                <div className="row justify-content-md-center  ">
                    <div className="d-flex flex-column pannell-User ">
                        <center><div className="title">Segnala Guasto</div></center>
                        {this.state.listReservation.length === 0 && <Alert severity="info">Non hai prenotazioni</Alert>}
                        {this.state.listReservation.map(((item) => (
                            <div className="p-3 col-12">
                                <CardSegnalaGuasto id={item.id} type={item.type} category={item.category} dateR={item.dateR} dateC={item.dateC} refParkingR={item.refParkingR} refParkingC={item.refParkingC} refDriver={item.refDriver} refVehicle={item.refVehicle} positionC={item.positionC} positionR={item.positionR} state={item.state} segnaleGuasto={this.segnaleGuasto} />
                            </div>
                        )))}
                    </div>
                </div>
            </div>
        );
    }
}

