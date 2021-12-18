import { DomListener } from "./DomListener";

export class ExelComponent extends DomListener {
    constructor($root, options = {} ){
        super($root, options.listeners)
        this.name = options.name || ''
    }
    toHtml() {
        return ''
    }
    addClass() {
        return ''
    }

    init() {
        this.initDomListeners()
    }

    destroy() {
        this.removeDomListeners()
    }
}