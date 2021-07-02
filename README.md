# dropcar

Progetto per Programmazione web e mobile e Ingegneria del software (a.a. 2020/2021)

## Tema di Progetto

Si richiede la progettazione di un software per il supporto ad un servizio di noleggio auto/moto/bici/monopattino on-demand. Le specifiche di seguito espresse sono da considerarsi come minime per la tesina in oggetto e possono essere estese dallo studente qualora questo non violi la natura e l’intento del software richiesto. Lo studente, durante la stesura del progetto, deve dimostrare capacità di interazione con il committente e con i membri del suo gruppo al fine di estendere o integrare, se necessario, le specifiche riportate di seguito.

### Descrizione generale del sistema

Descrizione generale del sistema  
Si richiede di progettare e sviluppare un software di gestione di un servizio di noleggio mezzi on-demand. I mezzi a disposizione sono autovetture, moto, biciclette e monopattini. Il noleggio auto può anche prevedere un autista. Per la prenotazione del mezzo il cliente deve comunicare i propri dati personali, il giorno e l’ora del noleggio ed il luogo dove il mezzo verrà rilasciato e per l’auto con autista è anche necessario indicare la destinazione. Per il ritiro dei mezzi si usufruirà di parcheggi o stalli appositi. Il cliente (o un eventuale addetto alla consegna mezzi) comunicherà al sistema l’avvenuta consegna o l’avvenuto rilascio. Il mezzo può essere ritirato/lasciato, su richiesta, in punti diversi da stalli o parcheggi. Nel proporre i mezzi ai clienti il software dovrà tenere conto della possibilità di offrire un mezzo fuori stallo nell’ottica di agevolare il più possibile il cliente. (Facoltativo: il software può suggerire al cliente la posizione più vicina alla sua destinazione finale dove lasciare il mezzo).  
Il cliente deve comunicare per tempo qualsiasi cambiamento nella destinazione finale e può scegliere il tipo di veicolo.
Per il pagamento deve essere prevista un calcolo della tariffa in funzione del percorso, del tempo di utilizzo e del tipo di veicolo ed il pagamento deve essere effettuato (mancia compresa per l’autista, volontaria) all’atto della prenotazione.
Il sistema deve notificare al cliente ed all’amministratore dell’azienda di noleggio qualunque ritardo nelle consegne. Il cliente, che potrà effettuare una prenotazione solo dopo aver dichiarato di possedere un dispositivo portatile\*, riceverà un alert nel caso in cui egli sia in ritardo con la consegna del mezzo ed in questo caso dovrà giustificarne il motivo (traffico, guasto, ….) fornendo anche uno stimato alla consegna. Nel caso di ritardo il cliente, per non incorrere in sovrapprezzo, potrà riconsegnare il mezzo in un posto diverso da quello pattuito in precedenza. Eventuali sovrapprezzi o penali per mancata riconsegna verranno addebitati direttamente sulla carta del cliente.

Si ricorda che da specifiche NON è richiesta un’applicazione web o una particolare architettura, gli studenti dovranno condurre la fase di analisi senza far riferimento ad una particolare architettura né ipotizzare soluzioni specifiche. Soltanto nella seconda fase della progettazione e soprattutto per gli studenti che sosterranno anche la prova di Programmazione Web e Mobile sarà possibile optare per una scelta implementativa tipo piattaforma web.

Nota: il pagamento non va implementato ma solo progettato

## Cosa è stato realizzato

- Servizi offerti a tutti gli utenti
  - Autenticazione e Registrazione: Funzionalità che permette agli utenti di creare il proprio account e autenticarsi. Ciò è necessario per accedere alle funzionalità principali del sistema (Ricercare un veicolo disponibile, effettuare una prenotazione)
  - Modifica dei dati personali: Attività di aggiornamento e/o inserimento delle informazioni relative all’utente che ha effettuato l’accesso.
