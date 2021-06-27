import React, { Component } from "react";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { Button, ListGroup, ListGroupItem, Card, Jumbotron, Table, ButtonGroup } from "reactstrap";


import CardPrenotazione from "../../Prenotazione/CardPrenotazione";
import faker from 'faker';


const data = new Array(10).fill().map((value, index) => ({ id: index, tipo: faker.lorem.words(1), dataRitiro: faker.lorem.words(1), dataConsegna: faker.lorem.words(1), parcRitiro: faker.lorem.words(1), parcConsegna: faker.lorem.words(1) }))



export default class PannelloViasualizzaPrenotazioni extends Component {
    state = {
        rSelected: "Auto",
        nome: "",
        cognome: "",
        modifica: "",


    };

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
                            <Jumbotron style={{paddingBottom: "0px" }}>
                                <AvForm>
                                    {/* Riga nome e cognome */}
                                    <div className="row">
                                        <div className="col-12 col-md-6">
                                            <AvField
                                                name="nome"
                                                type="text"
                                                label="Nome"
                                                onChange={this.handleChange("nome")}
                                                style={{ label: { color: "white" } }}
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
                                                onChange={this.handleChange("cognome")}
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
                                </AvForm>
                                <center>
                                    <Button color="outline-success" onClick={() => { this.setModifica(true) }} style={{ padding: "8px" }}   type="submit">
                                        cerca
                                    </Button>
                                </center>

                                <hr style={{ backgroundColor: "#3FD0CB" }} />
                                <br />
                            </Jumbotron>

                            {this.state.modifica &&
                                <div>
                                    {data.map(((item) => (
                                        <CardPrenotazione tipo={item.tipo} dataRitiro={item.dataRitiro} dataConsegna={item.dataConsegna} parcRitiro={item.parcRitiro} parcConsegna={item.parcConsegna} autista={true} id={item.id}/>
                                        /*  <CardModificaUtente nome={item.nome} cognome={item.cognome} email={item.email} telefono={item.telefono} eta={item.eta} password={item.password}/> */

                                    )))}
                                </div>}
                        </ListGroup>
                    </div>
                </div>
        );
    }
}

