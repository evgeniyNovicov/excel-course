import { ExelComponent } from "../../core/ExcelComponent";
import { createTable } from "./table.template";

export class Table extends ExelComponent {
    static className = 'excel__table'
    constructor($root) {
        super($root, {

        })
    }
    toHtml() {
        return createTable(100)
    }
}