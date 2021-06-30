import jsPDF from 'jspdf';

function PagamentoPDF(utente, prezzo, id) {
	let doc = new jsPDF();
	let y = 2;

	doc.setFontSize(20);
	doc.setFont(undefined, "bold");
	doc.text(20, 10 * y++ - 2, 'Fattura');

	doc.setFontSize(16);

	doc.setFont(undefined, "bold");
	doc.text(25, 10 * y, 'ID Pagamento: ');

	doc.setFont(undefined, "normal");
	doc.text(80, 10 * y++, `${id}`);

	doc.setFont(undefined, "bold");
	doc.text(25, 10 * y, 'Nome: ');

	doc.setFont(undefined, "normal");
	doc.text(80, 10 * y++, `${utente.name}`);
	
	doc.setFont(undefined, "bold");
	doc.text(25, 10 * y, 'Cognome: ');

	doc.setFont(undefined, "normal");
	doc.text(80, 10 * y++, `${utente.surname}`);

	doc.setFont(undefined, "bold");
	doc.text(25, 10 * y, 'Email: ');

	doc.setFont(undefined, "normal");
	doc.text(80, 10 * y++, `${utente.email}`);

	doc.setFont(undefined, "bold");
	doc.text(25, 10 * y, 'Prezzo: ');

	doc.setFont(undefined, "normal");
	doc.text(80, 10 * y++, `${prezzo} €`);

	doc.save("ricevuta.pdf")
	return doc.output('datauristring');
}

export default PagamentoPDF;