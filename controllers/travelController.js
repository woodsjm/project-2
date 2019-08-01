const express = require('express')
const router = express.Router()
const Traveler = require('../models/traveler')
const superagent = require('superagent')
const Policy = require('../models/flightPolicy')
const bcrypt = require('bcryptjs')


// LOGIN ROUTE
router.get('/login', async (req, res, next) => {
	res.render('traveler/login.ejs')
})

router.post('/login', async (req, res, next) => {
	const logTraveler = await Traveler.findOne({email: req.body.email})
	console.log(logTraveler);

	if (logTraveler) {

		if (bcrypt.compareSync(req.body.password, logTraveler.password) === true) {

			req.session.travelerId = logTraveler._id
			req.session.email = logTraveler.email
			req.session.loggedIn = true
			req.session.traveler = true

			res.redirect('/traveler/' + logTraveler.id)

		} else {
			res.redirect('/traveler/login')
		}

	} else {
		res.redirect('/traveler/login')
	}
})

// LOGOUT ROUTE
router.post('/logout', (req, res, next) => {
	try {
		res.redirect('/traveler/login')

	} catch (err) {
		next(err)
	}
})

// REGISTER ROUTE
router.get('/register', async (req, res, next) => {
	res.render('traveler/register.ejs')
})

router.post('/register', async (req, res, next) => {

	const password = req.body.password
	const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
	req.body.password = hashedPassword
	
	try {

		
		const createdTraveler = await Traveler.create(req.body)

		req.session.travelerId = createdTraveler._id
		req.session.email = createdTraveler.email
		req.session.loggedIn = true

		console.log(createdTraveler);

		res.redirect('/traveler/' + createdTraveler.id)

	} catch (err) {
		next(err)
	}
})

// NEW ROUTE -- see flights to buy
router.get('/:id/new', async (req, res, next) => {

	console.log(req.body, '<--- req.body');
	console.log(req.query, '<--- req.query');

	try {
		if (req.session.loggedIn === true) {
			const foundTraveler = await Traveler.findById(req.params.id)
			const allPolicies = await Policy.find({})
			const foundPolicy = await Policy.findOne({number: req.query.number})
			console.log(foundPolicy, '<-- foundPolicy');
			console.log(allPolicies, '<-- allPolicies');

			if (foundPolicy.number == req.query.number) {

				// const url = `http://aviation-edge.com/v2/public/routes?key=${process.env.API_KEY}&departureIata=OTP&departureIcao=LROP&airlineIata=0B&airlineIcao=BMS&flightNumber=${req.query.flight}`
				// superagent.get(url).end((error, response) => {
				// 	if (error) next (error)
				// 	else {
						// const dataAsObj = JSON.parse(response.text)
						// console.log(dataAsObj, "<-- dataAsObj");

						// res.send(dataAsObj)

						res.render('traveler/new.ejs', {
							traveler: foundTraveler,
							policies: allPolicies,
							policy: foundPolicy
							// flightData: dataAsObj
						})
					// }
				// })

			} else {
				res.send('That flight does not have a policy')
			}
		}

	} catch (err) {
		next(err)
	}
})


// INDEX/HOME ROUTE -- search for flights
router.get('/:id/findflights', async (req, res, next) => {

	try {
		if (req.session.loggedIn === true) {
			const foundTraveler = await Traveler.findById(req.params.id)

			res.render('traveler/home.ejs', {
				traveler: foundTraveler
			})
		}

	} catch (err) {
		next(err)
	}
})

// SHOW ROUTE -- see all flights
router.get('/:id', async (req, res, next) => {

	try {
		if (req.session.loggedIn === true) {
			const foundTraveler = await Traveler.findById(req.params.id)
			console.log(foundTraveler);
			res.render('traveler/show.ejs', {
				traveler: foundTraveler
			})
		}

	} catch (err) {
		next(err)
	}

})


module.exports = router


