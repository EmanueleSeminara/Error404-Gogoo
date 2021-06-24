import logo from './logo.svg';

import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Login from "../src/pages/Login";
import Registrazione from "../src/pages/Registrazione";
import RecuperoPassword from "../src/pages/RecuperoPassword";
import Ricerca from "../src/pages/Ricerca";
import PannelloAmministratore from "../src/pages/PannelloAmministratore";
import PannelloGestioneAccount from "../src/pages/PannelloGestioneAccount";
import PannelloGestionePrenotazione from '../src/pages/PannelloGestionePrenotazione';
import "bootstrap/dist/js/bootstrap.min.js";
import 'bootstrap/dist/css/bootstrap.min.css';



class App extends Component {
  render(){
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/ricerca" component={Ricerca} />
          <Route exact path="/registrazione" component={Registrazione} />
          <Route exact path="/recuperoPassword" component={RecuperoPassword} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/pannelloAmministratore" component={PannelloAmministratore} />
          <Route exact path="/pannelloGestioneAccount" component={PannelloGestioneAccount} />
          <Route exact path="/pannelloGestionePrenotazione" component={PannelloGestionePrenotazione} />
          {/* <Route path="/paintingInfo/:id" exact component={paintingInfo} /> */} 
        </Switch>
      </Router>
    );
  }
}

export default App;
