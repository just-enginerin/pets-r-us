/*
============================================
Title: customers.js
Author: Erin Brady
Date: 10 February 2023
Description: Customer Model for MongoDB database
============================================
*/

const mongoose = require('mongoose')

let customerSchema = new mongoose.Schema({
    customerId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true }
})

module.exports = mongoose.model('Customer', customerSchema)
