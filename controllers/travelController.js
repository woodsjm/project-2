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

	res.redirect('/traveler')
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

		res.redirect('/traveler')

	} catch (err) {
		next(err)
	}

})


// INDEX ROUTE
router.get('/', async (req, res, next) => {

	try {
		res.render('traveler/home.ejs')

	} catch (err) {
		next(err)
	}
})






module.exports = router