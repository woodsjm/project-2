const mongoose = require('mongoose')

const travelerSchema = new mongoose.Schema({
	email: String,
	password: String
})

const Traveler = mongoose.model('Traveler', travelerSchema)

module.exports = Traveler