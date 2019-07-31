const express = require('express')
const router = express()
const Admin = require('../models/admin')
const Bond = require('../models/bonds')


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

		res.render('admin/new.ejs')

	} catch (err) {
		next(err)
	}
})

// CREATE BOND
router.post('/', async (req, res, next) => {
	try {
		console.log(req.body, '<-- req.body');
		console.log('---------------------');
		const createdBond = await Bond.create({
			bondName: req.body.bondName,
			principle: req.body.principle,
			maturity: req.body.maturityInMonths,
			coupon: req.body.monthlyCoupon
		})
		console.log('-----------');
		console.log(createdBond, '<-- createdBond');
		console.log('------------');

		res.redirect('/admin')

	} catch (err) {
		next(err)
	}
})



// SHOW ROUTE
router.get('/', (req, res, next) => {
	
	try {

		res.render('admin/show.ejs')

	} catch (err) {
		next(err)
	}
})




module.exports = router

