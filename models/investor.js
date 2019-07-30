const mongoose = require('mongoose')

const investorSchema = new mongoose.Schema({
	email: String,
	password: String,
	validator: {
		type: String,
		enum: ['investor']
	}
})

const Investor = mongoose.model('Investor', investorSchema)

module.exports = Investor