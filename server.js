const express = require('express')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session')

const app = express()
const PORT = 3000

require('./db/db')


// ------ MIDDLEWARE ------ //
app.use(bodyParser.urlencoded({extended: false}))
app.use(methodOverride('_method'))

app.use(session({
	secret: SESSION_SECRET,
	resave: false,
	saveUninitialized: false
}))


app.listen(PORT, () => {
	console.log(`listening on PORT ${PORT}`);
})