/*
============================================
; Title:  index.js
; Author: Erin Brady
; Date:   29 January 2023
; Description: Server and route file for Pets-R-Us app
;===========================================
*/

"use strict"

// Express and Node.js import statements
const express = require('express');
const path = require('path');

// Express app variable. Provides access to Express's built-in functions/classes.
// This creates the Express App
const app = express();

// Tells Express that the views (ejs pages) are in the views' folder.
app.set('views', path.join(__dirname, 'views')); 

// Tells Express to use ejs as it's view engine.
app.set('view engine', 'ejs');

//app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));

// Constant variable to hold the server port value. The first part checks to see if
// the "process.env" variable already has a port defined. If it does, that will be used;
// otherwise, we will use port 3000.
const PORT = process.env.PORT || 3000;

// App routes:
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Pets-R-Us',
    })
})

app.get('/grooming', (req, res) => {
    res.render('grooming', {
        title: 'Grooming Services'
    })
})

app.get('/training', (req, res) => {
    res.render('training', {
        title: 'Training Services'
    })
})

app.get('/boarding', (req, res) => {
    res.render('boarding', {
        title: 'Boarding Services'
    })
})


/**
 * Starts the server on port 3000.
 */
app.listen(PORT, () => {
    console.log('Hello World application started and listening on port ' + PORT);
})