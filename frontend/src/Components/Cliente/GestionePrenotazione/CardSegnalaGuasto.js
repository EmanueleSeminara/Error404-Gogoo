import React, { Component } from "react";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Label, Col, Input, FormGroup } from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";

export default class CardSegnalaGuasto extends Component {
  state = {
    guasto: false,
    mostra: false,
    position: "",
  };

  setting = () => {
    this.setState({ position: "" });
    this.setState({ mostra: false });
    if (this.props.state === "withdrawn") {
      this.setState({ guasto: true });
    } else {
      this.setState({ guasto: false });
    }
  };

  componentDidMount() {
    this.setting();
  }

  componentDidUpdate(propsPrecedenti) {
    if (this.props !== propsPrecedenti) {
      this.setting();
    }
  }

  setMostra = (input) => {
    this.setState({ mostra: !this.state[input] });
  };

  handleChange = (input) => (e) => {
    this.setState({ [input]: e.target.value });
  };

  onValidSubmit = (event) => {
    event.preventDefault();
    this.props.segnaleGuasto(
      this.props.id,
      this.state.position,
      this.props.refVehicle,
      this.props.category,
      this.props.type,
      this.props.refParkingC
    );
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
                        <strong>Tipo:</strong> {this.props.type}{" "}
                        {this.props.type === "car" ? (
                          <> {this.props.category}</>
                        ) : (
                          <></>
                        )}
                      </p>
                      {this.props.refParkingR != null && (
                        <p className="infoCard">
                          <strong>Parcheggio ritiro:</strong>{" "}
                          {this.props.refParkingR}
                        </p>
                      )}
                      {this.props.positionR != null && (
                        <p className="infoCard">
                          <strong>Posizione di ritiro:</strong>{" "}
                          {this.props.positionR}
                        </p>
                      )}
                      <p className="infoCard">
                        <strong>Data ritiro:</strong> {this.props.dateR}
                      </p>
                    </div>
                    <div className="col-md-6">
                      <p className="infoCard" style={{ visibility: (this.props.type === "car" ? "visible" : "hidden")}}>
                        <strong>Autista:</strong>{" "}
                        {this.props.refDriver != null ? (
                          <>{this.props.refDriver}</>
                        ) : (
                          <> no </>
                        )}{" "}
                      </p>
                      {this.props.refParkingC != null && (
                        <p className="infoCard">
                          <strong>Parcheggio consegna:</strong>{" "}
                          {this.props.refParkingC}
                        </p>
                      )}
                      {this.props.positionC != null && (
                        <p className="infoCard">
                          <strong>Posizione di consegna:</strong>{" "}
                          {this.props.positionC}
                        </p>
                      )}
                      <p className="infoCard">
                        <strong>Data consegna:</strong> {this.props.dateC}
                      </p>
                    </div>
                  </div>

                  <center>
                    <Button
                      type="button"
                      className="buttonGuasto"
                      onClick={() => this.setMostra("mostra")}
                      style={{ marginRight: "10px", marginTop: "20px" }}
                      size="lg"
                      disabled={!this.state.guasto}
                    >
                      Segnala Guasto
                    </Button>
                  </center>
                </div>
              </div>
            </div>
            {this.state.mostra && (
              <center>
                <AvForm onValidSubmit={this.onValidSubmit}>
                  <center>
                    <div className="row">
                      <div className="col-12 col-md-12">
                        <AvField
                          name="id"
                          type="text"
                          label="Via di riferimento"
                          placeholder={this.state.position}
                          onChange={this.handleChange("position")}
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
                  <Label for="exampleText">Motivo del guasto (opzionale)</Label>
                  <FormGroup row>
                    <Col>
                      <Input type="textarea" name="text" id="exampleText" />
                    </Col>
                  </FormGroup>

                  {/* Pulsante Conferma*/}

                  <Button
                    type="submit"
                    className="buttonModify"
                    style={{ padding: "8px", margin: "10px" }}
                    size="lg"
                  >
                    Conferma
                  </Button>
                  <Button
                    type="submit"
                    className="buttonAnnulla"
                    onClick={() => this.setMostra("mostra")}
                    style={{ padding: "8px", margin: "10px" }}
                    size="lg"
                  >
                    Annulla
                  </Button>
                </AvForm>
              </center>
            )}
          </center>
        </div>
      </div>
    );
  }
}
