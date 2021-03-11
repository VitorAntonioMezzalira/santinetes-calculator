const invoicesTable = document.getElementById('invoices-table');

function createInvoicesTable() {

    invoicesTable.innerHTML = '';

    // H E A D E R
    const headersNames = ['Total', 'Debora', 'Fernanda', 'Samanta', 'Vitor']
    const header = document.createElement('TR');

    for (let i = 0; i < headersNames.length; i++) {
        const cell = document.createElement('TH');
        const cellText = document.createTextNode(headersNames[i]);
        cell.appendChild(cellText);
        header.appendChild(cell);
    };

    invoicesTable.appendChild(header);

    // I N V O I C E S
    invoices.forEach(invoice => {

        const invoiceValues = [invoice.value, invoice.totalDebora, invoice.totalFernanda, invoice.totalSamanta, invoice.totalVitor]
        const invoiceRow = document.createElement('TR');
        invoiceRow.setAttribute('invoice-id', invoice.id)

        for (let i = 0; i < headersNames.length; i++) {
            const cell = document.createElement('TD');
            const cellText = document.createTextNode(invoiceValues[i].toFixed(2));
            cell.appendChild(cellText);
            invoiceRow.appendChild(cell);
        };

        createInvoiceEditButton(invoiceRow)
        invoicesTable.appendChild(invoiceRow);

    });

    // T O T A L
    const totalValues = [0, 0, 0, 0, 0];
    invoices.forEach(invoice => {
        totalValues[0] += Number(invoice.value);
        totalValues[1] += invoice.totalDebora;
        totalValues[2] += invoice.totalFernanda;
        totalValues[3] += invoice.totalSamanta;
        totalValues[4] += invoice.totalVitor;
    });

    const total = document.createElement('TR');

    for (let i = 0; i < headersNames.length; i++) {
        const cell = document.createElement('TD');
        const cellText = document.createTextNode(totalValues[i].toFixed(2));
        cell.appendChild(cellText);
        total.appendChild(cell);
    };

    invoicesTable.appendChild(total);

};

function fillInvoiceForm(openInvoice) {

    document.getElementById('value-invoice').value = invoices[openInvoice].value;
    document.getElementById('discount-invoice').value = invoices[openInvoice].discount();
    document.getElementById('rest-invoice').value = invoices[openInvoice].rest();
    openPortion = 0;
    document.getElementById('money').value = '';
    document.querySelector('.checkboxes li:nth-child(1)').classList.remove('on');
    document.querySelector('.checkboxes li:nth-child(2)').classList.remove('on');
    document.querySelector('.checkboxes li:nth-child(3)').classList.remove('on');
    document.querySelector('.checkboxes li:nth-child(4)').classList.remove('on');
}

// EDIT INVOICE FUNCTIONS
function createInvoiceEditButton(row) {
    row.addEventListener('click', (e) => {
        openInvoice = e.target.parentNode.getAttribute('invoice-id');
        fillInvoiceForm(openInvoice);
        handleInvoiceTable(openInvoice)
    });
}
