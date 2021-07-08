import React, { Component } from "react";
import DateFnsUtils from "@date-io/date-fns";
import "../../ComponentsCss/Pannel.css";
import * as moment from "moment";
import { Alert } from "@material-ui/lab";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { Button, Label } from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
import CardPrenotaVeicolo from "./CardPrenotaVeicolo";
import Axios from "axios";

export default class RicercaFuoriStallo extends Component {
  state = {
    list: [],
    refParkingC: "Via Libertà",
    dateR: moment(new Date()).format("YYYY-MM-DD HH:mm"),
    dateC: moment(new Date()).format("YYYY-MM-DD HH:mm"),
    start: "",
    cerca: false,
    errorList: false,
    errorPayment: false,
  };

  handleChange = (input) => (e) => {
    this.setState({ [input]: e.target.value });
  };

  handleChangeDataArrivo = (date) => {
    const d = moment(date).format("YYYY-MM-DD HH:mm");
    this.setState({ dateC: d });
  };

  handleChangeDataPartenza = (date) => {
    const d = moment(date).format("YYYY-MM-DD HH:mm");
    this.setState({ dateR: d });
  };

  search = () => {
    Axios.get(
      "/api/search/vehiclesoutofstall?dateR=" +
        this.state.dateR +
        "&dateC=" +
        this.state.dateC +
        "&start=" +
        this.state.start
    )
      .then((res) => {
        if (res.data.length !== 0) {
          this.setState({ list: res.data });
          this.setState({ cerca: true });
        } else {
          this.setState({ errorList: true });
        }
      })
      .catch((err) => {
        window.location.href = "/errosServer";
      });
  };

  onValidSubmit = (event) => {
    event.preventDefault();
    if (
      moment(this.state.dateR).add(15, "minutes") > moment(this.state.dateC)
    ) {
      this.setState({ errorTime: true });
      this.setState({ list: [] });
    } else {
      this.setState({ errorTime: false });
      let payment = false;
      Axios.get("/api/guest/listpayments")
        .then((res) => {
          if (res.data.length !== 0) {
            payment = true;
          }

          if (payment) {
            this.search();
            console.log(this.state);
            const reservation = {
              refVehicle: null,
              type: "car",
              refParkingR: null,
              refParkingC: this.state.refParkingC,
              dateR: this.state.dateR,
              dateC: this.state.dateC,
              category: null,
              positionR: this.state.start,
              positionC: null,
              refDriver: null,
            };
            window.localStorage.setItem(
              "reservation",
              JSON.stringify(reservation)
            );
          } else {
            this.setState({ errorPayment: true });
          }
        })
        .catch((err) => {
          window.location.href = "/errorServer";
        });
    }
  };

  render() {
    return (
      <div>
        {this.state.errorPayment && (
          <Alert severity="error">Non hai un metodo di pagamento</Alert>
        )}
        {this.state.errorList && (
          <Alert severity="error">Non ci sono veicoli</Alert>
        )}
        <AvForm onValidSubmit={this.onValidSubmit}>
          <div style={{ paddingBottom: "20px" }}>
            <AvField
              name="Partenza"
              type="text"
              label="Dove ti trovi?"
              placeholder="inserisci la via in cui ti trovi"
              onChange={this.handleChange("start")}
              errorMessage="Non sembra tu abbia inserito una via"
              validate={{
                required: {
                  value: true,
                  errorMessage: "Il campo è richiesto",
                },
              }}
              required
            />
          </div>

          <div style={{ paddingBottom: "30px" }}>
            <AvField
              type="select"
              name="parcheggioConsegna"
              label="Consegna"
              onClick={this.handleChange("refParkingC")}
            >
              <option>Via Libertà</option>
              <option>Via Roma</option>
              <option>Via Ernesto Basile</option>
              <option>Viale Regione</option>
              <option>Via Tersicore</option>
            </AvField>
          </div>

          <center>
            <div className="row " style={{ paddingBottom: "20px" }}>
              <div className="col">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Label sm={12}>Ritiro</Label>
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
              <div className="col">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Label sm={12}>Consegna</Label>
                  <DateTimePicker
                    format={"dd/MM/yyyy HH:mm"}
                    minDate={this.state.dateR}
                    maxDate={moment(this.state.dateR).add(7, "days")}
                    inputVariant="outlined"
                    value={this.state.dateC}
                    selected={this.state.dateC}
                    onChange={this.handleChangeDataArrivo}
                  />
                </MuiPickersUtilsProvider>
              </div>
            </div>
            {this.state.errorTime && (
              <h6 style={{ color: "#ef462c" }}>
                Prenotazione minima consentita 15 minuti{" "}
              </h6>
            )}

            <div style={{ paddingBottom: "20px" }}>
              <Button className="buttonCyano" type="submit" size="lg">
                CERCA
              </Button>
            </div>
          </center>
        </AvForm>

        {
          <div>
            {this.state.cerca &&
              this.state.list.map((item) => (
                <div className="p-3 ">
                <CardPrenotaVeicolo
                  id={item.id}
                  type={item.type}
                  category={item.category}
                  positionR={item.positionR}
                  distance={item.distance}
                  duration={item.duration}
                  position={item.position}
                />
                </div>
              ))}
          </div>
        }
      </div>
    );
  }
}
