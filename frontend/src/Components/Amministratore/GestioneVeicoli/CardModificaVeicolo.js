import React, { Component } from 'react';
import { Button, Label, } from 'reactstrap';
import { AvForm, AvField, } from "availity-reactstrap-validation"
import Axios from 'axios';
import Alert from '@material-ui/lab/Alert';
import "../../../ComponentsCss/CardModificaVeicolo.css"
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

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

  onValidSubmit = (event) => {
    event.preventDefault();
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
  };

  render() {
    return (
      <div>
        <div className="card card-css">
          <center>
            <div className="row no-gutters">
              <div className="col">
                <div className="card-body ">
                  <h5 className="infoCard">id: {this.state.id}</h5>
                  {this.state.category !== null ? <h5 className="infoCard">Categoria: {this.state.category}</h5> : <> </>}
                  <h5 className="infoCard">Parcheggio: {this.state.refParking} </h5>
                  <h5 className="infoCard">State: {this.state.state} </h5>
                  <button className="buttonModifyVeicle" onClick={() => { this.setModifica("modifica") }} style={{ textDecoration: "none" }}>Modifica</button>
                </div>
              </div>
            </div>
          </center>
          {this.state.modifica &&
            <div className="col pannelModifica">
              <center >
                <AvForm onValidSubmit={this.onValidSubmit}>
                  {/* Riga Ubicazione e stato */}
                  <Label >Ubicazione</Label>
                  <AvField
                    type="select"
                    name="selectPartenza"
                    id="parcheggioPartenza"
                    placeholder={this.state.refParking}
                    onClick={this.handleChange("refParking")}
                  >
                    <option value="" disabled selected hidden>{this.state.refParking}</option>
                    <option>Via Libertà</option>
                    <option>Via Roma</option>
                    <option>Via Ernesto Basile</option>
                    <option>Viale Regione</option>
                    <option>Via Tersicore</option>
                  </AvField>
                  <Label >Stato</Label>
                  <RadioGroup row name="radioStato" style={{ backgroundColor: "transparent", justifyContent: "center" }} onClick={this.handleChange("state")}>
                    <FormControlLabel label="Danneggiato" value="damage" control={<Radio />} />
                    <FormControlLabel label="In Uso" value="in use" control={<Radio />} />
                    <FormControlLabel label="Disponibile" value="available" control={<Radio />} />
                  </RadioGroup>
                  {/* Pulsanti Modifica e Annulla*/}
                  <Button type="submit" className="buttonModify" type="submit" style={{ padding: "8px", margin: "10px", marginBottom: "38px" }}  >
                    <strong>Modifica</strong>
                  </Button>
                  <Button
                    className="buttonAnnulla"
                    onClick={() => {
                      this.setModifica("modifica");
                      this.setState({ error: false });
                      this.setState({ success: false });
                      this.setting();
                    }}
                    style={{ padding: "8px", margin: "10px", marginBottom: "38px" }}  >
                    <strong>Annulla</strong>
                  </Button>
                  {this.state.error && <Alert severity="error">{this.state.string}</Alert>}
                  {this.state.success && <Alert severity="success">Dati Modificati Correttamente</Alert>}
                </AvForm>
              </center>
            </div>
          }
        </div>
      </div>
    );
  }
}

