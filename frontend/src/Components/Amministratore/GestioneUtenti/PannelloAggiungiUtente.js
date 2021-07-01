import React, { Component } from "react";
import "../../../ComponentsCss/Pannel.css";
import { Button, ButtonGroup } from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { Alert } from "@material-ui/lab";
import Axios from "axios";
import NavbarDipendente from "../../../Components/NavbarDipendente";

export default class PannelloAggiugiUtente extends Component {
  state = {
    name: "",
    surname: "",
    email: "",
    birthdate: "",
    password: "",
    phone: "",
    role: "guest",
    error: false,
    success: false,
    string: "",
  };

  componentDidMount() {
    if (localStorage.getItem("utente") === null) {
      window.location.href = "/";
    } else {
      let c = JSON.parse(localStorage.getItem("utente"));
      if (c.role === "driver") {
        window.location.href = "/pannelloAutista";
      } else if (c.role === "guest") {
        window.location.href = "/ricerca";
      } else if (c.role === "valet") {
        window.location.href = "/pannelloParcheggiatore";
      }
    }
  }

  setRSelected = (type) => {
    this.setState({ role: type });
  };

  handleChange = (input) => (e) => {
    this.setState({ [input]: e.target.value });
  };

  register = () => {
    console.log(this.state);
    Axios.post("/api/admin/createuser", this.state)
      .then((res) => {
        this.setState({ error: false });
        this.setState({ success: true });
      })
      .catch((err) => {
        this.setState({ success: false });
        if (err.response.status === 513) {
          this.setState({ string: "email già associata ad un account" });
          this.setState({ error: true });
        } else if (err.response.status === 422) {
          this.setState({ string: "errore nell'inserimento dei dati" });
          this.setState({ error: true });
        } else if (err.response.status === 503) {
          console.log("inpossibile regitrarsi al momento");
          this.setState({
            string:
              "impossibile registrare un utente momento, riprova più tardi",
          });
          this.setState({ error: true });
        } else {
          window.location.href = "/errorServer";
        }
      });
  };

  onValidSubmit = (event) => {
    event.preventDefault();
    this.register();
  };

