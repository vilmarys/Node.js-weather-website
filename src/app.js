const path = require('path') //to see directories  (core modules goes first)
const express = require('express') //express is a librery thta what has is a finction // external modules after
const hbs = require('hbs') //to use partials
const request = require('request')
const geocode = require('../src/utils/geocode')
const forecast = require('../src/utils/forecast') // (./utils/forecast)


//__dirname: path to the folder this file lives in


const app = express() //instance of express
//define paths for express config
//paths to the assets inside a variable
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath  = path.join(__dirname, '../templates/views') // ../templates : instead going to public go directly to template (/public/templates)
const partialsPath  = path.join(__dirname, '../templates/partials') //this path will get handlers bar to the right directory



//setup static directory to server
//routes given to express server
app.use(express.static(publicDirectoryPath))
const port = process.env.PORT || 3000 //(PORT: for heroku, 3000 to run locally)


//set: set a value for a givem express setting, (key: view engine, value: hbs). hbs is the npm library nam to create dynamic tamplates (for style)
//the value to set a view engine like espress is : view engine has to be written like that.

//setup handlebars engine and views location
app.set('view engine', 'hbs') //passinhg to express a hbs engine
app.set('views', viewsPath) //to give espress the path whre lives the templates
hbs.registerPartials(partialsPath) //the path to the partials directory

//set : is a route handlerer
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Vilmarys Salgado'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title:'About',
        name: 'Vilmarys Salgado'
    })
})

app.get('/help', (req, res) => {
    res.render('help', { // file i need to find to return to client
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Vilmarys Salgado'
    })
    
})

// app.get('/weather', (req, res) => {
//     res.send({"forecast": 13,
//     "location": "Dublin"})
// })

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'enter an address'
        })
    }

    //using destrucvturing and shorthand
    //typeError: Cannot destructure property `latitude` of 'undefined' or 'null'.
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if(error) {
            return res.send({ error}) //shorthand
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({ error })
            }
            
            //properties that i need to send back
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })

        })
    })

    // res.send({
    //     forecast: 13,
    //     location: 'Dublin',
    //     address: req.query.address //to pass addres in the link 
    // })
})

app.get('/products', (req,res) => {
if(!req.query.search) {
    return res.send({
        error: 'you must provide a search term'
    })
}

    console.log(req.query.search)

    res.send({
        products: []
    })
})

//to set a handler a request to unexisting page
// : * wildcard to match all 
//404 routes

app.get('/help/*', (req, res) => {
    res.render('404', 
    {title: '404',
    name: "Vilmarys Salgado",
    errorMessage: "help article not found!"})
})

app.get('*', (req, res) => {
    res.render('404', 
    {title: '404',
    name: "Vilmarys Salgado",
    errorMessage: "Page not found"
    })
})


//starting express server
app.listen(port, () => {
    console.log('server is up on port:'+ port)
})


//to run this file: PS C:\Users\VRAI_Team\Desktop\NODE-COURSE\web-server> nodemon src/app.js