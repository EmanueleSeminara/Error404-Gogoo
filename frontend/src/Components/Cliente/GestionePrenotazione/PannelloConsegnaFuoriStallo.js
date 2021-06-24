import React, { Component } from "react";
import {ListGroup, ListGroupItem } from "reactstrap";


import faker from 'faker';
import CardConsegnaFuoriStallo from "./CardConsegnaFuoriStallo";


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
            <div className="row h-100 justify-content-md-center">
                <div className="col-sm-12 col-md-8 col-lg-6 my-auto" style={{ margin: "1%", minHeight: "100vh" }}>
                    <ListGroup>
                        <ListGroupItem style={{ backgroundColor: "#2e1534", padding: "10px", borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }}></ListGroupItem>

                        {<div>
                                {data.map(((item) => (
                                    <CardConsegnaFuoriStallo tipo={item.tipo} dataRitiro={item.dataRitiro} dataConsegna={item.dataConsegna} parcRitiro={item.parcRitiro} parcConsegna={item.parcConsegna} autista={true} id={item.id} />
                                    /*  <CardModificaUtente nome={item.nome} cognome={item.cognome} email={item.email} telefono={item.telefono} eta={item.eta} password={item.password}/> */
                                )))}
                            </div>}
                    </ListGroup>
                </div>
            </div>
        );
    }
}

