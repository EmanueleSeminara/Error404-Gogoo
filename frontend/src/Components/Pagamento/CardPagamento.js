import React from 'react';


function CardSelezionaCarta(props) {
	//funzione rimuovi dal db


	return (
		<div className="card ">
			<center>
				<div className="row no-gutters">
					<div className="col">
						<div className="card-body">
							<h5><font color="grey">Intestatario: {props.name} {props.surname} </font></h5>
							<h5><font color="grey">numero carta: {props.number.replace(/\b(?:\d{4}[ -]?){3}(?=\d{4}\b)/gm, "**** **** **** ")}</font></h5>
							<button className="btn-lg btn-success" onClick={() => { props.seleziona(props.id) }} style={{ textDecoration: "none" }}>Seleziona</button>
						</div>
					</div>
				</div>
			</center>
		</div>


	);
};

export default CardSelezionaCarta;