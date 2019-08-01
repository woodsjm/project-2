require('dotenv').config()

const express        = require('express')
const bodyParser     = require('body-parser')
const methodOverride = require('method-override')
const session        = require('express-session')
const superagent     = require('superagent')

const app            = express()
const PORT           = 3000


require('./db/db')



// ------ MIDDLEWARE ------ //
app.use(bodyParser.urlencoded({extended: false}))
app.use(methodOverride('_method'))

app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: false
}))

const adminController = require('./controllers/adminController')
app.use('/admin', adminController)

const investController = require('./controllers/investController')
app.use('/investor', investController)

const travelController = require('./controllers/travelController')
app.use('/traveler', travelController)

const bondController = require('./controllers/bondController')
app.use('/bonds', bondController)

const policyController = require('./controllers/policyController')
app.use('/policy', policyController)


app.use(express.static('public'));



// HOME PAGE ROUTE
app.get('/', (req, res) => {
  res.render('homepage.ejs');
});

app.listen(PORT, () => {
	console.log(`listening on PORT ${PORT}`);
})


