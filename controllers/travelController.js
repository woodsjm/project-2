const express = require('express')
const router = express()
const Traveler = require('../models/traveler')


// LOGIN ROUTE
router.get('/login', async (req, res, next) => {
	res.render('traveler/login.ejs')
})

router.post('/login', async (req, res, next) => {
	const logTraveler = await Traveler.findOne({email: req.body.email})
	console.log(logTraveler);

	if (!logTraveler) {
		console.log('user does not exist!');

		res.redirect('/traveler/login')
	} else {
		res.redirect('/traveler/' + logTraveler.id)
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
	
	try {
		
		const createdTraveler = await Traveler.create({
			email: req.body.email,
			password: req.body.password
		})

		console.log(createdTraveler);

		res.redirect('/traveler/' + createdTraveler.id)

	} catch (err) {
		next(err)
	}
})

// NEW ROUTE -- see flights to buy
router.get('/:id/new', async (req, res, next) => {

	try {
		const foundTraveler = await Traveler.findById(req.params.id)

		res.render('traveler/new.ejs', {
			traveler: foundTraveler
		})
	} catch (err) {
		next(err)
	}
})


// INDEX/HOME ROUTE -- search for flights
router.get('/:id/findflights', async (req, res, next) => {

	try {
		const foundTraveler = await Traveler.findById(req.params.id)

		res.render('traveler/home.ejs', {
			traveler: foundTraveler
		})

	} catch (err) {
		next(err)
	}
})

// SHOW ROUTE -- see all flights
router.get('/:id', async (req, res, next) => {

	try {

		const foundTraveler = await Traveler.findById(req.params.id)
		console.log(foundTraveler);
		res.render('traveler/show.ejs', {
			traveler: foundTraveler
		})

	} catch (err) {
		next(err)
	}


})






module.exports = router