- Servizi offerti ai Clienti
  - Inserimento e rimozione dei metodi di pagamento: Il sistema permette al cliente che ha effettuato l’accesso di memorizzare uno o più metodi di pagamenti per poterli poi utilizzare rapidamente quando necessario. Il cliente può rimuovere il metodo di pagamento precedentemente inserito.
  - Inserimento e aggiornamento della patente di guida: Il sistema permette al cliente che ha effettuato l'accesso di memorizzare una patente per verificare che sia abilitato alla guida del mezzo che desidera prenotare. Il cliente può aggiornare la patente precedentemente inserita.
  - Ricerca dei veicoli: Il cliente ha la possibilità di eseguire una ricerca tra tutti i veicoli registrati, visualizzando solo quelli che rispondono alle sue esigenze.
  - Modifica della prenotazione: Il cliente può, nella propria area personale, accedere alle proprie prenotazioni e modificarne alcune delle informazioni precedentemente inserite.
  - Ritiro e consegna: Il cliente, nella propria area personale, ha la possibilità di effettuare il ritiro del veicolo precedentemente prenotato. Il cliente, al termine della prenotazione, ha la possibilità di effettuare la consegna del veicolo precedentemente prenotato.
  - Consegna fuori dallo stallo: Il cliente, qualora lo desideri, ha la possibilità di consegnare il veicolo precedentemente prenotato nel luogo che preferisce.
  - Segnala guasto: Il cliente, qualora dovesse verificarsi un mal funzionamento del mezzo prenotato, può segnalarlo nella propria area personale.
  - Ritardo consegna: Il cliente, qualora dovesse superare la data e l'ora stabilita nella prenotazione per la consegna, può notificare un nuovo orario o un nuovo luogo di consegna nella propria area personale.
- Servizi offerti agli Amministratori
  - Aggiungi veicolo: L'amministratore, nella propria area personale, ha la possiblità di aggiungere un nuovo veicolo a quelli registrati.
  - Rimuovi veicolo: L'amministratore, nella propria area personale, ha la possibilità di rimuovere un veicolo tra quelli precedentemente registrati.
  - Modifica stato veicolo: L'amministratore, nella propria area personale, ha la possibilità di modificare lo stato di un veicolo tra quelli precedentemente registrati.
  - Prenotazioni effetuate: L'amministratore, nella propria area personale, ha la possibilità di cercare le prenotazioni effettuate dai clienti inserendo l'email del cliente desiderato.
  - Aggiungi utente: L'amministratore, nella propria area personale, ha la possbilità di aggiungere un nuovo utente alla piattaforma.
  - Rimuovi utente: L'amministratore, nella propria area personale, ha la possiblità di rimuovere un utente dalla piattaforma.
  - Modifica dati utente: L'amministratore, nella propria area personale, ha la possiblità di modificare i dati di un utente della piattaforma.
- Servizi offerti agli Autisti
  - Conferma prenotazione: L'autista, nella propria area personale, ha la possibilità di prendere in carico una nuova prenotazione che richiede un autista.
  - Visualizza prenotazioni: L'autista, nella propria area personale, ha la possibilità di visualizzare tutte le prenotazioni prese in carico.
  - Ritiro e consegna: L'autista, nella propria area personale, ha la possibilità di effettuare il ritiro del veicolo precedentemente prenotato da un cliente che ha richiesto un autista. Al termine della prenotazione, ha la possibilità di effettuare la consegna del veicolo precedentemente prelevato.
- Servizi offerti ai Parcheggiatori
  - Veicoli nel parcheggio: Il parcheggiatore, nella propria area personale, può visualizzare tutti i veicoli presenti nel suo parcheggio che hanno una prenotazione.
  - Veicoli che arriveranno al parcheggio: Il parcheggiatore, nella propria area personale, può visualizzare tutti i veicoli che verranno consegnati dai clienti nel suo parcheggio.
  - Ritiro e consegna: Il parcheggiatore, nella propria area personale, ha la possibilità di effettuare il ritiro del veicolo precedentemente prenotato da un cliente. Al termine della prenotazione, ha la possibilità di effettuare la consegna del veicolo precedentemente prelevato.

