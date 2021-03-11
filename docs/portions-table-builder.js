// CREATE TABLE HEADER
function createTableHeader() {

    const headersNames = ['Total', 'Debora', 'Fernanda', 'Samanta', 'Vitor'];

    const firstRow = document.createElement('TR');

    for (let i = 0; i < headersNames.length; i++) {

        const firstRowCell = document.createElement('TH');
        const firstRowCellText = document.createTextNode(headersNames[i]);
        firstRowCell.appendChild(firstRowCellText);
        firstRow.appendChild(firstRowCell);

    };

    portionsTable.appendChild(firstRow);

}

// CREATE TABLE TOTAL
function createLastRow(rows) {

    const lastRow = document.createElement('TR');
    lastRow.setAttribute('class', 'total');
    for (let i = 1; i < 6; i++) {

        let totalCollum = 0
        rows.forEach(row => {
            totalCollum += Number(row.querySelector('td:nth-child(' + i + ')').innerText);
        });
        const cellLastRow = document.createElement('TD');
        cellLastRow.innerText = totalCollum.toFixed(2);
        lastRow.appendChild(cellLastRow);

    }

    portionsTable.appendChild(lastRow);

}

// CREATE AND APPEND A ROW TO THE TABLE
function createRow(contents, portionId) {

    const row = document.createElement('TR');

    row.setAttribute('portion-id', portionId)

    const moneyCell = document.createElement('TD');
    moneyCell.setAttribute('class', 'cell-money')
    const moneyCellText = document.createTextNode(contents.value.toFixed(2));
    moneyCell.appendChild(moneyCellText)

    row.appendChild(moneyCell);
    row.setAttribute('class', 'body-row')

    const names = ['debora', 'fernanda', 'samanta', 'vitor']

    for (let i = 0; i < 4; i++) {
        let cell = document.createElement('TD');
        if (contents.check[names[i]]) cell.setAttribute('class', 'true');
        else cell.setAttribute('class', 'false');
        row.appendChild(cell);
    }

    createPortionEditButton(row);

    portionsTable.appendChild(row);

}

// FILLS THE TRUE CELLS WITH THE RESPECTIVE AMOUNT OF MONEY
function fillCells(rows) {
    rows.forEach(row => {

        const moneyRow = row.querySelector('.cell-money').innerText;
        const trueCells = row.querySelectorAll('.true');
        const moneyCell = (moneyRow / trueCells.length).toFixed(2);

        trueCells.forEach(cell => {
            cell.innerText = moneyCell;
        });
    });
}

function handleInvoiceTable(id) {

    portionsTable.innerHTML = '';

    createTableHeader();

    createRow({ value: invoices[id].rest(), check: { vitor: true, debora: true, fernanda: true, samanta: true } });

    invoices[id].portions.forEach((content, i) => {
        if (content) {
            createRow(content, i);
        };
    });

    const rows = document.querySelectorAll('.portions-table tr.body-row');
    fillCells(rows);
    createLastRow(rows);

}

// EDIT PORTION FUNCTIONS
function createPortionEditButton(row) {
    row.addEventListener('click', (e) => {
        openPortion = e.target.parentNode.getAttribute('portion-id');
        fillPortionForm(invoices[openInvoice].portions[openPortion]);
    });
}

function fillPortionForm(portion) {

    document.getElementById('money').value = portion.value;

    if (portion.check.debora) {
        document.querySelector('.checkboxes li:nth-child(1)').classList.add('on')
    } else {
        document.querySelector('.checkboxes li:nth-child(1)').classList.remove('on')
    }
    if (portion.check.fernanda) {
        document.querySelector('.checkboxes li:nth-child(2)').classList.add('on')
    } else {
        document.querySelector('.checkboxes li:nth-child(2)').classList.remove('on')
    }
    if (portion.check.samanta) {
        document.querySelector('.checkboxes li:nth-child(3)').classList.add('on')
    } else {
        document.querySelector('.checkboxes li:nth-child(3)').classList.remove('on')
    }
    if (portion.check.vitor) {
        document.querySelector('.checkboxes li:nth-child(4)').classList.add('on')
    } else {
        document.querySelector('.checkboxes li:nth-child(4)').classList.remove('on')
    }

}