const mongoose = require('mongoose')


const adminSchema = new mongoose.Schema({
	email: String,
	password: String,
	validator: {
		type: String,
		enum: ['admin']
	}
})

const Admin = mongoose.model('Admin', adminSchema)

module.exports = Admin