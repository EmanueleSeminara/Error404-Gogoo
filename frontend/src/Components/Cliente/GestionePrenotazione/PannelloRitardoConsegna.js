import React, { Component } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";


import faker from 'faker';
import CardRitardoConsegna from "./CardRitardoConsegna";
import NavbarCliente from "../../../Components/NavbarCliente";


const data = new Array(2).fill().map((value, index) => ({ id: index, tipo: faker.lorem.words(1), dataRitiro: faker.lorem.words(1), dataConsegna: faker.lorem.words(1), parcRitiro: faker.lorem.words(1), parcConsegna: faker.lorem.words(1) }))



export default class PannelloRitiroConsegna extends Component {


    setRSelected = (num) => {
        this.setState({ rSelected: num });
    }

    handleChange = (input) => (e) => {
        this.setState({ [input]: e.target.value });
    };

    setModifica = (bool) => {
        this.setState({ modifica: bool });
    }

    onValidSubmit = (event) => {
        event.preventDefault();
        console.log(this.state);
    };



    render() {
        return (
            <div className="ez sfondo-card">
                <NavbarCliente />
                <div className="row justify-content-md-center  ">
                    <div className="d-flex flex-column pannell-User ">
                        <center><div className="title">Ritardo Consegna</div></center>
                        {data.map(((item) => (
                             <div className="p-3 col-12">
                            <CardRitardoConsegna tipo={item.tipo} dataRitiro={item.dataRitiro} dataConsegna={item.dataConsegna} parcRitiro={item.parcRitiro} parcConsegna={item.parcConsegna} autista={true} id={item.id} />
                            </div>
                            /*  <CardModificaUtente nome={item.nome} cognome={item.cognome} email={item.email} telefono={item.telefono} eta={item.eta} password={item.password}/> */
                        )))}
                    </div>
                </div>
            </div>
        );
    }
}

