import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import "../ComponentsCss/main.css"
import PannelloEliminaCarta from "../Components/Cliente/GestioneAccount/PannelloEliminaCarta";
import PannelloModifcaPassword from "../Components/Cliente/GestioneAccount/PannelloModifcaPassword";
import PannelloModificaDati from "../Components/Cliente/GestioneAccount/PannelloModificaDati";
import PannelloInserimentoPatente from "../Components/Cliente/GestioneAccount/PannelloInserimentoPatente";
import PannelloModifcaPatente from "../Components/Cliente/GestioneAccount/PannelloModifcaPatente";
import PannelloInserimentoCarta from "../Components/Cliente/GestioneAccount/PannelloInserimentoCarta";



function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}

			id={`scrollable-auto-tabpanel-${index}`}
			aria-labelledby={`scrollable-auto-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box p={3}>
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
		id: `scrollable-auto-tab-${index}`,
		'aria-controls': `scrollable-auto-tabpanel-${index}`,
	};
}

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		width: '100%',

	},

}));

export default function ScrollableTabsButtonAuto() {
	const classes = useStyles();
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<div className={classes.root}>
			<AppBar position="static" color="default">
				<Tabs
					value={value}
					onChange={handleChange}

					indicatorColor="primary"
					textColor="light"
					variant="scrollable"
					scrollButtons="auto"
					aria-label="scrollable auto tabs example"
				>
					<Tab label="Modifica Password" {...a11yProps(0)} />
					<Tab label="Modifica Dati Personali" {...a11yProps(1)} />
					<Tab label="Inserimento Patente" {...a11yProps(2)} />
					<Tab label="Aggiorna Patente" {...a11yProps(3)} />
					<Tab label="Inserimento Metodo Pagamento" {...a11yProps(4)} />
					<Tab label="Eliminazione Metodo Pagamento" {...a11yProps(5)} />
				</Tabs>
			</AppBar>
			<TabPanel value={value} index={0}>
				<PannelloModifcaPassword/>
			</TabPanel>
			<TabPanel value={value} index={1}>
				<PannelloModificaDati/>
			</TabPanel>
			<TabPanel value={value} index={2}>
				<PannelloInserimentoPatente/>
			</TabPanel>
			<TabPanel value={value} index={3}>
				<PannelloModifcaPatente/>
			</TabPanel>
			<TabPanel value={value} index={4}>
				<PannelloInserimentoCarta/>
			</TabPanel>
			<TabPanel value={value} index={5}>
				<PannelloEliminaCarta/>
			</TabPanel>
		</div>
	);
}
