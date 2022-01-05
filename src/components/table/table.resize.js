import {$} from "../../core/dom"

export function resizeHandler ($root ,event) {
    const $resizer = $(event.target)
    const $parent = $resizer.closest('[data-type="resizable"]')
    let indElem = $parent.$el.dataset.index
    let columnAll = $root.findAll(`[data-index="${indElem}"]`)
    let elemWidth = $parent.getCoards().width
    let elemRight = $parent.getCoards().right
    let currentWidth
    let value
    let parentBottom = $parent.getCoards().bottom
    let parentHeight = $parent.getCoards().height
    $resizer.css({'opacity': '1'})
    if(event.target.dataset.resize === 'col') {
        $resizer.css({'height': '100vh'})
    } else {
        $resizer.css({'width': '100vw'})
    }
    document.onmousemove = (e) => {
        if(event.target.dataset.resize === 'col') {
            let currentSizeValue = e.clientX - elemRight
            currentWidth = elemWidth + currentSizeValue
            $resizer.css({'right': - currentSizeValue + 'px'})
        } else {
            let valueSize = e.clientY - parentBottom
            value = parentHeight + valueSize
            $resizer.css({'bottom': - valueSize + 'px'})
        }
    }
    document.onmouseup = () => {
       document.onmousemove = null
       $resizer.css({'opacity': '0'})
       if(event.target.dataset.resize === 'col') {
            $parent.css({'width': currentWidth + 'px'})
            columnAll.forEach(col => $(col).css({'width': currentWidth + 'px'})) 
            $resizer.css({'right': 0 + 'px', 'height': '100%'})
       } else {
            $parent.css({'height': value + 'px'})
            $resizer.css({'bottom': 0 + 'px', 'width': '100%'})
       }
    }
}