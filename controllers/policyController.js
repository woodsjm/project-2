const express = require('express')
const router = express.Router()
const Traveler = require('../models/traveler')
const Policy = require('../models/flightPolicy')

router.put('/', async (req, res, next) => {
 try {

  const foundTraveler = await Traveler.findById(req.body.travelerId)
  const foundPolicy = await Policy.findById(req.body.policyId)

  foundTraveler.products.push(foundPolicy)
  foundTraveler.save()
  console.log(foundTraveler.products)
  res.redirect('/traveler/' + req.body.travelerId)
 } catch (err) {
  next(err)
 }
});



module.exports = router;