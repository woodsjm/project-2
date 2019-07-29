require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session')
const superagent = require('superagent')

const app = express()
const PORT = 3000

require('./db/db')


// ------ MIDDLEWARE ------ //
app.use(bodyParser.urlencoded({extended: false}))
app.use(methodOverride('_method'))

// app.use(session({
// 	secret: SESSION_SECRET,
// 	resave: false,
// 	saveUninitialized: false
// }))

app.get('/', (req, res, next) => {
  //const url = `https://api.openweathermap.org/data/2.5/weather?zip=60601&units=imperial&appid=${process.env.API_KEY}`
  const url = `http://aviation-edge.com/v2/public/routes?key=${process.env.API_KEY}&departureIata=OTP&departureIcao=LROP&airlineIata=0B&airlineIcao=BMS&flightNumber=1015`
  console.dir(url);
  superagent
    .get(url)
    .end((error, response) => {
      if(error) next(error);
      else {
        const dataAsObj = JSON.parse(response.text)
        console.dir(dataAsObj)


        res.send('API IS HERE')
      }
    })
});


app.get('/', (req, res) => {
  res.render('test.ejs');
});

app.listen(PORT, () => {
	console.log(`listening on PORT ${PORT}`);
  console.dir(process.env)
})