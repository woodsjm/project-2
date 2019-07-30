const express = require('express')
const router = express()


// LOGIN/REGISTER ROUTE
router.get('/login', async (req, res, next) => {
	res.render('traveler/login')
})

// // INDEX ROUTE
// router.get('/', async (req, res, next) => {

// 	try {
// 		res.render('traveler/home')

// 	} catch (err) {
// 		next(err)
// 	}
// })






module.exports = router