let invoices = []

// DISCOUNT
function invoiceDiscount(invoice) {
    let discount = 0;
    for (let i = 0; i < invoice.portions.length; i++) {
        discount += invoice.portions[i].money;
    }
    return discount
}
// REST 
function invoiceRest(invoice) {
    return invoice.value - invoiceDiscount(invoice)
}

// OPEN
function openInvoice(isSubmit) {

    let key = 0
    if (isSubmit) {
        invoices[invoices.length] = {
            value: Number((document.getElementById('total-money').value).replace(',', '.')),
            portions: []
        };
        key = (invoices.length - 1);
    } else {
        key = (document.getElementById('key').value)
    }

    refreshInvoiceInfo(invoices[invoices.length - 1], key);
    handleMoney(false, key)
    openForm();
}
// CLOSE
function finishInvoice() {
    closeForm();
}

// INFO
function refreshInvoiceInfo(invoice, key) {
    console.log(invoice)
    document.getElementById('key').value = key;
    document.getElementById('total-invoice').value = (invoice.value).toFixed(2);
    document.getElementById('rest-invoice').value = (invoiceRest(invoice)).toFixed(2);
    document.getElementById('discount-invoice').value = (invoiceDiscount(invoice)).toFixed(2);
}

// PORTION
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
        })

    });
}

function handleMoney(isSubmit, key) {

    table.innerHTML = '';
    if (isSubmit) invoices[key].portions[invoices[key].portions.length] = getData();
    refreshInvoiceInfo(invoices[key], key);
    createTableHeader();
    createRow({ money: document.getElementById('rest-invoice').value, check: [true, true, true, true] })

    invoices[key].portions.forEach((content, i) => {
        if (content) {
            createRow(content, i)
        }
    });

    const rows = document.querySelectorAll('.portions-table tr.body-row');
    fillCells(rows);
    createLastRow(rows);

};

// SUBMIT EVENT
document.querySelector('.portions-form').addEventListener('submit', (e) => {
    e.preventDefault();
    handleMoney(true, document.getElementById('key').value);
});

// onload Page

handleMoney(false, (invoices.length - 1))