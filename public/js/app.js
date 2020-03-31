console.log('client side javascript filed is loaded!')

//this code should be able to fetch the forecast information

//fetching API 

// fetch('http://puzzle.mead.io/puzzle'). then((response) => { //fetching the data 
//     response.json().then((data) => { //parsing into a javascript object
//         console.log(data) //priting the object
//     })
// })



const weatherForm = document.querySelector('form') //to connect with the JavaScript form

//to grab the object the user pass in the input
const search = document.querySelector('input') //to target by element from the html (hbs)

const messageOne = document.querySelector('#message-1') //to target by id 
const messageTwo = document.querySelector('#message-2')

//messageOne.textContent = 'from javaScript'


//setting up an event listener
//args(1: 'submit' the name of the event we trying to listen for, 2: a callback funtion)
weatherForm.addEventListener('submit', (event) => {
    event.preventDefault() //to prevent the page for restarting(redering the whole page in form submission ) 

    const location = search.value  //this has the value passed in the form (the location)

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    //making chages for heroku 
    fetch('/weather?address=' + location).then((response) => {
    response.json().then((data) => {
        if(data.error) {
            messageTwo.textContent = data.error
        } else {
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
            // console.log(data.location)
            // console.log(data.forecast)
        }
    })
})
})

