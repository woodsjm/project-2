const mongoose = require('mongoose')

const flightPolicySchema = new mongoose.Schema({
	number: Number,
	departureDate: Date,
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Investor'
	},
	bond: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Bonds'
	},
	available: Boolean,
	date: Date
})

const FlightPolicy = mongoose.model('FlightPolicy', flightPolicySchema)

module.exports = FlightPolicy