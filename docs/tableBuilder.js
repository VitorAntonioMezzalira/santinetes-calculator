// CREATE TABLE HEADER
function createTableHeader() {

    const headersNames = ['Valor', 'Debora', 'Fernanda', 'Samanta', 'Vitor'];

    const firstRow = document.createElement('TR');

    for (let i = 0; i < headersNames.length; i++) {

        const firstRowCell = document.createElement('TH');
        const firstRowCellText = document.createTextNode(headersNames[i]);
        firstRowCell.appendChild(firstRowCellText);
        firstRow.appendChild(firstRowCell);

    };

    table.appendChild(firstRow);

};

// CREATE TABLE TOTAL
function createLastRow(rows) {

    const lastRow = document.createElement('TR');
    lastRow.setAttribute('class', 'total');
    for (let i = 1; i < 6; i++) {

        let totalCollum = 0
        rows.forEach(row => {
            totalCollum += Number(row.querySelector('td:nth-child(' + i + ')').innerText);
        });
        const lastRowCell = document.createElement('TD');
        lastRowCell.innerText = totalCollum.toFixed(2);
        lastRow.appendChild(lastRowCell);

    }

    table.appendChild(lastRow);

}

// CREATE AND APPEND A ROW TO THE TABLE
function createRow(contents, i) {

    const row = document.createElement('TR');

    const moneyCell = document.createElement('TD');
    moneyCell.setAttribute('class', 'cell-money')
    const moneyCellText = document.createTextNode(contents.value);
    moneyCell.appendChild(moneyCellText)

    row.appendChild(moneyCell);
    row.setAttribute('class', 'body-row')

    const names = ['debora', 'fernanda', 'samanta', 'vitor']

    //
    for (let i = 0; i < 4; i++) {
        let cell = document.createElement('TD');
        if (contents.check[names[i]]) cell.setAttribute('class', 'true');
        else cell.setAttribute('class', 'false');
        row.appendChild(cell);
    }

    const deleteCell = document.createElement('TD');
    deleteCell.setAttribute('key', i)
    deleteCell.addEventListener('click', e => {
        const index = e.target.getAttribute('key');
        portions[index] = undefined;

        handleMoney(false)

    })
    const deleteText = document.createTextNode('x');
    deleteCell.appendChild(deleteText)

    row.appendChild(deleteCell)

    table.appendChild(row)

};

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
};

function handleInvoiceTable(id) {

    table.innerHTML = '';

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

};