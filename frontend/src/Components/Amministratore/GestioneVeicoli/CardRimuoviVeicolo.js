import React from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';

function CardRimuoviVeicolo(props) {
  return (
    <div className="card card-css">
      <center>
        <div className="row no-gutters">
          <div className="col-12">
            <div className="card-body">
              <h5 className="infoCard">id: {props.id}</h5>
              {props.category !== null  ? <h5 className="infoCard">Categoria: {props.category}</h5> : <> </>}
              <h5 className="infoCard">Parcheggio: {props.refParking} </h5>
              <h5 className="infoCard">State: {props.state} </h5>
              <button className="buttonRemove" onClick={() => { props.remove(props.id) }} style={{ textDecoration: "none" }}>Elimina</button>
            </div>
          </div>
        </div>
      </center>
    </div>
  );
};

export default CardRimuoviVeicolo;



