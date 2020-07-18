const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const argv = require('argv')

// core modules
const path = require('path')

// extra module
const express = require('express')

// load hbs
const hbs = require('hbs')

// instantiate express
const app = express()



// tell to use public dir
const publicDirectoryPath = path.join(__dirname, '../public')

// express set a specific value for "view engine"
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
app.set('views', viewsPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

// setup static directory location
app.use(express.static(publicDirectoryPath))

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather Server',
        name: 'sk'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'about me',
        name: 'sk'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'the help page',
        name: 'sk'
    })
})

// app.get('/help/*', (req,res) => {
//     res.redirect('/help')
// })

app.get('/help/*', (req,res) => {
    res.render('default', {
        title: 'This help page doesn\'t exist :('
    })
})

app.get('/weather', (req,res) => {
    if (!req.query.address) {
        return res.send({
            error: "You have to provide a ?address"
        })
    }
    geocode(req.query.address, (error, {longitude, latitude, location} = {}) => {

        if (error) {
           return res.send({error})
        }
    
        forecast(longitude, latitude, (error, {forecastText}) => {
     
            if (error) {
                return res.send({error})
             }
          
          res.send({
              location: location,
              forecast: forecastText
          })
        })  
    })
})

app.get('/products', (req,res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide a"
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('*', (req,res) => {
    res.render('default', {
        title: 'This page doesn\'t exist'
    })
})

//app.com
//app.com/about
//app.com/help

app.listen(3433, () => {
    console.log("The server is running")
})