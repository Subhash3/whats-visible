// @ts-check

console.log("nice")

let state = {
    blurMessages: true,
    blurContacts: true
}

/**
 * @param {any} element
 * @param {boolean} [value]
 */
function blurElement(element, value) {
    let blurRadius
    if(value){
        blurRadius = 7
    }else{
        blurRadius = 0
    }

    element.style.filter = `blur(${blurRadius}px)`
    // element.style.border = "2px solid red";
    element.addEventListener("mouseover", (/** @type {any} */ e) => {
        // console.log("mouseover")
        element.style.filter = "blur(0px)"
    })

    element.addEventListener("mouseout", (/** @type {any} */ e) => {
        // console.log("mouseout")
        element.style.filter = `blur(${blurRadius}px)`
    })
}

function changeContactBlur(){
    const chatList = document.querySelector("[aria-label='Chat list']")

    const contacts = [...chatList.children]
    contacts.forEach(contact => {
        blurElement(contact)

        contact.addEventListener("click", (e) => {
            // console.log("click")
            changeMessageBlur()
        })
    })
}

function changeMessageBlur() {
    const chatPanel = document.querySelector("[data-testid='conversation-panel-messages']")
    const messages = chatPanel.querySelectorAll("[data-testid='msg-container']")

    console.log(messages[0])

    messages.forEach(msg => {
        blurElement(msg, state.blurMessages)
    })
}



function main(){
    console.log("main")
    // const paneSide = document.querySelector("#pane-side")
    changeContactBlur()
}

window.addEventListener("load", function load(event){
    window.removeEventListener("load", load, false);
    setTimeout(() => {
        main()
    }, 10000)
},false);