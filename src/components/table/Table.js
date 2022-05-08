import { ExelComponent } from "../../core/ExcelComponent";
import { $ } from "../../core/dom";
import { createTable } from "./table.template";
import { resizeHandler } from "./table.resize";
import { shouldResize, isSell, matrix, nextSelector } from "./tableFunctions";
import { TableSelection } from "./TableSelection";
import { changeCurrentCell } from "./changeCurrentCell";

export class Table extends ExelComponent {
    static className = 'excel__table'
    constructor($root, options) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown', 'keydown', 'input'],
            ...options
        })
    }
    toHtml() {
        return createTable(20)
    }

    prepare() {
        this.selection = new TableSelection()
    }

    init() {
        super.init()
        const $cell = this.$root.find('[data-id="0:0"]')
        this.selected($cell)
        this.$on('fomula:input', text => {
            this.selection.current.text(text)
        })
        this.$on('fomula:focus', () => this.selection.current.focus())
    }
    selected ($cell) {
        this.selection.select($cell)
        this.$emit('table:select', $cell)
    }

    onMousedown(event) {
        if (shouldResize(event)) {
            resizeHandler(this.$root, event)
        }
        if (isSell(event)) {
            let $target = $(event.target)
            if (event.shiftKey) {
                let $cells = matrix(this.selection.current, $target)
                    .map(id => this.$root.find(`[data-id="${id}"]`))
                this.selection.selectGroup($cells)
            } else {
                this.selection.select($target)
                changeCurrentCell($target, this.$root)
            }
        }
        this.$emit('table:select', $(event.target))
    }
    onKeydown(event) {
        const keys = ['Enter',
            'Tab',
            'ArrowLeft',
            'ArrowUp',
            'ArrowDown',
            'ArrowRight'
        ]
        const { key } = event
        if (keys.includes(event.key) && !event.shiftKey) {
            event.preventDefault()
            const id = this.selection.current.id(true)
            const $next = this.$root.find(nextSelector(key, id))
            this.selected($next)
            changeCurrentCell($next, this.$root)
        }
    }
    onInput(event) {
        this.$emit('table:input', $(event.target))
    }
}