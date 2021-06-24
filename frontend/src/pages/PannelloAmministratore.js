import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PannelloAggiugiVeicolo from "../Components/Amministratore/GestioneVeicoli/PannelloAggiungiVeicolo";
import PannelloRimuoviVeicolo from "../Components/Amministratore/GestioneVeicoli/PannelloRimuoviVeicolo";
import PannelloModificaVeicolo from "../Components/Amministratore/GestioneVeicoli/PannelloModificaVeicolo";
import PannelloAggiugiUtente from "../Components/Amministratore/GestioneUtenti/PannelloAggiungiUtente";
import PannelloModificaUtente from "../Components/Amministratore/GestioneUtenti/PannelloModificaUtente";
import PannelloRimuoviUtente from "../Components/Amministratore/GestioneUtenti/PannelloRimuoviUtente";
import PannelloVisualizzaPrenotazioni from "../Components/Amministratore/GestionePrenotazioni/PannelloVisualizzaPrenotazioni";
import Axios from 'axios';
import { Col, Container, Row, Jumbotron, Button } from "reactstrap";

const logout = () => {
  console.log("cliccato");
  window.localStorage.clear();
  Axios.post('/api/user/logout')
    .then((res) => {
      window.location.href = '/login';
    }).catch((err) => {
      window.location.href = '/errorServer';
    });
};

function TabPanel(props) {
  
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={1} >
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: "100%",
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    backgroundColor: '#2e1534',
    color: "#FFFF"
  },
}));

export default function VerticalTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        <Tab label="Aggiungi veicolo" {...a11yProps(0)} />
        <Tab label="Rimuovi veicolo" {...a11yProps(1)} />
        <Tab label="Modifica stato veicolo" {...a11yProps(2)} />
        <Tab label="Rimuovi utente" {...a11yProps(3)} />
        <Tab label="Aggiungi utente" {...a11yProps(4)} />
        <Tab label="Modifica dati utente" {...a11yProps(5)} />
        <Tab label="Prenotazioni effettuate" {...a11yProps(6)} />
        <Tab label="logout" {...a11yProps(7)} />
      </Tabs>
      <TabPanel value={value} index={0} style={{width: "90%"}}>
        <PannelloAggiugiVeicolo/>
      </TabPanel>
      <TabPanel value={value} index={1} style={{width: "90%"}}>
        <PannelloRimuoviVeicolo/>
      </TabPanel>
      <TabPanel value={value} index={2} style={{width: "90%"}}>
        <PannelloModificaVeicolo/>
      </TabPanel>
      <TabPanel value={value} index={3} style={{width: "90%"}}>
        <PannelloRimuoviUtente/>
      </TabPanel>
      <TabPanel value={value} index={4} style={{width: "90%"}}>
        <PannelloAggiugiUtente/>
      </TabPanel>
      <TabPanel value={value} index={5} style={{width: "90%"}}>
      <PannelloModificaUtente/>
      </TabPanel>
      <TabPanel value={value} index={6}  style={{width: "90%"}}>
      <PannelloVisualizzaPrenotazioni/>
      </TabPanel>
      <TabPanel value={value} index={7}  style={{width: "90%"}}>
      <Button  onClick={() => logout()}> bottone </Button>
      </TabPanel>
    </div>
  );
}