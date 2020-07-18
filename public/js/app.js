console.log('Client side script')


// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })

fetch('http://127.0.0.1:3433/weather?address=boston').then((response) => {
    response.json().then((data) => {
        if (data.error) {
            console.log(data.error)
        } else {
            console.log(data.location)
            console.log(data.forecast[0])
        }
    })
})

// Load the form elemet [java script representation of that element will be returnd]
const weatherForm = document.querySelector('form')

// capture input
const search = document.querySelector('input')

// the paragraph
const messageOne = document.querySelector('#message-1')

const messageTwo = document.querySelector('#message-2')

// event listener is the actual activity : 'name of the event' 'callback [what to do with it]'
weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()

    // get the value entered on search 
    const location = search.value

    messageTwo.textContent = 'Loading ...'
    messageTwo.textContent = ""

    fetch('http://127.0.0.1:3433/weather?address=' + location).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            // console.log(data.error)
            messageOne.textContent = data.error
            messageTwo.textContent = ""
        } else {
            // console.log(data.location)
            // console.log(data.forecast[0])
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast[0]
        }
    })
})

})