## Strumenti utilizzati

Per la realizzazione di questa applicazione web è stato scelto di utilizzare come gestore di pacchetti JavaScript NPM.
Si è deciso di utilizzare il framework ExpressJS e la libreria di JavaScript ReactJS poiché entrambi semplificano lo sviluppo di applicazioni web e mobile.  
Per la realizzazione delle interfacce grafiche, si è scelto di utilizzare il framework reactstrap.
Per gestire le richieste HTTP POST e GET tra client e server, si è utilizzata la libreria “axios”, SQLite, Express, React, NodeJS.

## Come avviare dropcar

Aprire un terminale nella directory in cui si vuole installare dropcar ed eseguire i seguenti comandi

```
git clone https://github.com/EmanueleSeminara/Error404-dropcar
```

Configurazione Backend:

```
cd backend
npm install
```

Creare un file chiamato .env e inserirlo nella cartella backend con i seguenti dati

```
MAIL_USER=yourEmail@gmail.com
MAIL_PASSWORD=emailPassword
SESSION_SECRET=a secret sentence not to share with anybody and anywhere, used to sign the session ID cookie
GOOGLE_KEY=your API key for Distance Matrix API (Google)
```

Eseguire il backend con il seguente comando:

```
npm start
```

Configurazione Frontend:

```
cd .. //se vi trovate nella cartella backend
cd frontend
npm install
npm start
```

Alla fine del caricamento andare su http://localhost:3000/

## Organizzazione del codice

All'interno del download troverai la cartella backend organizzata in questa maniera:

```
./backend/
├── app.js
├── db
│   ├── db.js
│   └── dropcar.sqlite
├── .gitignore
├── middleware
│   ├── isAdmin.js
│   ├── isDriver.js
│   ├── isGuest.js
│   ├── isLoggedIn.js
│   └── isValet.js
├── models
│   ├── adminManagement.js
│   ├── distance.js
│   ├── driverManagement.js
│   ├── guestManagement.js
│   ├── mail.js
│   ├── passport-config.js
│   ├── reservationManagement.js
│   ├── searchManagement.js
│   ├── userManagement.js
│   ├── valetManagement.js
│   └── vehicleManagement.js
├── package.json
├── package-lock.json
└── routes
    ├── admin.js
    ├── driver.js
    ├── guest.js
    ├── reservation.js
    ├── search.js
    ├── user.js
    ├── valet.js
    └── vehicle.js
```

All'interno del download troverai la cartella frontend organizzata in questa maniera:

