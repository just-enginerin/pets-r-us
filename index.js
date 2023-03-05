/*
============================================
; Title:  index.js
; Author: Erin Brady
; Date:   29 January 2023
; Description: Server and route file for Pets-R-Us app
;===========================================
*/

"use strict"

// Express, Mongoose and Node.js import statements
const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const fs = require('fs')

// import models
const Customer = require('./models/customers')
const Appointment = require('./models/appointments')

// Express app variable. Provides access to Express's built-in functions/classes.
// This creates the Express App
const app = express();

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Constant variable to hold the server port value. The first part checks to see if
// the "process.env" variable already has a port defined. If it does, that will be used;
// otherwise, we will use port 3000.
const PORT = process.env.PORT || 3000
const CONN = 'mongodb+srv://web340_admin:eR1TKnJPnq1aeKfI@bellevueuniversity.nhzwaya.mongodb.net/web340DB'

/**
 * Connect to Mongoose Database
*/
mongoose.connect(CONN).then(() => {
    console.log('Connection to MongoDB database was successful\n  If you see this message it means you were able to connect to your MongoDB Atlas cluster');
}).catch(err => {
    console.log('MongoDB Error: ' + err.message)
})

// App routes:
app.get('/', (req, res) => {
    res.render('index.ejs', {
        title: 'Pets-R-Us',
    })
})

app.get('/register', (req, res) => {
    res.render('register.ejs', {
        title: 'Pets-R-Us: Register',
    })
})

app.get('/grooming', (req, res) => {
    res.render('grooming.ejs', {
        title: 'Pets-R-Us: Grooming Services'
    })
})

app.get('/training', (req, res) => {
    res.render('training.ejs', {
        title: 'Pets-R-Us: Training Services'
    })
})

app.get('/boarding', (req, res) => {
    res.render('boarding.ejs', {
        title: 'Pets-R-Us: Boarding Services'
    })
})

app.post('/create-customer', (req, res, next) => {
    console.log(req.body)
    console.log(req.body.customerId)
    console.log(req.body.email)
    const newCustomer = new Customer({
        customerId: req.body.customerId,
        email: req.body.email
    })

    console.log(newCustomer)

    Customer.create(newCustomer, function(err) {
        if (err) {
            console.log(err)
            next(err)
        } else {
            res.render('index.ejs', {
                title: 'Pets-R-Us'
            })
            console.log("Successfully created a new Customer account!")
        }
    })
})

app.get('/customers', (req, res) => {
    Customer.find({}, (err, customers) => {
        if (err) {
            console.log(err)
            next(err)
        } else res.render('customer-list.ejs', {
            title: 'Pets-R-Us: Customer List',
            customers: customers
        })
    })
})

app.post('/create-appointment', (req, res, next) => {

    const newAppointment = new Appointment({
        userName: req.body.userName,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        service: req.body.service
    })

    console.log(newAppointment)

    Appointment.create(newAppointment, function(err) {
        if (err) {
            console.log(err)
            next(err)
        } else {
            res.render('index.ejs', {
                title: 'Pets-R-Us'
            })
            console.log("Successfully created a new appointment!")
        }
    })
})

app.get('/booking', (req, res) => {
    let jsonFile = fs.readFileSync('./public/data/services.json')
    let services = JSON.parse(jsonFile)

    console.log(services)

    res.render('booking.ejs', {
        title: 'Pets-R-Us: Book a New Appointment',
        services: services
    })
})

app.get('/appointments', (req, res) => {
    Appointment.find({}, (err, appointments) => {
        if (err) {
            console.log(err)
            next(err)
        } else {
            console.log(appointments)
            res.render('my-appointment.ejs', {
                title: 'Pets-R-Us: My Appointments',
                appointments: appointments
            })
        }
    })
})

app.get('/api/appointments/:email', async(req, res, next) => {
    Appointment.find({'email': req.params.email}, function(err, appointments) {
        if (err) {
            console.log(err)
            next(err)
        } else {
            res.json(appointments)
        }
    })
})

/**
 * Starts the server on port 3000.
 */
app.listen(PORT, () => {
    console.log('Pets-R-Us application started and listening on port ' + PORT);
})