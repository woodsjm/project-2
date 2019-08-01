const mongoose = require('mongoose')

const travelerSchema = new mongoose.Schema({
	email: String,
	password: String,
	validator: {
		type: String,
		enum: ['traveler']
	},
	products: [],
	flights: [Object]
	// {
	// 	departureIata: String,
	// 	departureTime: String,
	// 	flightNumber: String
	// }
})

const Traveler = mongoose.model('Traveler', travelerSchema)

module.exports = Traveler