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
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

// import Customer model
const Customer = require('./models/customers')

// Express app variable. Provides access to Express's built-in functions/classes.
// This creates the Express App
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

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
    console.log('MongoDB Error: ' + err.message);
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
    console.log(req.body);
    console.log(req.body.customerId);
    console.log(req.body.email)
    const newCustomer = new Customer({
        customerId: req.body.customerId,
        email: req.body.email
    })

    console.log(newCustomer);

    Customer.create(newCustomer, function(err, customer) {
        if (err) {
            console.log(err);
            next(err);
        } else {
            res.render('index.ejs', {
                title: 'Pets-R-Us'
            })
        }
    })
})

app.get('/customers', (req, res) => {
    Customer.find({}, (err, customers) => {
        if(err) {
            console.log(err)
            next(err)
        } else res.render('customer-list.ejs', {
            title: 'Pets-R-Us: Customer List',
            customers: customers
        })
    })
})

/**
 * Starts the server on port 3000.
 */
app.listen(PORT, () => {
    console.log('Pets-R-Us application started and listening on port ' + PORT);
})