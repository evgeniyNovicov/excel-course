import { $ } from "../../core/dom"

export class Excel {
    constructor(selector, options) {
        // возвращает шаблон компонента
        this.$el = $(selector)
        this.components = options.components || [] 
    }
    getRoot() {
        const $root = $.create('div', 'excel')
        
        this.components = this.components.map(Component => {
            const $el = $.create('div',Component.className)
            const component = new Component($el)
            // debug`
            if(component.name) {
                window['c'] = component
            }
           
            $el.html(component.toHtml())
            $root.append($el)
            return component
        });
        return $root
        
    }
    render () {
        this.$el.append(this.getRoot())
        this.components.forEach(component => component.init());
    }
}