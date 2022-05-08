class Dom {
    constructor(selector) {
        this.$el = typeof selector === 'string'
            ? document.querySelector(selector)
            : selector
        this.data = this.$el.dataset
    }

    html(html) {
        if (typeof html === 'string') {
            this.$el.innerHTML = html
            return this
        }
        return this.$el.outerHTML.trim()
    }

    text(text) {
        if(typeof text === 'string') {
            this.$el.textContent = text
            return this.$el
        } else {
            if(this.$el.tagName === 'input'){
                return this.$el.value.trim()
            } else {
                return this.$el.textContent.trim()
            }
        }
    }

    clear() {
        this.html('')
        return this
    }

    on(eventType, callback) {
        this.$el.addEventListener(eventType, callback)
    }

    off(eventType, callback) {
        this.$el.removeEventListener(eventType, callback)
    }

    append(node) {
        if (node instanceof Dom) {
            node = node.$el
        }
        if (Element.prototype.append) {
            this.$el.append(node)
        }
        this.$el.appendChild(node)
    }
    closest(selector) {
        return $(this.$el.closest(selector))
    }

    getAttribute(attribute) {
        return this.$el.getAttribute(attribute)
    }

    getCoards() {
        return this.$el.getBoundingClientRect()
    }

    find(selector) {
        return $(this.$el.querySelector(selector))
    }

    findAll(selector) {
        return this.$el.querySelectorAll(selector)
    }

    addClass(className) {
        return this.$el.classList.add(className)
    }

    removeClass(className) {
        return this.$el.classList.remove(className)
    }

    css(styles = {}) {
        Object
            .keys(styles)
            .forEach(key => this.$el.style[key] = styles[key])
    }
    contains(className) {
        return this.$el.classList.contains(className)
    }
    focus() {
        this.$el.focus()
        return this
    }
    id(parse) {
        if (parse) {
            const parsed = this.id().split(':')
            return {
                row: +parsed[0],
                col: +parsed[1]
            }
        }
        return this.data.id
    }
}

export function $(selector) {
    return new Dom(selector)
}

$.create = (tagName, classes = '') => {
    const el = document.createElement(tagName)
    if (classes) {
        el.classList.add(classes)
    }
    return $(el)
}