import React, { Component } from "react";
import DateFnsUtils from "@date-io/date-fns";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import Alert from "@material-ui/lab/Alert";
import { Button, Label, Col, Input, Row, FormGroup } from "reactstrap";
import { AvForm } from "availity-reactstrap-validation";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import Axios from "axios";
import * as moment from "moment";

export default class CardPrenotazione extends Component {
  state = {
    type: "",
    refParkingR: "",
    refParkingC: "",
    dateR: "",
    dateC: "",
    modifica: false,
    errore: false,
    id: "",
    refVehicle: "",
    disabled: false,
    success: false,
  };

  setting = () => {
    this.setState({ refParkingR: this.props.refParkingR });
    this.setState({ refParkingC: this.props.refParkingC });
    this.setState({ dateR: this.props.dateR });
    this.setState({ dateC: this.props.dateC });
    this.setState({ type: this.props.type });
    this.setState({ id: this.props.id });
    this.setState({ refVehicle: this.props.refVehicle });
    Axios.get(
      "/api/reservation/canteditreservation?id=" +
        this.props.id +
        "&refVehicle=" +
        this.props.refVehicle
    )
      .then((res) => {
        this.setState({ disabled: res.data });
      })
      .catch((err) => {
        window.location.href = "/errorServer";
      });
  };

  componentDidMount() {
    this.setting();
  }

  componentDidUpdate(propsPrecedenti) {
    if (this.props !== propsPrecedenti) {
      this.setting();
    }
  }

  setModifica = (input) => {
    this.setState({ modifica: !this.state[input] });
  };

  handleChange = (input) => (e) => {
    this.setState({ [input]: e.target.value });
  };

  onValidSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);
  };

  handleChangeDataArrivo = (date) => {
    const d = moment(date).format("YYYY-MM-DD HH:mm");
    this.setState({ dateC: d });
  };

  handleChangeDataPartenza = (date) => {
    const d = moment(date).format("YYYY-MM-DD HH:mm");
    this.setState({ dateR: d });
  };

  modify = () => {
    Axios.put("/api/reservation/edit", this.state)
      .then((res) => {
        console.log(res);
        this.setState({ success: true });
        this.setState({ error: false });
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 422) {
          this.setState({ string: "errore nell'inserimento dei dati" });
          this.setState({ error: true });
        } else if (err.response.status === 503) {
          this.setState({
            string:
              "impossibile cambiare password al momento, riprova più tardi",
          });
          this.setState({ error: true });
        } else {
          window.location.href = "/errorServer";
        }
      });
  };

  render() {
    return (
      <div>
        <div className="card card-css">
          <center>
            <div className="row no-gutters">
              <div className="col">
                <div className="card-body">
                  <div className="row no-gutters">
                    <div className="col-md-12">
                      <p className="infoCard">
                        <strong>ID veicolo: {this.props.refVehicle}</strong>
                      </p>
                    </div>
                  </div>
                  <div className="row no-gutters">
                    <div className="col-md-6">
                      <p className="infoCard">
                        <strong>Tipo: </strong> {this.state.type}{" "}
                        {this.props.type === "car" ? (
                          <> {this.props.category}</>
                        ) : (
                          <></>
                        )}
                      </p>
                      {this.props.refParkingR != null && (
                        <p className="infoCard">
                          <strong>Parcheggio ritiro: </strong>{" "}
                          {this.state.refParkingR}
                        </p>
                      )}
                      {this.props.positionR != null && (
                        <p className="infoCard">
                          <strong>Posizione di ritiro: </strong>{" "}
                          {this.props.positionR}
                        </p>
                      )}
                      <p className="infoCard">
                        <strong>Data ritiro: </strong> {this.state.dateR}
                      </p>
                    </div>
                    <div className="col-md-6">
                      {this.props.state === "not confirmed" && (
                          <p className="infoCard" style={{ visibility: (this.props.type === "car" ? "visible" : "hidden")}}>
                            <strong >Autista: </strong> in attesa di conferma{" "}
                          </p>
                        )}
                      {this.props.state === "confirmed" && (
                          <p className="infoCard" style={{ visibility: (this.props.type === "car" ? "visible" : "hidden")}}>
                            <strong>Autista: </strong>{" "}
                            {this.props.refDriver != null ? (
                              <>{this.props.refDriver}</>
                            ) : (
                              <> no </>
                            )}{" "}
                          </p>
                        )}
                      {this.props.refParkingC != null && (
                        <p className="infoCard">
                          <strong>Parcheggio consegna: </strong>{" "}
                          {this.state.refParkingC}
                        </p>
                      )}
                      {this.props.positionC != null && (
                        <p className="infoCard">
                          <strong>Posizione di consegna: </strong>{" "}
                          {this.props.positionC}
                        </p>
                      )}
                      <p className="infoCard">
                        <strong>Data consegna: </strong> {this.state.dateC}
                      </p>
                    </div>
                  </div>

                  <center>
                    <Button
                      type="button"
                      className="buttonModify"
                      onClick={() => this.setModifica("modifica")}
                      style={{ marginRight: "10px", marginTop: "20px" }}
                      disabled={this.state.disabled}
                    >
                      Modifica
                    </Button>
                    <Button
                      type="button"
                      className="buttonAnnulla"
                      onClick={() => this.props.remove(this.props.id)}
                      style={{ marginRight: "10px", marginTop: "20px" }}
                    >
                      Elimina
                    </Button>
                  </center>
                  {this.state.disabled && (
                    <Alert style={{ marginTop: "20px" }} severity="warning">
                      Non puoi effettuare la consegna fuori stallo per questo
                      veicolo
                    </Alert>
                  )}
                </div>
              </div>
            </div>
            {this.state.modifica && (
              <center>
                <AvForm>
                  <Row>
                    <Col>
                      <Label sm={12}>Destinazione</Label>
                      <Input
                        type="select"
                        name="selectConsegna"
                        id="parcheggioConsegna"
                        onClick={this.handleChange("refParkingC")}
                      >
                        <option>Via Libertà</option>
                        <option>Via Roma</option>
                        <option>Via Ernesto Basile</option>
                        <option>Viale Regione</option>
                        <option>Via Tersicore</option>
                      </Input>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <center>
                        <div className="row ">
                          <div className="col">
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                              <Label sm={12} style={{ marginTop: "20px" }}>
                                Ritiro
                              </Label>
                              <DateTimePicker
                                format={"dd/MM/yyyy HH:mm"}
                                minDate={new Date()}
                                minTime={new Date()}
                                inputVariant="outlined"
                                value={this.state.dateR}
                                selected={this.state.dateR}
                                onChange={this.handleChangeDataPartenza}
                              />
                            </MuiPickersUtilsProvider>
                          </div>
                        </div>
                      </center>
                    </Col>
                    <Col>
                      <center>
                        <div className="row ">
                          <div className="col">
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                              <Label sm={12} style={{ marginTop: "20px" }}>
                                Consegna
                              </Label>
                              <DateTimePicker
                                format={"dd/MM/yyyy HH:mm"}
                                minDate={this.state.dateR}
                                maxDate={moment(this.state.dateR).add(
                                  7,
                                  "days"
                                )}
                                inputVariant="outlined"
                                value={this.state.dateC}
                                selected={this.state.dateC}
                                onChange={this.handleChangeDataArrivo}
                              />
                            </MuiPickersUtilsProvider>
                          </div>
                        </div>
                      </center>
                    </Col>
                  </Row>

                  {/* Pulsante modifica*/}

                  <Button
                    type="submit"
                    className="buttonModify"
                    onClick={() => this.modify()}
                    style={{
                      padding: "8px",
                      margin: "10px",
                      marginTop: "40px",
                      marginBottom: "20px",
                    }}
                  >
                    Modifica
                  </Button>

                  <Button
                    type="submit"
                    className="buttonAnnulla"
                    onClick={() => {
                      this.setting();
                      this.setModifica("modifica");
                    }}
                    style={{
                      padding: "8px",
                      margin: "10px",
                      marginTop: "40px",
                      marginBottom: "20px",
                    }}
                  >
                    Annulla
                  </Button>
                </AvForm>

                {this.state.errore && (
                  <Alert severity="error">
                    This is an error alert — check it out!
                  </Alert>
                )}
                {this.state.success && (
                  <Alert severity="success">
                    Modifica avvenuta correttamente
                  </Alert>
                )}
              </center>
            )}
          </center>
        </div>
      </div>
    );
  }
}
