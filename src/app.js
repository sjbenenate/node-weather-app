const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const port = process.env.PORT || 3000

const server = express()

/** Create Directory Paths */
const publicDir = path.join(__dirname,'../public')
const viewsDir = path.join(__dirname, '../templates/views')
const partialsDir = path.join(__dirname, '../templates/partials')

/** Setup Handlebars view engine */
server.set('view engine', 'hbs')
server.set('views', viewsDir)
hbs.registerPartials(partialsDir)

/** Set Public Directory */
server.use(express.static(publicDir))

const name = 'Sarah Benenate'

/** Page Routing */
server.get('/', (req, res)=>{
    res.render('index', {
        title: 'Weather',
        moto: 'Get your forecast here!',
        name
    })
})

server.get('/help', (req, res)=>{
    res.render('help', {
        title: 'Help',
        message: 'If you really need help, call 911.',
        name
    })
})

server.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About Me',
        name: 'Sarah Joy Benenate',
        name
    })
})


// Help Article 404 Page
server.get('/help/*', (req, res) => {
    res.render('404.hbs', {
        title: 'Help 404',
        message: 'Help article not found.',
        name
    })
})

server.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'Address must be provided.'
        })
    }

    geocode(req.query.address, (error, geocodeData) => {
        if(error) {
            return res.send({
                error
            })
        }
        forecast(geocodeData.latitude, geocodeData.longitude, (error, forecastData )=> {
            if(error) {
                return res.send({
                    error
                })
            }
            res.send({
                forecast: forecastData,
                location: geocodeData.location
            })
        })
    })
})

// 404 Page for all routes not handled above
server.get('*', (req, res) => {
    res.render('404.hbs', {
        title: '404',
        message: 'What you are looking for has not been found.',
        name
    })
})

// Start server last
server.listen(port, () => {
    console.log('Server running on port '+ port)
})


