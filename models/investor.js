const mongoose = require('mongoose')

const investorSchema = new mongoose.Schema({
	email: String,
	password: String
})

const Investor = mongoose.model('Investor', investorSchema)

module.exports = Investor