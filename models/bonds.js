const mongoose = require('mongoose')

const bondSchema = new mongoose.Schema({
	bondName: String,
	principle: Number,
	maturity: Number,
	coupon: Number,
	date: {
		type: Date,
		default: Date.now
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Investor'
	},
	issued: {
		type: Boolean,
		default: false
	}
})

const Bonds = mongoose.model('Bonds', bondSchema)

module.exports = Bonds