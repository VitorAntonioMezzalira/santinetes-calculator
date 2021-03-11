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

let openInvoice = 0;
let openPortion = 0;

// INFO
function refreshInvoiceInfo(id) {
    document.querySelector('#value-invoice').value = invoices[id].value;
    document.querySelector('#discount-invoice').value = invoices[id].discount();
    document.querySelector('#rest-invoice').value = invoices[id].rest();
};

let invoices = []

// PORTION
const portionsTable = document.querySelector('.portions-table');

// GET DATA FROM FORM
function getData() {

    const data = {
        value: Number((document.getElementById('money').value).replace(',', '.')),
        check: {
            debora: testElementHaveClassOn(document.querySelector('.checkboxes li:nth-child(1)')),
            fernanda: testElementHaveClassOn(document.querySelector('.checkboxes li:nth-child(2)')),
            samanta: testElementHaveClassOn(document.querySelector('.checkboxes li:nth-child(3)')),
            vitor: testElementHaveClassOn(document.querySelector('.checkboxes li:nth-child(4)'))
        }
    };

    if (data.check.vitor || data.check.debora || data.check.fernanda || data.check.samanta) {
        return data
    };

    return false

};

function testElementHaveClassOn(element) {

    if (element.classList['0'] === 'on') {
        return true
    } else {
        return false
    };

};

// Choose invoice

// Create invoice
document.getElementById('button-create-invoice').addEventListener('click', () => {
    const value = document.querySelector('#total-money').value;
    invoices.push(new Invoice(invoices.length, value, []));
    openInvoice = invoices[invoices.length - 1].id;
    refreshInvoiceInfo(openInvoice);
    handleInvoiceTable(openInvoice);
});

document.getElementById('button-finish-invoice').addEventListener('click', () => {
    const demo = portionsTable.querySelector('tr:last-child');
    invoices[openInvoice].value = Number(document.getElementById('value-invoice').value);
    invoices[openInvoice].totalDebora = Number(demo.querySelector('td:nth-child(2)').innerHTML);
    invoices[openInvoice].totalFernanda = Number(demo.querySelector('td:nth-child(3)').innerHTML);
    invoices[openInvoice].totalSamanta = Number(demo.querySelector('td:nth-child(4)').innerHTML);
    invoices[openInvoice].totalVitor = Number(demo.querySelector('td:nth-child(5)').innerHTML);

    clearFormulary()

    createInvoicesTable();
})

// Create Portion of invoice
document.getElementById('submit-money').addEventListener('click', (e) => {
    e.preventDefault();

    const portionData = getData();
    if (portionData) {
        if (openPortion) {
            updatePortion(openInvoice, openPortion, portionData);
        } else {
            invoices[openInvoice].portions.push(portionData);
        }

        openPortion = 0;
        document.getElementById('money').value = '';
        document.querySelector('.checkboxes li:nth-child(1)').classList.remove('on');
        document.querySelector('.checkboxes li:nth-child(2)').classList.remove('on');
        document.querySelector('.checkboxes li:nth-child(3)').classList.remove('on');
        document.querySelector('.checkboxes li:nth-child(4)').classList.remove('on');
    }

    refreshInvoiceInfo(openInvoice);
    handleInvoiceTable(openInvoice);

});

function updatePortion(openInvoice, portionId, newPortionData) {
    invoices[openInvoice].portions[portionId] = newPortionData;
}

function clearFormulary() {

    document.querySelector('.portions-table').innerHTML = '';

    openInvoice = 0;
    document.getElementById('total-money').value = '';
    document.getElementById('value-invoice').value = '';
    document.getElementById('discount-invoice').value = '';
    document.getElementById('rest-invoice').value = '';
    openPortion = 0;
    document.getElementById('money').value = '';
    document.querySelector('.checkboxes li:nth-child(1)').classList.remove('on');
    document.querySelector('.checkboxes li:nth-child(2)').classList.remove('on');
    document.querySelector('.checkboxes li:nth-child(3)').classList.remove('on');
    document.querySelector('.checkboxes li:nth-child(4)').classList.remove('on');
}