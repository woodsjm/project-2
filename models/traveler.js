const mongoose = require('mongoose')

const travelerSchema = new mongoose.Schema({
	email: String,
	password: String,
	validator: {
		type: String,
		enum: ['traveler']
	},
	products: []
})

const Traveler = mongoose.model('Traveler', travelerSchema)

module.exports = Traveler