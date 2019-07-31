const mongoose = require('mongoose')

const bondSchema = new mongoose.Schema({
	principle: Number,
	maturity: Number,
	coupon: Number,
	date: Date,
	user: {
		type: Schema.Types.ObjectId,
		ref: 'Investor'
	},
	issued: {
		type: Boolean,
		default: false
	}
})

const Bonds = mongoose.model('Bonds', bondSchema)

module.exports = Bonds