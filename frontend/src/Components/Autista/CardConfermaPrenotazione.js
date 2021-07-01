import React, { Component } from "react";
import { Button } from "reactstrap";

export default class CardRitiraConfermaRifiutaPrenotazione extends Component {
  conferma = (cardID) => {
    console.log(this.state);
  };

  rifiuta = (cardID) => {
    console.log(this.state);
  };
  render() {
    return (
      <div className="card card-css-RC">
        <div className="row no-gutters">
          <div className="col">
            <div className="card-body">
              <div className="row no-gutters">
                <div className="col-md-12">
                  <p className="infoCard">
                    <strong>ID veicolo: {this.props.refVehicle}</strong>
                  </p>
                  <hr style={{ backgroundColor: "white" }} />
                </div>
              </div>
              <div className="row no-gutters">
                <div className="col-md-6">
                  <p className="infoCard">
                    <strong>Tipo:</strong> {this.props.type}{" "}
                    {this.props.category}
                  </p>
                  <p className="infoCard">
                    <strong>Posizione di ritiro:</strong> {this.props.positionR}
                  </p>
                  <p className="infoCard">
                    <strong>Data ritiro:</strong> {this.props.dateR}
                  </p>
                </div>
                <div className="col-md-6">
                  <p className="infoCard">
                    <strong>Cliente:</strong> {this.props.name}{" "}
                    {this.props.surname}
                  </p>
                  <p className="infoCard">
                    <strong>Posizione di consegna:</strong>{" "}
                    {this.props.positionC}
                  </p>
                  <p className="infoCard">
                    <strong>Data consegna:</strong> {this.props.dateC}
                  </p>
                </div>
              </div>
              <div
                className="row"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div style={{ padding: "20px" }}>
                  <Button
                    outline
                    className="buttonVerde"
                    onClick={() => this.props.conferma(this.props.id)}
                  >
                    Conferma
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
