const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
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

		const foundAdmin = await Admin.findOne({username: req.body.username})
		console.log('-------------');
		console.log(foundAdmin, '<--- foundAdmin');
		console.log('-------------');


		if (foundAdmin) {

			if (bcrypt.compareSync(req.body.password, foundAdmin.password) === true) {
				req.session.adminId = foundAdmin._id
				req.session.username = foundAdmin.username
				req.session.loggedIn = true
				req.session.admin = true

				res.redirect('/admin')

			} else {
				console.log('you are not an administrator');

				res.redirect('/admin/login')
			}

		} else {
			console.log('you are not an administrator');

			res.redirect('/admin/login')
		}

	} catch (err) {
		next(err)
	}
})

// LOGOUT ROUTE
router.get('/logout', (req, res, next) => {
	try {

		req.session.destroy()
		console.log('See you next time')

		res.redirect('/admin/login')

	} catch (err) {
		next(err)
	}
})

// CREATE/REGISTER ADMIN ROUTE
router.get('/register', (req, res, next) => {
	
	try {

		// if (req.session.loggedIn === true) {
			res.render('admin/register.ejs')
		// } else {
			// req.session.message = "Must be logged in to register a new administrative account"

			// console.log('must be logged in to do that');

			// res.redirect('/admin/login')
		// }

	} catch (err) {
		next(err)
	}
})

router.post('/register', async (req, res, next) => {

	const password = req.body.password;

	const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
	console.log(hashedPassword, '<-- hashedPassword');

	req.body.password = hashedPassword
	console.log(req.body.password);
	
	try {

		const createdAdmin = await Admin.create(req.body)
		console.log(createdAdmin);

		req.session.userId = createdAdmin._id
		req.session.username = createdAdmin.username
		req.session.loggedIn = true
		req.session.admin = true

		res.redirect('/admin')

	} catch (err) {
		next(err)
	}
})

// NEW BOND PAGE ROUTE
router.get('/newbond', async (req, res, next) => {
	try {
		if (req.session.admin === true) {
			res.render('admin/new-bonds.ejs')
		} else {
			res.send('You are not an administrator')
		}

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
		if (req.session.admin === true) {
			const allBonds = await Bond.find({})
			res.render('admin/new-policy.ejs', {
				bonds: allBonds
			})
		} else {
			res.send('You are not an administrator')
		}
	} catch (err) {
		next(err)
	}
})

// CREATE POLICY
router.post('/newpolicy/create', async (req, res, next) => {
	try {
		const newPolicy = {}

		newPolicy.number = req.body.number
		newPolicy.bond = req.body.bondId

		const createdPolicy = await Policy.create(newPolicy);
		console.log('---------------');
		console.log(createdPolicy, '<-- createdPolicy');
		console.log('---------------');

		res.redirect('/admin');
	} catch (err) {
		next(err)
	}
})



// SHOW ROUTE
router.get('/', async (req, res, next) => {
	
	try {
		if (req.session.admin === true) {
			const allBonds = await Bond.find({})

			res.render('admin/show.ejs', {
				bonds: allBonds
			})
		} else {
			res.send('You are not an administrator')
		}

	} catch (err) {
		next(err)
	}
})




module.exports = router

