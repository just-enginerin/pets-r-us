/*
============================================
Title: appointments.js
Author: Erin Brady
Date: 24 February 2023
Description: Appointment Model for MongoDB database
============================================
*/

const mongoose = require('mongoose')

let appointmentSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    service: { type: String, required: true }
})

module.exports = mongoose.model('Appointment', appointmentSchema)
