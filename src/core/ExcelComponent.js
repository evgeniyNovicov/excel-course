import { DomListener } from "./DomListener";

export class ExelComponent extends DomListener {
    constructor($root, options = {}) {
        super($root, options.listeners)
        this.name = options.name || ''
        this.emitter = options.emitter
        this.prepare()
        this.unsubscribes = []
    }
    //натсраиваем наш компонент до init
    prepare() {

    }
    // Вовращает шаблон компонента
    toHtml() {
        return ''
    }

    $emit(event, ...args) {
        this.emitter.emit(event, ...args)
    }

    $on(event, fn) {
        const unsab = this.emitter.subscribe(event, fn)
        this.unsubscribes.push(unsab)
    }

    addClass() {
        return ''
    }
    // инициализируем компонент
    // добавляем DOM слушателей
    init() {
        this.initDomListeners()
    }
    // удаляем компонент
    // удаляем DOM слушателей
    destroy() {
        this.removeDomListeners()
        this.unsubscribes.forEach(unsub => unsub())
    }
}