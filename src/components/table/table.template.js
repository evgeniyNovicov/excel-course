const CODES = {
    A: 'A'.charCodeAt(),
    Z: 'Z'.charCodeAt()
}

// function toCel (row, ind) {
//     return `<div class="ceil" contenteditable data-col="${ind}" data-row="${row}"></div>`
// }

function toCell(row) {
    return function(_, col) {
        return `
        <div
            class="cell"
            contenteditable
            data-col="${col}"
            data-type="cell"
            data-id="${row}:${col}"
        ></div>`
    }
}

function toChart(_, ind) {
    return String.fromCharCode(CODES.A + ind)
}

function toColumn(el, ind) {
    return `<div class="column" data-type="resizable" data-index="${ind}">
        ${el}
        <div class="col-resize" data-resize="col"></div>
        <div class="col-resize" data-resize="col"></div>
    </div>`
}

function toRow(content, ind) {
    let resize = ind ? `<div class="row-resize" data-resize="row"></div>` : ``
    return `
        <div class="row" data-type="resizable">
            <div class="row-info">
                ${ind ? ind : ''}
                ${resize}
            </div>
            <div class="row-data">${content}</div>
        </div>
    `
}

export function createTable(rowsCount = 15) {
    const colsCount = CODES.Z - CODES.A + 1
    const rows = []

    const cols = new Array(colsCount)
        .fill('')
        .map(toChart)
        .map(toColumn)
        .join('')

    rows.push(toRow(cols))

    for (let row = 0; row < rowsCount; row++) {
        const cells = new Array(colsCount)
            .fill('')
            // .map((_, col) => toCel(row, col))
            .map(toCell(row))
            .join('')

        rows.push(toRow(cells, row + 1))
    }

    return rows.join('')
}