```
./frontend/
├── package.json
├── package-lock.json
├── public
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
└── src
    ├── App.css
    ├── App.js
    ├── App.test.js
    ├── Components
    │   ├── Amministratore
    │   │   ├── GestionePrenotazioni
    │   │   │   ├── CardPrenotazione.js
    │   │   │   └── PannelloVisualizzaPrenotazioni.js
    │   │   ├── GestioneUtenti
    │   │   │   ├── CardModificaUtente.js
    │   │   │   ├── CardRimuoviUtente.js
    │   │   │   ├── PannelloAggiungiUtente.js
    │   │   │   ├── PannelloModificaUtente.js
    │   │   │   └── PannelloRimuoviUtente.js
    │   │   ├── GestioneVeicoli
    │   │   │   ├── CardModificaVeicolo.js
    │   │   │   ├── CardRimuoviVeicolo.js
    │   │   │   ├── PannelloAggiungiVeicolo.js
    │   │   │   ├── PannelloModificaVeicolo.js
    │   │   │   └── PannelloRimuoviVeicolo.js
    │   │   └── PannelloAmministratore.js
    │   ├── Autista
    │   │   ├── CardConfermaPrenotazione.js
    │   │   ├── CardRitiraConsegnaAutista.js
    │   │   ├── PannelloAutista.js
    │   │   ├── PannelloConfermaPrenotazione.js
    │   │   └── PannelloRitiraConsegnaAutista.js
    │   ├── Cliente
    │   │   ├── GestioneAccount
    │   │   │   ├── CardEliminaCarta.js
    │   │   │   ├── PannelloEliminaCarta.js
    │   │   │   ├── PannelloInserimentoCarta.js
    │   │   │   ├── PannelloInserimentoPatente.js
    │   │   │   ├── PannelloModifcaPassword.js
    │   │   │   ├── PannelloModifcaPatente.js
    │   │   │   └── PannelloModificaDati.js
    │   │   ├── GestionePrenotazione
    │   │   │   ├── CardConsegnaFuoriStallo.js
    │   │   │   ├── CardPrenotazione.js
    │   │   │   ├── CardRitardoConsegna.js
    │   │   │   ├── CardRitiroConsegna.js
    │   │   │   ├── CardSegnalaGuasto.js
    │   │   │   ├── PannelloConsegnaFuoriStallo.js
    │   │   │   ├── PannelloRiepilogoPrenotazione.js
    │   │   │   ├── PannelloRitardoConsegna.js
    │   │   │   ├── PannelloRitiraConsegna.js
    │   │   │   ├── PannelloSegnalaGuasto.js
    │   │   │   └── VisualizzaMiePrenotazioni.js
    │   │   └── Noleggio
    │   ├── Footer.js
    │   ├── NavbarCliente.js
    │   ├── NavbarDipendente.js
    │   ├── Navbar.js
    │   ├── Pagamento
    │   │   ├── CardPagamento.js
    │   │   ├── PagamentoPDF.js
    │   │   └── PannelloPagamento.js
    │   ├── Parcheggiatore
    │   │   ├── CardConsegna.js
    │   │   ├── CardRitiro.js
    │   │   ├── PannelloConsegna.js
    │   │   ├── PannelloParcheggiatore.js
    │   │   └── PannelloRitiro.js
    │   └── Ricerca
    │       ├── CardPrenotaVeicolo.js
    │       ├── FormRicerca.js
    │       ├── RicercaConAutista.js
    │       ├── RicercaFuoriStallo.js
    │       └── RicercaVeicoli.js
    ├── ComponentsCss
    │   ├── CardModificaVeicolo.css
    │   ├── Footer.css
    │   ├── GestionePrenotazione.css
    │   ├── Login.css
    │   ├── main.css
    │   ├── ModificaPassword.css
    │   ├── Navbar.css
    │   ├── Pannel.css
    │   ├── PannellDipendente.css
    │   ├── PannelloAmministratore.css
    │   ├── PannelloEliminaCarta.css
    │   ├── PannelloGestioneAdmin.css
    │   ├── PannelloInserimentoPatente.css
    │   ├── RecuperoPassword.css
    │   ├── Registrazione.css
    │   ├── Ricerca.css
    │   ├── util.css
    │   └── visualizzaPrenotazioni.css
    ├── fonts
    │   ├── font-awesome-4.7.0
    │   │   ├── css
    │   │   │   ├── font-awesome.css
    │   │   │   └── font-awesome.min.css
    │   │   ├── fonts
    │   │   │   ├── FontAwesome.otf
    │   │   │   ├── fontawesome-webfont.eot
    │   │   │   ├── fontawesome-webfont.svg
    │   │   │   ├── fontawesome-webfont.ttf
    │   │   │   ├── fontawesome-webfont.woff
    │   │   │   └── fontawesome-webfont.woff2
    │   │   ├── HELP-US-OUT.txt
    │   │   ├── less
    │   │   │   ├── animated.less
    │   │   │   ├── bordered-pulled.less
    │   │   │   ├── core.less
    │   │   │   ├── fixed-width.less
    │   │   │   ├── font-awesome.less
    │   │   │   ├── icons.less
    │   │   │   ├── larger.less
    │   │   │   ├── list.less
    │   │   │   ├── mixins.less
    │   │   │   ├── path.less
    │   │   │   ├── rotated-flipped.less
    │   │   │   ├── screen-reader.less
    │   │   │   ├── stacked.less
    │   │   │   └── variables.less
    │   │   └── scss
    │   │       ├── _animated.scss
    │   │       ├── _bordered-pulled.scss
    │   │       ├── _core.scss
    │   │       ├── _fixed-width.scss
    │   │       ├── font-awesome.scss
    │   │       ├── _icons.scss
    │   │       ├── _larger.scss
    │   │       ├── _list.scss
    │   │       ├── _mixins.scss
    │   │       ├── _path.scss
    │   │       ├── _rotated-flipped.scss
    │   │       ├── _screen-reader.scss
    │   │       ├── _stacked.scss
    │   │       └── _variables.scss
    │   ├── montserrat
    │   │   ├── Montserrat-BlackItalic.ttf
    │   │   ├── Montserrat-Black.ttf
    │   │   ├── Montserrat-BoldItalic.ttf
    │   │   ├── Montserrat-Bold.ttf
    │   │   ├── Montserrat-ExtraBoldItalic.ttf
    │   │   ├── Montserrat-ExtraBold.ttf
    │   │   ├── Montserrat-ExtraLightItalic.ttf
    │   │   ├── Montserrat-ExtraLight.ttf
    │   │   ├── Montserrat-Italic.ttf
    │   │   ├── Montserrat-LightItalic.ttf
    │   │   ├── Montserrat-Light.ttf
    │   │   ├── Montserrat-MediumItalic.ttf
    │   │   ├── Montserrat-Medium.ttf
    │   │   ├── Montserrat-Regular.ttf
    │   │   ├── Montserrat-SemiBoldItalic.ttf
    │   │   ├── Montserrat-SemiBold.ttf
    │   │   ├── Montserrat-ThinItalic.ttf
    │   │   ├── Montserrat-Thin.ttf
    │   │   └── OFL.txt
    │   └── poppins
    │       ├── Poppins-BlackItalic.ttf
    │       ├── Poppins-Black.ttf
    │       ├── Poppins-BoldItalic.ttf
    │       ├── Poppins-Bold.ttf
    │       ├── Poppins-ExtraBoldItalic.ttf
    │       ├── Poppins-ExtraBold.ttf
    │       ├── Poppins-ExtraLightItalic.ttf
    │       ├── Poppins-ExtraLight.ttf
    │       ├── Poppins-Italic.ttf
    │       ├── Poppins-LightItalic.ttf
    │       ├── Poppins-Light.ttf
    │       ├── Poppins-MediumItalic.ttf
    │       ├── Poppins-Medium.ttf
    │       ├── Poppins-Regular.ttf
    │       ├── Poppins-SemiBoldItalic.ttf
    │       ├── Poppins-SemiBold.ttf
    │       ├── Poppins-ThinItalic.ttf
    │       └── Poppins-Thin.ttf
    ├── images
    │   ├── cane.png
    │   ├── icons
    │   │   └── favicon.ico
    │   ├── img-01.png
    │   ├── logo.svg
    │   ├── logo_testo.svg
    │   ├── logo_testo_.svg
    │   ├── serverError.png
    │   ├── sfondoLogin-.svg
    │   ├── sfondoLogin.svg
    │   └── svgAmministratore
    │       ├── AggiungiUtente.svg
    │       ├── AggiungiVeicolo.svg
    │       ├── Logout.svg
    │       ├── ModificaDatiUtente.svg
    │       ├── ModificaStatoVeicolo.svg
    │       ├── PrenotazioniEffettuate.svg
    │       ├── RimuoviUtente.svg
    │       ├── RimuoviVeicolo.svg
    │       ├── sfondoAdmin-.svg
    │       └── sfondoAdmin.svg
    ├── index.css
    ├── index.js
    ├── logo.svg
    ├── pages
    │   ├── 404.js
    │   ├── Errorpage.js
    │   ├── Login.js
    │   ├── RecuperoPassword.js
    │   └── Registrazione.js
    ├── reportWebVitals.js
    └── setupTests.js
```
