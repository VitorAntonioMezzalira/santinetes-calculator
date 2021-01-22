const headersNames = ['Valor', 'Vitor', 'Debora', 'Samanta', 'Fernanda'];

// CREATE TABLE HEADER
function createTableHeader() {
    
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