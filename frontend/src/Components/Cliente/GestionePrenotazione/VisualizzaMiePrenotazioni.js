import React, { Component } from "react";
import { ListGroup, ListGroupItem, } from "reactstrap";


import CardPrenotazione from "../../Prenotazione/CardPrenotazione";
import Axios from 'axios';
import faker from 'faker';

const data = new Array(2).fill().map((value, index) => ({ id: index, tipo: faker.lorem.words(1), dataRitiro: faker.lorem.words(1), dataConsegna: faker.lorem.words(1), parcRitiro: faker.lorem.words(1), parcConsegna: faker.lorem.words(1), autista: true }))



export default class ViasualizzaMiePrenotazioni extends Component {
    state = {
        listReservation: [],
        modifica: "",
    };

    componentDidMount(){
        Axios.get('/api/reservation/myreservations')
        .then((res) => {
            this.setState({listReservation: res.data})
        }).catch((err) => {
            console.log(err);
            //window.location.href = '/errorServer'
        })
    }

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
            <div>
                <div className="row h-100 justify-content-md-center"
                    style={{ minHeight: "100vh" }}>
                    <div className="col-sm-12 col-md-8 col-lg-6 my-auto">
                        <div id="pannelloRicerca" style={{ width: "690px", backgroundColor: "#e9ecef", paddingBottom: "60px", borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }}>
                            <ListGroup>
                                <ListGroupItem style={{ backgroundColor: "#2e1534", padding: "10px", borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }}></ListGroupItem>
                                {
                                    <div>
                                        {data.map(((item) => (
                                            <CardPrenotazione tipo={item.tipo} dataRitiro={item.dataRitiro} dataConsegna={item.dataConsegna} parcRitiro={item.parcRitiro} parcConsegna={item.parcConsegna} autista={item.autista} id={item.id} />
                                        )))}
                                    </div>}
                            </ListGroup>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
