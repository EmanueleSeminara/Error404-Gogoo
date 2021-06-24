import React, { Component } from 'react';
import { Button, ListGroup, Jumbotron } from 'reactstrap';
import { AvForm, AvField } from "availity-reactstrap-validation"

export default class CardModificaUtente extends Component {

	state = {
		modifica: false,
		nome: this.props.nome,
		cognome: this.props.cognome,
		email: this.props.email,
		password: this.props.password,
		birthdate: this.props.birthdate,
		telefono: this.props.telefono,
	};

	setModifica = (bool) => {
		this.setState({ modifica: bool });
	}

	stampa = (state) => {
		console.log(state);
	}

	handleChange = (input) => (e) => {
		this.setState({ [input]: e.target.value });
	}

	render() {

		let eighteenYearsAgo = new Date();
		eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 16);
		eighteenYearsAgo = eighteenYearsAgo.toJSON().split("T")[0];


		return (
			<div>
				<div className="card mb-3" key={this.props.id}>
					<div className="row no-gutters">
						<div className="col-md-8">
							<div className="card-body"  >
								<h5>nome: {this.props.nome}</h5>
								<h5>cognome: {this.props.cognome} </h5>
								<h5>email: {this.props.email}</h5>
								<button className="btn-lg btn-primary" style={{ textDecoration: "none", marginTop: "20px" }} onClick={() => this.setModifica(true)}>Modifica</button>
							</div>
						</div>
					</div>
					{this.state.modifica &&
						<center>
							<ListGroup>
								<Jumbotron>
									<AvForm onValidSubmit={() => this.stampa(this.state)}>
										{/* Riga nome e cognome */}
										<div className="row">
											<div className="col-12 col-md-6">
												<AvField
													name="nome"
													type="text"
													label="Nome"
													placeholder={this.state.nome}
													onChange={this.handleChange("nome")}
													style={{ label: { color: "white" } }}
												/>
											</div>

											<div className="col-12 col-md-6">
												<AvField
													name="cognome"
													type="text"
													label="Cognome"
													placeholder={this.state.cognome}
													onChange={this.handleChange("cognome")}
												/>
											</div>
										</div>


										<br />
										<hr style={{ backgroundColor: "#3FD0CB" }} />

										{/* Riga eta di nascita */}
										<div className="row">
											<div className="col-12">
												<AvField
													name="dataNascita"
													label="Data di nascita"
													type="date"
													placeholder={this.state.birthdate}
													max={eighteenYearsAgo}
													onChange={this.handleChange("birthdate")}
													errorMessage="Devi essere maggiorenne"
												/>
											</div>
										</div>

										<br />
										<hr style={{ backgroundColor: "#3FD0CB" }} />

										{/*Riga email */}
										<div className="row">
											<div className="col-12">
												<AvField
													name="email"
													label="Email"
													type="email"
													placeholder={this.state.email}
													onChange={this.handleChange("email")}
													errorMessage="Campo non valido."
												/>
											</div>
										</div>

										<br />
										<hr style={{ backgroundColor: "#3FD0CB" }} />

										{/* Riga password */}
										<div className="row">
											<div className="col-12 ">
												<AvField
													name="password"
													label="Password"
													type="password"
													placeholder="***********"
													validate={{
														minLength: { value: 8 },
													}}
													errorMessage="La password deve contenere almeno 8 caratteri"
													onChange={this.handleChange("password")}
												/>
											</div>
										</div>

										<br />
										<hr style={{ backgroundColor: "#3FD0CB" }} />

										{/* Riga numero di telefono */}
										<div className="row">
											<div className="col-12 ">
												<AvField
													name="telefono"
													label="Numero di cellulare"
													type="tel"
													placeholder="numero"
													validate={{
														minLength: { value: 10 },
														maxLength: { value: 10 },
													}}
													errorMessage="il numero di telefono deve contenere 10 cifre"
													onChange={this.handleChange("telefono")}
												/>
											</div>
										</div>

										<hr style={{ backgroundColor: "#3FD0CB" }} />


										{/* Pulsante aggiungi*/}
										<Button color="outline-success" type="submit" style={{ padding: "8px", margin: "10px" }} size="lg">
											Modifica
										</Button>
										<Button color="outline-danger" onClick={() => this.setModifica(false)} style={{ padding: "8px", margin: "10px" }} size="lg">
											Annulla
										</Button>
									</AvForm>
								</Jumbotron>
							</ListGroup>
						</center>}
				</div>
			</div>
		);
	}
};

