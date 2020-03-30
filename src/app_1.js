//static assets class 


const path = require('path') //to see directories 
const express = require('express') //express is a librery thta what has is a finction

const app = express()

//check the paths:
//console.log(__dirname)
//console.log(__filename)
//console.log(path.join(__dirname, '../public'))

//google.com  : ('', callback())
//google.com/gmail: ('/gmail', callback())
//google.com/calendar: ('/calendar', callback())

//get() : this method allows us to set what the server has to do when someone (user) try to get the resources at specific URL 
//req: this object has info about the incoming request to the server
//res: this object has a bunch of methods that allows us to customize what we want to send back to the requester


//route 1
app.get('', (req, res) => {
//the callback body: will describe what to do when the user try to visit the home page (,url, route)

res.send('Hello express!')

})

//route 2
app.get('/help', (req, res) => {
    res.send({"name": "vilmarys", "age": 32 //sending to the client a json 
}) 
})

//route 3
app.get('/about', (req, res) => {
    res.send('wellcome to the about page!')
}) 

//route 4
app.get('/weather', (req, res) => {
    res.send('<h1>weather</h1>') //sending to the client a html
})

//route 5
app.get('/profile', (req, res) => {
    res.send([{
        "name": "marius",
        "age": 36,
        "address": "Belmayne"
    }]) //sending to the client a html
})


//start the server
//C:\Users\VRAI_Team\Desktop\NODE-COURSE\web-server> node src/app.js
// C:\Users\VRAI_Team\Desktop\NODE-COURSE\web-server> nodemon src/app.js
//localhost:3000 in the browser

// to inspect in console: https://developers.google.com/web/tools/chrome-devtools/open
app.listen(3000, () => {
    console.log('server is up on port: 3000')
})


//to run this file PS C:\Users\VRAI_Team\Desktop\NODE-COURSE\web-server> nodemon src/app.js
//express looks for templates .hbs in views folder by defaul in the root folder, to cutomize it i need to create a brand new path to tell express where is my template 
//command to tell nodemon to restart when making changes outside .js extension 
//nodemon src/app.js -e js,hbs