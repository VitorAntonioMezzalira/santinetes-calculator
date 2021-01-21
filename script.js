// INVOICE

let invoice = {
    value: 0,
    rest: 0,
    discount: 0,
    portions: []
};

const portionCalculator = document.querySelector('.portion-calculator');

function openInvoice() {

    invoice = {
        value: 0,
        rest: 0,
        discount: 0
    }

    portions = []

    invoice.value = Number((document.getElementById('total-money').value).replace(',', '.'));
    invoice.rest = invoice.value

    document.getElementById('total-invoice').value = invoice.value
    document.getElementById('rest-invoice').value = invoice.value

    calculateInvoice()

    openForm();

}

function finishInvoice() {

    closeForm();

}

function calculateInvoice() {
    invoice.discount = 0
    portions.forEach(portion => {
        if (portion) invoice.discount += portion.money;
    })

    invoice.rest = invoice.value - invoice.discount;

    refreshInvoiceInfo()

}

function refreshInvoiceInfo() {
    document.getElementById('total-invoice').value = (invoice.value).toFixed(2);
    document.getElementById('rest-invoice').value = (invoice.rest).toFixed(2);
    document.getElementById('discount-invoice').value = (invoice.discount).toFixed(2);
}

// PORTION
let portions = []
const table = document.querySelector('.portions-table');

// GET DATA FROM FORM
function getData() {

    const data = {
        money: Number((document.getElementById('money').value).replace(',', '.')),
        check: [
            document.getElementById('checkbox-vitor').checked,
            document.getElementById('checkbox-debora').checked,
            document.getElementById('checkbox-samanta').checked,
            document.getElementById('checkbox-fernanda').checked,
        ]
    };

    if (data.check[0] || data.check[1] || data.check[2] || data.check[3]) {
        return data
    }

    return false

};

// CREATE AND APPEND A ROW TO THE TABLE
function createRow(contents, i) {

    const row = document.createElement('TR');

    const moneyCell = document.createElement('TD');
    moneyCell.setAttribute('class', 'cell-money')
    const moneyCellText = document.createTextNode(contents.money);
    moneyCell.appendChild(moneyCellText)

    row.appendChild(moneyCell);
    row.setAttribute('class', 'body-row')

    contents.check.forEach(isCheck => {

        const cell = document.createElement('TD');

        if (isCheck === true) cell.setAttribute('class', 'true');
        else cell.setAttribute('class', 'false')

        row.appendChild(cell);

    });

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
        })

    });
}

// CREATE TABLE HEADER
function createFirstRow() {

    const headersNames = ['Valor', 'Vitor', 'Debora', 'Samanta', 'Fernanda'];
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

function handleMoney(isSubmit) {

    if (getData()) {

        if (isSubmit) portions[portions.length] = getData();

        table.innerHTML = '';

        createFirstRow();

        calculateInvoice()

        createRow({ money: invoice.rest, check: [true, true, true, true] })

        portions.forEach((content, i) => {
            if (content) {
                createRow(content, i)
            }
        });

        const rows = document.querySelectorAll('.portions-table tr.body-row');
        fillCells(rows);
        createLastRow(rows);

    };

};

// SUBMIT EVENT
document.querySelector('.portions-form').addEventListener('submit', (e) => {
    e.preventDefault();
    handleMoney(true);
});

// onload Page

handleMoney(false)