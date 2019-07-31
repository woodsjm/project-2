const mongoose = require('mongoose')

const flightPolicySchema = new mongoose.Schema({
	flightInfo: {
		number: Number,
		departureDate: Date
	}, 
	user: {
		type: Schema.Types.ObjectId,
		ref: 'Investor'
	},
	bond: {
		type: Schema.Types.ObjectId,
		ref: 'Bonds'
	},
	available: Boolean,
	date: Date
})

const FlightPolicy = mongoose.model('FlightPolicy', flightPolicySchema)

module.exports = FlightPolicy