function Invoice(id, money, portions) {
    this.id = id;
    this.value = money;
    this.portions = portions;
    this.discount = function() {
        let discount = 0;
        this.portions.forEach(portion => {
            discount += portion.value;
        });
        return discount
    };
    this.rest = function() {
        return this.value - this.discount();
    };
};

document.querySelector('#button-open-invoice').addEventListener('click', () => {
    const value = document.querySelector('#total-money').value;
    invoices.push(new Invoice(invoices.length, value, []));
    document.querySelector('#key').value = invoices[invoices.length - 1].id;
    openForm();
});

// SUBMIT EVENT
document.querySelector('.portions-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.querySelector('#key').value;

    const data = getData();
    if(data) invoices[id].portions.push(data);

    refreshInvoiceInfo(id);

    handleMoney(true, id)
});

// INFO
function refreshInvoiceInfo(id) {
    document.querySelector('#value-invoice').value = invoices[id].value;
    document.querySelector('#discount-invoice').value = invoices[id].discount();
    document.querySelector('#rest-invoice').value = invoices[id].rest();
};

let invoices = []

// PORTION
const table = document.querySelector('.portions-table');

// GET DATA FROM FORM
function getData() {

    const data = {
        value: Number((document.getElementById('money').value).replace(',', '.')),
        check: [
            document.getElementById('checkbox-vitor').checked,
            document.getElementById('checkbox-debora').checked,
            document.getElementById('checkbox-samanta').checked,
            document.getElementById('checkbox-fernanda').checked
        ]
    };

    if (data.check[0] || data.check[1] || data.check[2] || data.check[3]) {
        return data
    };

    return false

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


function handleMoney(isSubmit, id) {

    table.innerHTML = '';

    createTableHeader();

    createRow({ value: document.querySelector('#rest-invoice').value, check: [true, true, true, true] });

    invoices[id].portions.forEach((content, i) => {
        if (content) {
            createRow(content, i);
        };
    });

    const rows = document.querySelectorAll('.portions-table tr.body-row');
    fillCells(rows);
    createLastRow(rows);

};