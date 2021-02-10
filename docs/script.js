function Invoice(id, money, portions) {
    this.id = id;
    this.value = money;
    this.portions = portions;
    this.discount = function () {
        let discount = 0;
        this.portions.forEach(portion => {
            discount += portion.value;
        });
        return discount
    };
    this.rest = function () {
        return this.value - this.discount();
    };
    this.valueVitor = function () {
        let total = (this.rest() / 4);
        this.portions.forEach(portion => {
            portion
        })
    }
};

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
        check: {
            vitor: document.getElementById('checkbox-vitor').checked,
            debora: document.getElementById('checkbox-debora').checked,
            fernanda: document.getElementById('checkbox-samanta').checked,
            samanta: document.getElementById('checkbox-fernanda').checked
        }
    };

    if (data.check.vitor || data.check.debora || data.check.fernanda || data.check.samanta) {
        return data
    };

    return false

};

// Choose invoice
document.querySelector('#button-choose-invoice').addEventListener('click', () => {
    const id = document.querySelector('#key').value;
    handleInvoiceTable(id)
});

// Create invoice
document.querySelector('#button-create-invoice').addEventListener('click', () => {
    const value = document.querySelector('#total-money').value;
    invoices.push(new Invoice(invoices.length, value, []));
    document.querySelector('#key').value = invoices[invoices.length - 1].id;
    openForm();
});

// Create Portion of invoice
document.querySelector('.portions-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.querySelector('#key').value;

    const data = getData();
    if (data) invoices[id].portions.push(data);

    refreshInvoiceInfo(id);
    handleInvoiceTable(id);
});