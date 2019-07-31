const express = require('express')
const router = express()
const Admin = require('../models/admin')


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

// NEW ROUTE



// SHOW ROUTE
router.get('/', (req, res, next) => {
	
	try {

		res.render('admin/show.ejs')

	} catch (err) {
		next(err)
	}
})








module.exports = router