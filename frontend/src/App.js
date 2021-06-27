import logo from './logo.svg';

import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Login from "../src/pages/Login";
import Registrazione from "../src/pages/Registrazione";
import RecuperoPassword from "../src/pages/RecuperoPassword";
import Ricerca from "../src/Components/Ricerca/FormRicerca";
import PannelloAmministratore from "../src/Components/Amministratore/PannelloAmministratore";
import PannelloRiepilogoPrenotazione from '../src/Components/Prenotazione/PannelloRiepilogoPrenotazione'
import PannelloEliminaCarta from "../src/Components/Cliente/GestioneAccount/PannelloEliminaCarta";
import PannelloModifcaPassword from "../src/Components/Cliente/GestioneAccount/PannelloModifcaPassword";
import PannelloModificaDati from "../src/Components/Cliente/GestioneAccount/PannelloModificaDati";
import PannelloInserimentoPatente from "../src/Components/Cliente/GestioneAccount/PannelloInserimentoPatente";
import PannelloModifcaPatente from "../src/Components/Cliente/GestioneAccount/PannelloModifcaPatente";
import PannelloInserimentoCarta from "../src/Components/Cliente/GestioneAccount/PannelloInserimentoCarta";
import PannelloConsegnaFuoriStallo from "../src/Components/Cliente/GestionePrenotazione/PannelloConsegnaFuoriStallo";
import PannelloRitardoConsegna from "../src/Components/Cliente/GestionePrenotazione/PannelloRitardoConsegna";
import PannelloRitiraConsegna from "../src/Components/Cliente/GestionePrenotazione/PannelloRitiraConsegna";
import PannelloSegnalaGuasto from "../src/Components/Cliente/GestionePrenotazione/PannelloSegnalaGuasto";
import VisualizzaMiePrenotazioni from "../src/Components/Cliente/GestionePrenotazione/VisualizzaMiePrenotazioni";
import PannelloPagamento from '../src/Components/Pagamento/PannelloPagamento';
import PannelloParcheggiatore from '../src/Components/Parcheggiatore/PannelloParcheggiatore';
import PannelloAutista from '../src/Components/Autista/PannelloAutista';
import PannelloVisualizzaPrenotazioni from '../src/Components/Amministratore/GestionePrenotazioni/PannelloVisualizzaPrenotazioni';
import PannelloAggiungiUtente from '../src/Components/Amministratore/GestioneUtenti/PannelloAggiungiUtente';
import PannelloModificaUtente from '../src/Components/Amministratore/GestioneUtenti/PannelloModificaUtente';
import PannelloRimuoviUtente from '../src/Components/Amministratore/GestioneUtenti/PannelloRimuoviUtente';
import PannelloRimuoviVeicolo from '../src/Components/Amministratore/GestioneVeicoli/PannelloRimuoviVeicolo';
import PannelloAggiungiVeicolo from '../src/Components/Amministratore/GestioneVeicoli/PannelloAggiungiVeicolo';
import PannelloModificaVeicolo from '../src/Components/Amministratore/GestioneVeicoli/PannelloModificaVeicolo';

import "bootstrap/dist/js/bootstrap.min.js";
import 'bootstrap/dist/css/bootstrap.min.css';


class App extends Component {
  render(){
    return (
      <Router>
        <Switch>
          {/* Gestione accesso */}

          <Route exact path="/" component={Login} />
          <Route exact path="/registrazione" component={Registrazione} />
          <Route exact path="/recuperoPassword" component={RecuperoPassword} />
          <Route exact path="/login" component={Login} />
          {/* Gestione prenotazioni */}
          <Route exact path="/riepilogoPrenotazione" component={PannelloRiepilogoPrenotazione} />
          <Route exact path="/pagamento" component={PannelloPagamento} />
          {/* Gestione account cliente */}
          <Route exact path="/ricerca" component={Ricerca} />
          <Route exact path="/modificaPassword" component={PannelloModifcaPassword} />
          <Route exact path="/modificaDatiPersonali" component={PannelloModificaDati} />
          <Route exact path="/inserimentoPatente" component={PannelloInserimentoPatente} />
          <Route exact path="/aggiornaPatente" component={PannelloModifcaPatente} />
          <Route exact path="/inserimentoMetodoPagamento" component={PannelloInserimentoCarta} />
          <Route exact path="/eliminazioneMetodoPagamento" component={PannelloEliminaCarta} />
          {/* Gestione prenotazione cliente */}
          <Route exact path="/ritiroConsegna" component={PannelloRitiraConsegna} />
          <Route exact path="/prenotazioniEffettuate" component={VisualizzaMiePrenotazioni} />
          <Route exact path="/segnalaGuasto" component={PannelloSegnalaGuasto} />
          <Route exact path="/consegnaFuoriStallo" component={PannelloConsegnaFuoriStallo} />
          <Route exact path="/ritardoConsegna" component={PannelloRitardoConsegna} />
          {/* Pannello Parcheggiatore */}
          <Route exact path="/pannelloParcheggiatore" component={PannelloParcheggiatore} />
          {/* Pannello Autista */}
          <Route exact path="/pannelloAutista" component={PannelloAutista} />
          {/* Pannello Amministratore */}
          <Route exact path="/pannelloAmministratore" component={PannelloAmministratore} />
          <Route exact path="/visualizzaPrenotazioni" component={PannelloVisualizzaPrenotazioni} />
          <Route exact path="/aggiungiUtente" component={PannelloAggiungiUtente} />
          <Route exact path="/rimuoviUtente" component={PannelloRimuoviUtente} />
          <Route exact path="/modificaUtente" component={PannelloModificaUtente} />
          <Route exact path="/aggiungiVeicolo" component={PannelloAggiungiVeicolo} />
          <Route exact path="/rimuoviVeicolo" component={PannelloRimuoviVeicolo} />
          <Route exact path="/modificaVeicolo" component={PannelloModificaVeicolo} />
          {/* <Route path="/paintingInfo/:id" exact component={paintingInfo} /> */}
        </Switch>
      </Router>
    );
  }
}

export default App;
