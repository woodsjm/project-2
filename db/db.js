const mongoose = require('mongoose')

// const connectionString = 'mongodb://localhost/flight-delay'

let connectionString

if (process.env.NODE_ENV == "production") {
	connectionString = process.env.DB_URL
} else {
	connectionString = 'mongodb://localhost/flight-delay'
}


mongoose.connect(connectionString, {
	useNewUrlParser: true
})

mongoose.connection.on('connected', () => {
	console.log(`mongoose is connected to ${connectionString}`);
})

mongoose.connection.on('disconnected', () => {
	console.log(`mongoose is disconnected to ${connectionString}`);
})

mongoose.connection.on('error', (error) => {
	console.log(`mongoose is connected to ${error}`);
})