import { ExelComponent } from "../../core/ExcelComponent";
import { createTable } from "./table.template";
import { resizeHandler } from "./table.resize";
export class Table extends ExelComponent {
    static className = 'excel__table'
    constructor($root) {
        super($root, {
            listeners: [ 'mousedown','mousemove', 'mouseup']
        })
    }
    toHtml() {
        return createTable(20)
    }

    onMousedown(event) {
        if(shouldResize (event)){
            resizeHandler(this.$root, event)
        }
    }
}
