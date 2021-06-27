import React, { Component } from 'react';
import "bootstrap/dist/js/bootstrap.min.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../ComponentsCss/PannelloAmministratore.css"
import AggiungiUtente from "../images/svgAmministratore/AggiungiUtente.svg"
import AggiungiVeicolo from "../images/svgAmministratore/AggiungiVeicolo.svg"
import Logout from "../images/svgAmministratore/Logout.svg"
import ModificaDatiUtente from "../images/svgAmministratore/ModificaDatiUtente.svg"
import RimuoviVeicolo from "../images/svgAmministratore/RimuoviVeicolo.svg"
import ModificaStatoVeicolo from "../images/svgAmministratore/ModificaStatoVeicolo.svg"
import PrenotazioniEffettuate from "../images/svgAmministratore/PrenotazioniEffettuate.svg"
import RimuoviUtente from "../images/svgAmministratore/RimuoviUtente.svg"
import { Button } from "reactstrap";
import Axios from 'axios';

import Footer from "../Footer";


export default class PannelloAmministratore extends Component {

    logout = () => {
        console.log("cliccato");
        window.localStorage.clear();
        Axios.post('/api/user/logout')
            .then((res) => {
                window.location.href = '/login';
            }).catch((err) => {
                window.location.href = '/errorServer';
            });
    };


    render() {
        return (
            <div>
                <div className="row h-100 justify-content-md-center ">
                    <center className="screen">
                        <div className="pannellAdmin " >
                            <div className="d-flex justify-content-center flex-wrap">
                                <div >
                                    <center>
                                        <Button className="p-3 buttonAdmin " href="/aggiungiVeicolo"><img className="iconAdmin" src={AggiungiVeicolo} /></Button>
                                        <Button className="p-3 buttonAdmin " href="/rimuoviVeicolo"><img className="iconAdmin" src={RimuoviVeicolo} /></Button>
                                    </center>
                                </div>
                                <div >
                                    <center>
                                        <Button className="p-3 buttonAdmin " href="/modificaVeicolo"><img className="iconAdmin" src={ModificaStatoVeicolo} /></Button>

                                        <Button className="p-3 buttonAdmin " href="/visualizzaPrenotazioni"><img className="iconAdmin" src={PrenotazioniEffettuate} /></Button>
                                    </center>
                                </div>
                            </div>
                            <div className="d-flex justify-content-center flex-wrap">
                                <div>
                                    <center>
                                        <Button className="p-3 buttonAdmin " href="/aggiungiUtente"><img className="iconAdmin" src={AggiungiUtente} /></Button>

                                        <Button className="p-3 buttonAdmin " href="/rimuoviUtente"><img className="iconAdmin" src={RimuoviUtente} /></Button>
                                    </center>
                                </div>
                                <div>
                                    <Button className="p-3 buttonAdmin " href="/modificaUtente"><img className="iconAdmin" src={ModificaDatiUtente} /></Button>

                                    <Button className="p-3 buttonAdmin " onClick={() => this.logout()}><img className="iconAdmin" src={Logout} /></Button>
                                </div>
                            </div>

                        </div>
                    </center>
                </div>
                <Footer />
            </div>
        );
    }

}
