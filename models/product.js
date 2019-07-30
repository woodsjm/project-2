const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
	price: '$5',
	payout: '$30',
	travelWindowByMonth: Number,
	flightNumber: String
})