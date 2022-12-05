// @ts-check

console.log("nice")

let state = {
    blurMessages: true,
    blurContacts: true,
    blurConversationHeader: true
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

function changeConversationHeaderBlur() {
    const conversationHeader = document.querySelector("[data-testid='conversation-header']")

    blurElement(conversationHeader, state.blurConversationHeader)
}

function changeContactBlur(){
    const chatList = document.querySelector("[aria-label='Chat list']")

    const contacts = [...chatList.children]
    contacts.forEach(contact => {
        blurElement(contact, state.blurContacts)

        contact.addEventListener("click", (e) => {
            // console.log("click")
            setTimeout(() => {
                changeMessageBlur()
                changeConversationHeaderBlur()
            }, 100)
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


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function tryUntilLoaded() {
    while(true){
        let paneSide = document.querySelector("#pane-side")
        if(!paneSide){
            await sleep(1000)
        }else{
            return
        }
    }
}

window.addEventListener("load", function load(event){
    window.removeEventListener("load", load, false);
    tryUntilLoaded().then(() => {
        main()
    })
},false);