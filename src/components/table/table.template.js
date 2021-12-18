const CODES = {
    A: 'A'.charCodeAt(),
    Z: 'Z'.charCodeAt()
}

function toCel () {
    return `
        <div class="ceil" contenteditable></div>
    `
}

function toChart (_, ind) {
    return String.fromCharCode(CODES.A + ind)
}

function toColumn(el) {
    return `<div class="row-column">${el}</div>`
}

function toRow(content,ind) {
    // мое решение
    // let indValue = ''
    // if(ind > 0) {
    //     indValue = ind
    // }
    return `
        <div class="row">
            <div class="row-info">${ /*${indValue} - мое решение */ ind ? ind : ''}</div>
            <div class="row-data">${content}</div>
        </div>
    `
}


export function createTable (rowsCount = 15) {
    const colsCount = CODES.Z - CODES.A + 1
    const rows = []

    const cols = new Array(colsCount)
        .fill('')
        .map(toChart)
        .map(toColumn)
        .join('')

    rows.push(toRow(cols))

    const tableCols = new Array(colsCount)
    .fill('')
    .map(toCel)
    .join('')

    for (let i = 0; i < rowsCount; i++) {
        rows.push(toRow(tableCols, i + 1))  
    }

    return rows.join('')
}