  isStrongPassword(value, ctx, input, cb) {
    if (!value || value === "") {
      cb(false);
      return;
    }

    if (
      value.match(/[$&+,:;=?@#|'<>.^*()%!-]+/) &&
      value.match(/[a-z]+/) &&
      value.match(/[A-Z]+/) &&
      value.match(/[0-9]+/)
    ) {
      cb(true);
      return;
    } else {
      cb(false);
      return;
    }
  }

  render() {
    let sixteenYearsAgo = new Date();
    sixteenYearsAgo.setFullYear(sixteenYearsAgo.getFullYear() - 16);
    sixteenYearsAgo = sixteenYearsAgo.toJSON().split("T")[0];

    return (
      <div className="ez sfondo" style={{ height: "100%" }}>
        <NavbarDipendente />
        <div className="row h-100 justify-content-md-center boxpannel">
          <div className="d-flex flex-column pannell-amministratore ">
            <center>
              <div className="title">Aggiungi utente</div>
            </center>
            <div className="col-9">
              <center>
                <ButtonGroup style={{ marginBottom: "20px", flexWrap: "wrap" }}>
                  <Button
                    className={
                      this.state.role === "guest"
                        ? "buttonCyanoGruoupSelected"
                        : "buttonCyanoGruoup"
                    }
                    onClick={() => {
                      this.setRSelected("guest");
                      this.setState({ error: false });
                      this.setState({ success: false });
                    }}
                    active={this.state.role === "guest"}
                  >
                    Cliente
                  </Button>
                  <Button
                    className={
                      this.state.role === "driver"
                        ? "buttonCyanoGruoupSelected"
                        : "buttonCyanoGruoup"
                    }
                    onClick={() => {
                      this.setRSelected("driver");
                      this.setState({ error: false });
                      this.setState({ success: false });
                    }}
                    active={this.state.role === "driver"}
                  >
                    Autista
                  </Button>
                  <Button
                    className={
                      this.state.role === "valet"
                        ? "buttonCyanoGruoupSelected"
                        : "buttonCyanoGruoup"
                    }
                    onClick={() => {
                      this.setRSelected("valet");
                      this.setState({ error: false });
                      this.setState({ success: false });
                    }}
                    active={this.state.role === "valet"}
                  >
                    Parcheggiatore
                  </Button>
                  <Button
                    className={
                      this.state.role === "admin"
                        ? "buttonCyanoGruoupSelected"
                        : "buttonCyanoGruoup"
                    }
                    onClick={() => {
                      this.setRSelected("admin");
                      this.setState({ error: false });
                      this.setState({ success: false });
                    }}
                    active={this.state.role === "admin"}
                  >
                    Amministratore
                  </Button>
                </ButtonGroup>
              </center>
              <AvForm onValidSubmit={this.onValidSubmit}>
                {/* Riga nome e cognome */}
                <div className="row">
                  <div className="col-12 col-md-6">
                    <AvField
                      name="nome"
                      type="text"
                      label="Nome"
                      onChange={this.handleChange("name")}
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
                      onChange={this.handleChange("surname")}
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
                {/* Riga data di nascita */}
                <div className="row">
                  <div className="col-12">
                    <AvField
                      name="dataNascita"
                      label="Data di nascita"
                      type="date"
                      max={sixteenYearsAgo}
                      onChange={this.handleChange("birthdate")}
                      errorMessage="Devi essere maggiorenne"
                      validate={{
                        required: {
                          value: true,
                          errorMessage: "Il campo è richiesto.",
                        },
                      }}
                    />
                  </div>
                </div>
                {/*Riga email */}
                <div className="row">
                  <div className="col-12">
                    <AvField
                      name="email"
                      label="Email"
                      type="email"
                      onChange={this.handleChange("email")}
                      errorMessage="Campo non valido."
                      required
                    />
                  </div>
                </div>
                {/* Riga password */}
                <div className="row">
                  <div className="col-12 ">
                    <AvField
                      name="password"
                      label="Password"
                      type="password"
                      validate={{
                        required: {
                          value: true,
                          errorMessage: "Il campo è richiesto",
                        },
                        minLength: {
                          value: 8,
                          errorMessage:
                            "La password deve contenere almeno 8 caratteri",
                        },
                        isStrong: this.isStrongPassword,
                      }}
                      errorMessage="La password deve contenere almeno una lettera minuscola, una lettere maiuscola, un numero e un carattere speciale"
                      onChange={this.handleChange("password")}
                    />
                  </div>
                </div>
                {/* Riga numero di telefono */}
                <div className="row">
                  <div className="col-12 ">
                    <AvField
                      name="telefono"
                      label="Numero di cellulare"
                      type="tel"
                      validate={{
                        required: {
                          value: true,
                          errorMessage: "Il campo è richiesto",
                        },
                        minLength: { value: 10 },
                        maxLength: { value: 10 },
                        tel: { pattern: /^((3[{1-9}][{0-9}]))([\d]{7})$/ },
                      }}
                      errorMessage="il numero di telefono non è valido"
                      onChange={this.handleChange("phone")}
                    />
                  </div>
                </div>
                {/* Pulsante aggiungi*/}
                <center>
                  <Button
                    align="center"
                    className="buttonCyano"
                    type="submit"
                    style={{ padding: "8px", marginTop: "30px" }}
                  >
                    aggiungi
                  </Button>
                  {this.state.error && (
                    <Alert severity="error">{this.state.string}</Alert>
                  )}
                  {this.state.success && (
                    <Alert severity="success">
                      Utente inserito correttamente
                    </Alert>
                  )}
                </center>
              </AvForm>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
