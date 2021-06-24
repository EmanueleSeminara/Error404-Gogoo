# Gogoo
Progetto per Programmazione web e mobile e Ingegneria del software (a.a. 2020/2021)

## Tema di Progetto 
Si richiede la progettazione di un sistema per il supporto alle attività di gestione e prenotazione di veivoli.

### Descrizione generale del sistema
Si richiede la progettazione di un software per il supporto ad un servizio di noleggio auto/moto/bici/monopattino on-demand. Le specifiche di seguito espresse sono da considerarsi come minime per la tesina in oggetto e possono essere estese dallo studente qualora questo non violi la natura e l’intento del software richiesto. Lo studente, durante la stesura del progetto, deve dimostrare capacità di interazione con il committente e con i membri del suo gruppo al fine di estendere o integrare, se necessario, le specifiche riportate di seguito.

Descrizione generale del sistema
Si richiede di progettare e sviluppare un software di gestione di un servizio di noleggio mezzi on-demand. I mezzi a disposizione sono autovetture, moto, biciclette e monopattini. Il noleggio auto può anche prevedere un autista. Per la prenotazione del mezzo il cliente deve comunicare i propri dati personali, il giorno e l’ora del noleggio ed il luogo dove il mezzo verrà rilasciato e per l’auto con autista è anche necessario indicare la destinazione. Per il ritiro dei mezzi si usufruirà di parcheggi o stalli appositi. Il cliente (o un eventuale addetto alla consegna mezzi) comunicherà al sistema l’avvenuta consegna o l’avvenuto rilascio. Il mezzo può essere ritirato/lasciato, su richiesta, in punti diversi da stalli o parcheggi. Nel proporre i mezzi ai clienti il software dovrà tenere conto della possibilità di offrire un mezzo fuori stallo nell’ottica di agevolare il più possibile il cliente. (Facoltativo: il software può suggerire al cliente la posizione più vicina alla sua destinazione finale dove lasciare il mezzo).
Il cliente deve comunicare per tempo qualsiasi cambiamento nella destinazione finale e può scegliere il tipo di veicolo.
Per il pagamento deve essere prevista un calcolo della tariffa in funzione del percorso, del tempo di utilizzo e del tipo di veicolo ed il pagamento deve essere effettuato (mancia compresa per l’autista, volontaria) all’atto della prenotazione.
Il sistema deve notificare al cliente ed all’amministratore dell’azienda di noleggio qualunque ritardo nelle consegne. Il cliente, che potrà effettuare una prenotazione solo dopo aver dichiarato di possedere un dispositivo portatile*, riceverà un alert nel caso in cui egli sia in ritardo con la consegna del mezzo ed in questo caso dovrà giustificarne il motivo (traffico, guasto, ….) fornendo anche uno stimato alla consegna. Nel caso di ritardo il cliente, per non incorrere in sovrapprezzo, potrà riconsegnare il mezzo in un posto diverso da quello pattuito in precedenza. Eventuali sovrapprezzi o penali per mancata riconsegna verranno addebitati direttamente sulla carta del cliente.
  
Si ricorda che da specifiche NON è richiesta un’applicazione web o una particolare architettura, gli studenti dovranno condurre la fase di analisi senza far riferimento ad una particolare architettura né ipotizzare soluzioni specifiche. Soltanto nella seconda fase della progettazione e soprattutto per gli studenti che sosterranno anche la prova di Programmazione Web e Mobile sarà possibile optare per una scelta implementativa tipo piattaforma web.


Nota: il pagamento non va implementato ma solo progettato


## Cosa è stato realizzato
- Servizi offerti a tutti gli utenti
  - Autenticazione e Registrazione: Funzionalità che permette agli utenti di creare il proprio account e autenticarsi. Ciò è necessario per accedere alle funzionalità principali del sistema (Ricercare un veicolo disponibile, effettuare una prenotazione)
  - Modifica dei dati personali: Attività di aggiornamento e/o inserimento delle informazioni relative all’utente che ha effettuato l’accesso.
- Servizi offerti ai Clienti
  - Inserimento e rimozione dei metodi di pagamento: Il sistema permette all’utente che ha effettuato l’accesso di memorizzare uno o più metodi di pagamenti per poterli poi utilizzare rapidamente quando necessario. L'utente può rimuovere il metodo di pagamento precedentemente inserito.
- Servizi offerti agli Amministratori
- Servizi offerti agli Autisti
- Servizi offerti ai Posteggiatori
  


## Strumenti utilizzati
Per la realizzazione di questa applicazione web è stato scelto di utilizzare come gestore di pacchetti JavaScript NPM.
Si è deciso di utilizzare il framework ExpressJS e la libreria di JavaScript ReactJS poiché entrambi semplificano lo sviluppo di applicazioni web e mobile.
Per la realizzazione delle interfacce grafiche, si è scelto di utilizzare il framework reactstrap. 
Per gestire le richieste HTTP POST e GET tra client e server, si è utilizzata la libreria “axios”.
SQLite, Express, React, NodeJS

## Più informazioni dai documenti
- RAD (Requirements Analysis Document) 
- ODD (Object Design Document)
- SDD (System Design Document)

## Come avviare Gogoo

