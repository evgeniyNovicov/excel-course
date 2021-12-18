import { capitalize } from "./utils"

export class DomListener {
    constructor($root, listeners = [] ) {
        if(!$root) {
            throw new Error ('No $root provided DomListener')
        }
        this.$root = $root
        this.listeners  = listeners
    }

    initDomListeners() {
            this.listeners.forEach(listener => {  
                const method = getMethodName(listener) 
                if(!this[method]) {
                    const name = this.name || ''
                    throw new Error(`This method ${method} is not emplemented in ${name} component`)
                }  
                this[method] = this[method].bind(this)
                // тоже самое что и eventListener
                this.$root.on(listener, this[method])
            })
    }

    removeDomListeners() {
        this.listeners.forEach(listener => {
            const method = getMethodName(listener)
            this.$root.off(listener, this[method])
        })
    }
}

// изменяем input на onInput  
function getMethodName(eventName) {
    return 'on' + capitalize(eventName)
}