import React, { Component } from "react";
import DateFnsUtils from '@date-io/date-fns';
import "../../../ComponentsCss/Pannel.css";

import {
    DateTimePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';


import {
    ListGroup,
    ListGroupItem,
    Button,
    Input,
    Jumbotron,
    FormGroup,
    Label,
    Col,
    Form,
    ButtonGroup,
} from "reactstrap";

import {
    AvForm,
    AvGroup,
    AvRadio,
    AvRadioGroup,
    AvField,
} from "availity-reactstrap-validation";


export default class PannelloAggiugiVeicolo extends Component {
    state = {
        category: "1",
        position: "parcheggio A",
        type: "Auto",
        state: "available"

    };

    setRSelected = (num) => {
        this.setState({ type: num });
    }

    handleChange = (input) => (e) => {
        this.setState({ [input]: e.target.value });
    };

    stampa = (state) => {
        console.log(state);
        console.log();
    };

    onValidSubmit = (event) => {
        event.preventDefault();
        console.log(this.state);
    };


    render() {
        if (this.state.type === "Auto") {
            return (
                <div className="row h-100 justify-content-md-center"
                    style={{ margin: "1%", minHeight: "100vh" }}>
                    <div className="col-sm-12 col-md-8 col-lg-6 my-auto">
                        <AvForm onValidSubmit={this.onValidSubmit}>
                            <ListGroup>
                                {/*ptipologia veicolo*/}
                                <center>
                                    <ListGroupItem style={{ backgroundColor: "#2e1534", padding: "10px", borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }}>

                                        <ButtonGroup style={{ margin: "10px", flexWrap: "wrap" }}>
                                            <Button color="primary" onClick={() => this.setRSelected("car")} active={this.state.type === "Automobile"} size="lg">Automobile</Button>
                                            <Button color="primary" onClick={() => this.setRSelected("Moto")} active={this.state.type === "Moto"} size="lg">Motore</Button>
                                            <Button color="primary" onClick={() => this.setRSelected("monoped")} active={this.state.type === "monoped"} size="lg">Monopattino</Button>
                                            <Button color="primary" onClick={() => this.setRSelected("Bicicletta")} active={this.state.type === "Bicicletta"} size="lg">Bicicletta</Button>
                                        </ButtonGroup>
                                    </ListGroupItem>
                                </center>

                                <ListGroupItem >


                                    <AvGroup >
                                        <center style={{ marginTop: "10px" }}>
                                            <AvRadioGroup
                                                inline
                                                name="Tipo1"
                                                label=""
                                                onClick={this.handleChange("category")}
                                                validate={{
                                                    required: {
                                                        errorMessage: "Il campo è richiesto",
                                                    },
                                                }}
                                            >
                                                <AvRadio label="TipoAuto1" value="1" />
                                                <AvRadio label="TipoAuto2" value="2" />
                                                <AvRadio label="TipoAuto3" value="3" />
                                                <AvRadio label="TipoAuto4" value="4" />
                                            </AvRadioGroup>
                                        </center>
                                    </AvGroup>


                                </ListGroupItem>

                                {/* Targa*/}
                                <ListGroupItem>
                                    <center>

                                        <Col>
                                            <Label for="targa" >Targa</Label>
                                            {/* <Input type="text" name="targa" id="targaAuto" placeholder="targa auto" onChange={this.handleChange("targa")} required /> */}
                                            <AvField
                                                name="targa"
                                                type="text"
                                                placeholder="targa auto"
                                                onChange={this.handleChange("targa")}
                                                validate={{
                                                    required: {
                                                        errorMessage: "Il campo è richiesto",
                                                    },
                                                }}
                                            />
                                        </Col>
                                    </center>
                                </ListGroupItem>
                                {/* Ubicazione*/}
                                <ListGroupItem>
                                    <center>


                                        <Col >
                                            <Label >Ubicazione</Label>
                                            <Input type="select" name="select" id="Ubicazione" onClick={this.handleChange("position")} >
                                                <option>Parcheggio A</option>
                                                <option>Parcheggio B</option>
                                                <option>Parcheggio C</option>
                                                <option>Parcheggio D</option>
                                                <option>Parcheggio E</option>
                                            </Input>
                                        </Col>

                                    </center>
                                </ListGroupItem>
                                {/* Pulsante aggiungi*/}
                                <ListGroupItem style={{ padding: "20px" }}>
                                    <center>
                                        <Button color="outline-success" type="submit" style={{ padding: "8px" }} size="lg">
                                            aggiungi
                                        </Button>
                                    </center>
                                </ListGroupItem>
                            </ListGroup>
                        </AvForm>
                    </div>
                </div>
            );
        }
        if (this.state.type == "Moto") {
            return (
                <div className="row h-100 justify-content-md-center"
                    style={{ margin: "1%", minHeight: "100vh" }}>
                    <div className="col-sm-12 col-md-8 col-lg-6 my-auto">
                        <AvForm onValidSubmit={this.onValidSubmit}>

                            <ListGroup>
                                {/*category veicolo*/}
                                <center>
                                    <ListGroupItem style={{ backgroundColor: "#2e1534", padding: "10px", borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }}>

                                        <ButtonGroup style={{ margin: "10px", flexWrap: "wrap" }}>
                                            <Button color="primary" onClick={() => this.setRSelected("Auto")} active={this.state.type === "Automobile"} size="lg">Automobile</Button>
                                            <Button color="primary" onClick={() => this.setRSelected("Moto")} active={this.state.type === "Moto"} size="lg">Motore</Button>
                                            <Button color="primary" onClick={() => this.setRSelected("Monopattino")} active={this.state.type === "Monopattino"} size="lg">Monopattino</Button>
                                            <Button color="primary" onClick={() => this.setRSelected("Bicicletta")} active={this.state.type === "Bicicletta"} size="lg">Bicicletta</Button>
                                        </ButtonGroup>
                                    </ListGroupItem>
                                </center>
                                <ListGroupItem >

                                    <AvGroup >
                                        <center style={{ marginTop: "10px" }}>
                                            <AvRadioGroup
                                                inline
                                                name="Tipo1"
                                                label=""
                                                onClick={this.handleChange("category")}
                                                validate={{
                                                    required: {
                                                        errorMessage: "Il campo è richiesto",
                                                    },
                                                }}
                                            >
                                                <AvRadio label="TipoMoto1" value="1" />
                                                <AvRadio label="TipoMoto2" value="2" />
                                                <AvRadio label="TipoMoto3" value="3" />
                                                <AvRadio label="TipoMoto4" value="4" />
                                            </AvRadioGroup>
                                        </center>
                                    </AvGroup>


                                </ListGroupItem>

                                {/* Targa*/}
                                <ListGroupItem>
                                    <center>
                                        <Col>
                                            <Label for="targa" >Targa</Label>
                                            {/* <Input type="text" name="targa" id="targaAuto" placeholder="targa auto" onChange={this.handleChange("targa")} required /> */}
                                            <AvField
                                                name="targa"
                                                type="text"
                                                placeholder="targa auto"
                                                onChange={this.handleChange("targa")}
                                                validate={{
                                                    required: {
                                                        errorMessage: "Il campo è richiesto",
                                                    },
                                                }}
                                            />
                                        </Col>
                                    </center>
                                </ListGroupItem>
                                {/* Ubicazione*/}
                                <ListGroupItem>
                                    <center>

                                        <Col >
                                            <Label >Ubicazione</Label>
                                            <Input type="select" name="select" id="Ubicazione" onClick={this.handleChange("position")} >
                                                <option>Parcheggio A</option>
                                                <option>Parcheggio B</option>
                                                <option>Parcheggio C</option>
                                                <option>Parcheggio D</option>
                                                <option>Parcheggio E</option>
                                            </Input>
                                        </Col>
                                    </center>
                                </ListGroupItem>
                                {/* Pulsante aggiungi*/}
                                <ListGroupItem style={{ padding: "20px" }}>
                                    <center>
                                        <Button color="outline-success" type="submit" style={{ padding: "8px" }} size="lg">
                                            aggiungi
                                        </Button>
                                    </center>
                                </ListGroupItem>
                            </ListGroup>
                        </AvForm>
                    </div>
                </div>
            );
        }
        if (this.state.type == "Monopattino") {
            return (
                <div className="row h-100 justify-content-md-center"
                    style={{ margin: "1%", minHeight: "100vh" }}>
                    <div className="col-sm-12 col-md-8 col-lg-6 my-auto">
                        <AvForm onValidSubmit={this.onValidSubmit}>
                            <ListGroup>
                                {/*category veicolo*/}
                                <center>
                                    <ListGroupItem style={{ backgroundColor: "#2e1534", padding: "10px", borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }}>

                                        <ButtonGroup style={{ margin: "10px", flexWrap: "wrap" }}>
                                            <Button color="primary" onClick={() => this.setRSelected("Auto")} active={this.state.type === "Automobile"} size="lg">Automobile</Button>
                                            <Button color="primary" onClick={() => this.setRSelected("Moto")} active={this.state.type === "Moto"} size="lg">Motore</Button>
                                            <Button color="primary" onClick={() => this.setRSelected("Monopattino")} active={this.state.type === "Monopattino"} size="lg">Monopattino</Button>
                                            <Button color="primary" onClick={() => this.setRSelected("Bicicletta")} active={this.state.type === "Bicicletta"} size="lg">Bicicletta</Button>
                                        </ButtonGroup>
                                    </ListGroupItem>
                                </center>
                                {/* Ubicazione*/}
                                <ListGroupItem>
                                    <center>
                                        <Label >Ubicazione</Label>
                                        <Col >
                                            <Input type="select" name="select" id="Ubicazione" onClick={this.handleChange("position")} >
                                                <option>Parcheggio A</option>
                                                <option>Parcheggio B</option>
                                                <option>Parcheggio C</option>
                                                <option>Parcheggio D</option>
                                                <option>Parcheggio E</option>
                                            </Input>
                                        </Col>
                                    </center>
                                </ListGroupItem>
                                {/* Pulsante aggiungi*/}
                                <ListGroupItem style={{ padding: "20px" }}>
                                    <center>
                                        <Button color="outline-success" type="submit" style={{ padding: "8px" }} size="lg">
                                            aggiungi
                                        </Button>
                                    </center>
                                </ListGroupItem>
                            </ListGroup>
                        </AvForm>
                    </div>
                </div>
            );
        }
        if (this.state.type == "Bicicletta") {
            return (
                <div className="row h-100 justify-content-md-center"
                    style={{ margin: "1%", minHeight: "100vh" }}>
                    <div className="col-sm-12 col-md-8 col-lg-6 my-auto">
                        <AvForm onValidSubmit={this.onValidSubmit}>
                            <ListGroup>
                                {/*category veicolo*/}
                                <center>
                                    <ListGroupItem style={{ backgroundColor: "#2e1534", padding: "10px", borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }}>

                                        <ButtonGroup style={{ margin: "10px", flexWrap: "wrap" }}>
                                            <Button color="primary" onClick={() => this.setRSelected("Auto")} active={this.state.type === "Automobile"} size="lg">Automobile</Button>
                                            <Button color="primary" onClick={() => this.setRSelected("Moto")} active={this.state.type === "Moto"} size="lg">Motore</Button>
                                            <Button color="primary" onClick={() => this.setRSelected("Monopattino")} active={this.state.type === "Monopattino"} size="lg">Monopattino</Button>
                                            <Button color="primary" onClick={() => this.setRSelected("Bicicletta")} active={this.state.type === "Bicicletta"} size="lg">Bicicletta</Button>
                                        </ButtonGroup>
                                    </ListGroupItem>
                                </center>
                                {/* Ubicazione*/}
                                <ListGroupItem>
                                    <center>
                                        <Label >Ubicazione</Label>
                                        <Col >
                                            <Input type="select" name="select" id="Ubicazione" onClick={this.handleChange("position")} >
                                                <option>Parcheggio A</option>
                                                <option>Parcheggio B</option>
                                                <option>Parcheggio C</option>
                                                <option>Parcheggio D</option>
                                                <option>Parcheggio E</option>
                                            </Input>
                                        </Col>
                                    </center>
                                </ListGroupItem>
                                {/* Pulsante aggiungi*/}
                                <ListGroupItem style={{ padding: "20px" }}>
                                    <center>
                                        <Button color="outline-success" type="submit" style={{ padding: "8px" }} size="lg">
                                            aggiungi
                                        </Button>
                                    </center>
                                </ListGroupItem>
                            </ListGroup>
                        </AvForm>
                    </div>
                </div>
            );
        }

    }
}

