import { ExelComponent } from "../../core/ExcelComponent";

export class Header extends ExelComponent {
    static className = 'excel__header'
    constructor($root) {
        super($root, {

            
        })
    }
    toHtml() {
        return  `<input type="text" class="input" value="Новая таблица">
        <div>
            <div class="button">
                <i class="material-icons"> delete_outline</i>
            </div>
            <div class="button">
                <i class="material-icons"> login</i>
            </div>
        </div>`
    }

    onInput(event) {
        console.log(this.$root)
        console.log('Formula: onInput', event.target.textContent)
    }

    onClick() {
        console.log('hi')
    }
}