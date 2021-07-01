import React from 'react';

function CardRimuoviUtente(props) {
	
	return (
		<div className="card card-css">
			<center>
			<div className="row no-gutters">
				<div className="col-12">
					<div className="card-body">
						<h5 className="infoCard">nome: {props.name}</h5>
						<h5 className="infoCard">cognome: {props.surname} </h5>
						<h5 className="infoCard">email: {props.email}</h5>
							<button className="buttonRemove" onClick={() => { props.remove(props.id) }} style={{ textDecoration: "none"}}>Elimina</button>
					</div>
				</div>
			</div>
			</center>
		</div>

		
	);
};

export default CardRimuoviUtente;