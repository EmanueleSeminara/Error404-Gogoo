import React, { Component } from 'react';
import { Button, ListGroup, Jumbotron, Label, Input, Col, ListGroupItem, Row } from 'reactstrap';
import { AvForm, AvField, AvRadio, AvRadioGroup, } from "availity-reactstrap-validation"
import Axios from 'axios';
import Alert from '@material-ui/lab/Alert';

export default class CardModificaVeicolo extends Component {

  state = {
    modifica: false,
    id: "",
    category: "",
    state: "",
    refParking: "",
    type: "",
    error: false,
    success: false,
    string: ""
  };

  setting = () => {
    this.setState({ id: this.props.id });
    this.setState({ type: this.props.type });
    this.setState({ category: this.props.category });
    this.setState({ state: this.props.state });
    this.setState({ refParking: this.props.refParking });
  }

  componentDidMount(){
    this.setting();
  }
  
  componentDidUpdate(propsPrecedenti){
    if (this.props !== propsPrecedenti) {
      this.setting();
    }
  }

  setModifica = (input) => {
    this.setState({ modifica: !this.state[input] });
  }

  handleChange = (input) => (e) => {
    this.setState({ [input]: e.target.value });
  }

  modify = () => {
    Axios.put('/api/vehicle/updatevehicle', this.state)
    .then((res) => {
      this.setState({ error: false });
      this.setState({ success: true });
    }).catch((err) => {
      this.setState({ success: false });
      if (err.response.status === 422) {
        this.setState({ string: "errore nell'inserimento dei dati" });
        this.setState({ error: true });
      } else if (err.response.status === 503) {
        this.setState({ string: "impossibile modificare i dati del veicolo al momento, riprova più tardi" });
        this.setState({ error: true });
      } else {
        window.location.href = "/serverError"
      }
    })
  } 

  onValidSubmit = (event) => {
    event.preventDefault();
    this.modify()
    console.log(this.state);
  };

  render() {
    return (
      <div>
        <div className="card ">
          <center>
            <div className="row no-gutters">
              <div className="col">
                <div className="card-body">
                  <h5>id: {this.state.id}</h5>
                  {this.state.category !== null ? <h5>Categoria: {this.state.category}</h5> : <> </>}
                  <h5>Parcheggio: {this.state.refParking} </h5>
                  <h5>State: {this.state.state} </h5>
                  <button className="btn-lg btn-danger" onClick={() => { this.setModifica("modifica") }} style={{ textDecoration: "none" }}>Modifica</button>
                </div>
              </div>
            </div>
          </center>
        </div>
        {this.state.modifica &&
          <center >
            <Jumbotron>
              <AvForm onValidSubmit={this.onValidSubmit}>
                <ListGroup >
                  <ListGroupItem>
                    {/* Riga Ubicazione e stato */}
                    <Row>
                      <Col >
                        <Label >Ubicazione</Label>
                        <AvField
                          type="select"
                          name="selectPartenza"
                          id="parcheggioPartenza"
                          placeholde={this.state.refParking}
                          onClick={this.handleChange("refParking")}
                         >
                          
                        <option value="" disabled selected hidden>{ this.state.refParking }</option>
                          <option>Via Libertà</option>
                          <option>Via Roma</option>
                          <option>Via Ernesto Basile</option>
                          <option>Viale Regione</option>
                          <option>Via Tersicore</option>
                        </AvField>
                      </Col>
                      <Col>
                        <Label >Stato</Label>
                        <AvRadioGroup inline name="radioStato" style={{ boxShadow: "none" }} onClick={this.handleChange("state")}>
                          <AvRadio label="Danneggiato" value="damage" />
                          <AvRadio label="In Uso" value="in use" />
                          <AvRadio label="Disponibile" value="avalaible" />
                        </AvRadioGroup>
                      </Col>
                    </Row>
                    <hr style={{ backgroundColor: "#3FD0CB" }} />
                    {/* Pulsanti Modifica e Annulla*/}
                    <Button type="submit" color="outline-success" type="submit" style={{ padding: "8px", margin: "10px" }} size="lg">
                      Modifica
                    </Button>
                  <Button 
                    color="outline-danger"
                    onClick={() => {
                      this.setModifica("modifica"); 
                      this.setState({ error: false });
                      this.setState({ success: false });
                      this.setting();
                    }} 
                    style={{ padding: "8px", margin: "10px" }} size="lg">
                      Annulla
                    </Button>

                  </ListGroupItem>
                </ListGroup>
              <br />
              {this.state.error && <Alert severity="error">{this.state.string}</Alert>}
              {this.state.success && <Alert severity="success">Dati Modificati Correttamente</Alert>}
              </AvForm>
            </Jumbotron>
          </center>}
      </div>
    );
  }
}

