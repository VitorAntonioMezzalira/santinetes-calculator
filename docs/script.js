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
    this.totalDebora = 0;
    this.totalFernanda = 0;
    this.totalSamanta = 0;
    this.totalVitor = 0;
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
document.getElementById('button-create-invoice').addEventListener('click', () => {
    const value = document.querySelector('#total-money').value;
    invoices.push(new Invoice(invoices.length, value, []));
    document.querySelector('#key').value = invoices[invoices.length - 1].id;
    openForm();
});

document.getElementById('button-finish-invoice').addEventListener('click', () => {
    const demo = table.querySelector('tr:last-child');
    const id = document.querySelector('#key').value;
    invoices[id].totalDebora = Number(demo.querySelector('td:nth-child(2)').innerHTML);
    invoices[id].totalFernanda = Number(demo.querySelector('td:nth-child(3)').innerHTML);
    invoices[id].totalSamanta = Number(demo.querySelector('td:nth-child(4)').innerHTML);
    invoices[id].totalVitor = Number(demo.querySelector('td:nth-child(5)').innerHTML);
})

// Create Portion of invoice
document.querySelector('.portions-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.querySelector('#key').value;
    
    document.getElementById('money').value = '';
    document.getElementById('checkbox-debora').checked = false;
    document.getElementById('checkbox-fernanda').checked = false;
    document.getElementById('checkbox-samanta').checked = false;
    document.getElementById('checkbox-vitor').checked = false;


    const data = getData();
    if (data) invoices[id].portions.push(data);

    refreshInvoiceInfo(id);
    handleInvoiceTable(id);
});