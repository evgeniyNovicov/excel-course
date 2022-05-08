import { $ } from "../../core/dom"

export function changeCurrentCell($next, $root) {
    const $currentCell = $next.id(true)
    function clearPreviosRowAndCol() {
        const columnsHeader = $root.findAll('.column')
        const rowsHeader = $root.findAll('.row-info')
        columnsHeader.forEach(column => {
            $(column).removeClass('active')
        });
        rowsHeader.forEach(row => {
            $(row).removeClass('active')
        });
    }
    clearPreviosRowAndCol()

    function changeCurrentColAndRow() {
        const colIndex = $currentCell.col
        const rowIndex = $currentCell.row
        const colHeader = $root.find(`[data-index='${colIndex}']`)
        colHeader.addClass('active')
        const rowsHeader = $root.findAll('.row-info')
        rowsHeader.forEach((row, ind) => {
            if(rowIndex === --ind) {
                $(row).addClass('active')
            }
        });
    }
    changeCurrentColAndRow()
}