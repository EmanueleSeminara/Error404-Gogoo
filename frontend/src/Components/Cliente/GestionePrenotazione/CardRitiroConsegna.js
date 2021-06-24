import React, { Component } from 'react';
import "bootstrap/dist/js/bootstrap.min.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import Alert from '@material-ui/lab/Alert';

import {
    Button, ListGroupItem,  ListGroup, 
} from 'reactstrap';

import {
    AvForm,
    AvField,
} from "availity-reactstrap-validation";



export default class CardPrenotazioneRitiroConsegna extends Component {
    state = {
        ritiro: false,
        consegna: false,
        id: this.props.id,
        errore: false,
        mostra: false,
        disabled: true,

    };

    stampa = (state) => {
        console.log(state);
    };

    setRitiro = (bool) => {
        this.setState({ ritiro: bool });
    }

    setMostra = (bool) => {
        this.setState({ mostra: bool });
        this.setState({disabled: true});
    }

    setConsegna = (bool) => {
        this.setState({ consegna: bool });
    }

    handleChange = (input) => (e) => {
        this.setState({ [input]: e.target.value });
    }

    onValidSubmit = (event) => {
        event.preventDefault();
        this.setState({ mostra: false });
        this.setState({ritiro: true});
        console.log(this.state);
        if(this.state.ritiro && !this.state.consegna){
            this.setState({disabled: false});
            this.setState({consegna: true});
        }
        else{
            this.setState({disabled: true});
        }
    };
    
    handleChangeDateArrivo = (date) => {
        this.setState({ dataArrivo: date });
    };

    handleChangeDatePartenza = (date) => {
        this.setState({ dataPartenza: date });
    };




    render() {
        return (
            <div className="card mb-3" style={{ maxWidth: " 940px", padding: "10px" }}>

                <div className="row no-gutters">
                    <div className="col-md-12">
                        <div className="card-body">

                            <div className="row no-gutters">
                                <div className="col-md-12">
                                    <h3 >Id veicolo:  {this.props.id}{/* {props.idVeicolo} */}</h3>
                                    <hr style={{ backgroundColor: "white" }} />
                                </div>


                            </div>
                            <div className="row no-gutters">
                                <div className="col-md-6">
                                    <p><strong>Tipo:</strong> {this.props.tipo}</p>
                                    <p><strong>parcheggio ritiro:</strong>   {this.props.parcRitiro}</p>
                                    <p><strong>data ritiro:</strong>   {this.props.dataRitiro}</p>
                                </div>
                                <div className="col-md-6">
                                    <p><strong>Autista:</strong> {this.props.autista}</p>
                                    <p><strong>parcheggio consegna:</strong>   {this.props.parcConsegna}</p>
                                    <p><strong>data consegna:</strong>   {this.props.dataConsegna}</p>
                                </div>
                            </div>
                            <center>
                                <Button type="button" color="primary" onClick={() => this.setMostra(true)} style={{ marginRight: "10px", marginTop: "20px" }} size="lg" disabled={this.state.ritiro }>
                                    Ritiro
                                </Button>
                                <Button type="button" color="success" onClick={() => this.setMostra(true)} style={{ marginRight: "10px", marginTop: "20px" }} size="lg" disabled={this.state.disabled}>
                                    Consegna
                                </Button>
                            </center>
                        </div>
                    </div>
                </div>
                {(this.state.mostra) &&
                    <center>
                        <ListGroup>
                            <ListGroupItem style={{display: "flex", justifyContent: "center", /* alignItems: "center" */}}>
                                <AvForm onValidSubmit={this.onValidSubmit}>
                                    <center>
                                        <div className="row">
                                            <div className="col-12 col-md-12">
                                                <AvField
                                                    name="id"
                                                    type="text"
                                                    label="ID veicolo"
                                                    placeholder={this.state.nome}
                                                    onChange={this.handleChange("id")}
                                                    style={{ label: { color: "white" } }}
                                                    validate={{
                                                        required: {
                                                            value: true,
                                                            errorMessage: "Il campo è richiesto.",
                                                        },
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </center>

                                    {/* Pulsante modifica*/}

                                    <Button type="submit" color="primary" style={{ padding: "8px", margin: "10px" }} size="lg">
                                        Conferma
                                    </Button>
                                </AvForm>
                            </ListGroupItem>
                        </ListGroup>
                        {this.state.errore && <Alert severity="error">This is an error alert — check it out!</Alert>}
                    </center>}

            </div>
        );
    }

}
