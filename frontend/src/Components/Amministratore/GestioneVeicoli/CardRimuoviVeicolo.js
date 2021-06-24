import React from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';

function CardRimuoviVeicolo(props) {
  return (
    <div className="card ">
      <center>
        <div className="row no-gutters">
          <div className="col">
            <div className="card-body">
              <h5>id: {props.id}</h5>
              {props.category !== null  ? <h5>Categoria: {props.category}</h5> : <> </>}
              <h5>Parcheggio: {props.refParking} </h5>
              <h5>State: {props.state} </h5>
              <button className="btn-lg btn-danger" onClick={() => { props.remove(props.id) }} style={{ textDecoration: "none" }}>Elimina</button>
            </div>
          </div>
        </div>
      </center>
    </div>
  );
};

export default CardRimuoviVeicolo;



/* <div className="card mb-3" >
    <div className="row no-gutters">
      <div className="col-md-4">
        <img src="https://dummyimage.com/380x380.png" className="card-img" alt="..." />
      </div>
      <div className="col-md-8">
        <div className="card-body">
          <h5 className="card-title">{props.title}</h5>
          <p className="card-text">{props.description}</p>
          <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
          <a href="#" className="btn-lg btn-danger" style={{ textDecoration: "none" }}>Elimina</a>
        </div>
      </div>
    </div>
  </div> */