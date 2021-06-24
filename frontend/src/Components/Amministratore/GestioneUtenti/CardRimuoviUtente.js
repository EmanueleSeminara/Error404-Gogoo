import React from 'react';

function CardRimuoviUtente(props) {
	//funzione rimuovi dal db

	
	return (
		<div className="card ">
			<center>
			<div className="row no-gutters">
				<div className="col">
					<div className="card-body">
						<h5>nome: {props.name}</h5>
						<h5>cognome: {props.surname} </h5>
						<h5>email: {props.email}</h5>
							<button className="btn-lg btn-danger" onClick={() => { props.remove(props.id) }} style={{ textDecoration: "none"}}>Elimina</button>
					</div>
				</div>
			</div>
			</center>
		</div>

		
	);
};

export default CardRimuoviUtente;