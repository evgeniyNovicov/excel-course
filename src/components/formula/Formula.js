import { $ } from "../../core/dom";
import { ExelComponent } from "../../core/ExcelComponent";

export class Formula extends ExelComponent {
    static className = 'excel__formula'
    constructor($root, options) {
        super($root, {
            name: 'Formula',
            listeners: ['input', 'keydown'],
            ...options
        })
        this.$root = $root
    }

    toHtml() {
        return `<div class="formula">fx</div>
        <div id="formula" class="input" contenteditable spellcheck="false"></div>`
    }

    init() {
        super.init()
        this.$on('table:input', $cell => {
            this.$root.find('#formula').text($cell.text())
        })
        this.$on('table:select', $cell => {
            this.$root.find('#formula').text($cell.text())
        })
    }

    onInput(event) {
        this.$emit('fomula:input', $(event.target).text())
    }
    onKeydown(event) {
        if (event.key === "Enter") {
            this.$emit('fomula:focus')
        }
    }
}