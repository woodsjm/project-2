const express = require('express')
const router = express()
const Admin = require('../models/admin')
const Bond = require('../models/bonds')
const Policy = require('../models/flightPolicy')


// LOGIN ROUTE
router.get('/login', async (req, res, next) => {
	
	try {

		res.render('admin/login.ejs')

	} catch (err) {
		next(err)
	}
})

router.post('/login', async (req, res, next) => {
	
	try {
		console.log(req.body);
		const foundAdmin = await Admin.find({username: req.body.username})
		console.log(foundAdmin);

		if (!foundAdmin) {
			console.log('You are not an administrator');

			res.redirect('/admin/login')
		} else {
			res.redirect('/admin')
		}

	} catch (err) {
		next(err)
	}
})

// CREATE/REGISTER ADMIN ROUTE
router.get('/register', (req, res, next) => {
	
	try {
		res.render('admin/register.ejs')
	} catch (err) {
		next(err)
	}
})

router.post('/register', async (req, res, next) => {
	
	try {

		const createdAdmin = await Admin.create({
			username: req.body.username,
			password: req.body.password
		})

		res.redirect('/admin')

	} catch (err) {
		next(err)
	}
})

// NEW BOND PAGE ROUTE
router.get('/newbond', async (req, res, next) => {
	try {

		res.render('admin/new-bonds.ejs')

	} catch (err) {
		next(err)
	}
})

// CREATE BOND
router.post('/', async (req, res, next) => {
	try {
		const newBond = {}
		newBond.bondName = req.body.bondName;
		newBond.principle = req.body.principle;
		newBond.maturity = req.body.maturity;
		newBond.coupon = req.body.coupon;

		const createdBond = await Bond.create(newBond)
		console.log('-----------');
		console.log(createdBond, '<-- createdBond');
		console.log('------------');


		res.redirect('/admin')

	} catch (err) {
		next(err)
	}
})

// NEW POLICY PAGE ROUTE
router.get('/newpolicy', async (req, res, next) => {

	try {
		const allBonds = await Bond.find({})
		res.render('admin/new-policy.ejs', {
			bonds: allBonds
		})
	} catch (err) {
		next(err)
	}
})

// CREATE POLICY
router.post('/newpolicy/create', async (req, res, next) => {
	try {
		const newPolicy = {
			flightInfo: {
				number: req.body.number,
				departureDate: req.body.departureDate
			},
			bond: req.body.bondId
		}

		const createdPolicy = await Policy.create(newPolicy);
		console.log('---------------');
		console.log(createdPolicy, '<-- createdPolicy');
		console.log('---------------');

	} catch (err) {
		next(err)
	}
})



// SHOW ROUTE
router.get('/', async (req, res, next) => {
	
	try {
		const allBonds = await Bond.find({})

		res.render('admin/show.ejs', {
			bonds: allBonds
		})

	} catch (err) {
		next(err)
	}
})




module.exports = router

