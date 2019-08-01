const express = require('express')
const router = express.Router()
const Traveler = require('../models/traveler')
const Policy = require('../models/flightPolicy')
const superagent = require('superagent')

router.put('/', async (req, res, next) => {
	try {

		const foundTraveler = await Traveler.findById(req.body.travelerId)
		const foundPolicy = await Policy.findById(req.body.policyId)
		const url = `http://aviation-edge.com/v2/public/routes?key=${process.env.API_KEY}&departureIata=OTP&departureIcao=LROP&airlineIata=0B&airlineIcao=BMS&flightNumber=${foundPolicy.number}`

		const response = await superagent.get(url)

		console.log("unparsed RESPONSE:")
		console.log(response)

		const dataAsObj = JSON.parse(response.text)

		console.log('=============');
		console.log(dataAsObj, '< ----- dataAsObj after purchase');
		console.log('=============');


		const newFlight = {
			depAirport: dataAsObj[0].departureIata,
			depTime: dataAsObj[0].departureTime,
			flightNum: dataAsObj[0].flightNumber
		}

		console.log(newFlight, '<------- NEW FLIGHT INFO');

		foundTraveler.flights.push(newFlight)
		foundTraveler.products.push(foundPolicy)
		foundTraveler.save()
		console.log(foundTraveler.products, '<----- PRODUCTS')
		console.log(foundTraveler.flights, '<----- FLIGHTS');

		res.redirect('/traveler/' + req.body.travelerId)

	} catch (err) {
		next(err)
	}
});



module.exports = router;