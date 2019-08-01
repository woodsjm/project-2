const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const Investor = require('../models/investor')
const Bond = require('../models/bonds')
const Policy = require('../models/flightPolicy')

// New Investor Route
router.get('/new', (req, res) => {
  res.render('investor/new.ejs');
});


router.get('/login', (req, res) => {
  res.render('investor/login.ejs');
});

//Investor Login Route
router.post('/login', async (req, res, next) => {

  try {

    const logInvestor = await Investor.findOne({email: req.body.email})

    if (logInvestor) {

      if (bcrypt.compareSync(req.body.password, logInvestor.password) === true) {

        req.session.investorId = logInvestor._id
        req.session.email = logInvestor.email
        req.session.loggedIn = true
        req.session.investor = true

        console.log(req.session);

        res.redirect('/investor/show/' + logInvestor.id)

      } else {
        res.redirect('/investor/login')
      }

    } else {
      res.redirect('/investor/login')
    }

  } catch (err) {
    next(err)
  }
});

// Logout Route
router.get('/logout', (req, res, next) => {
  try {

    req.session.destroy()
    console.log(req.session);

    console.log('Come again');

    res.redirect('/investor/login')

  } catch (err) {
    next(err)
  }
})


// Create Investor Route
router.post('/new', async (req, res, next) => {
    const password = req.body.password

    const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))

    req.body.password = hashedPassword

    try {
      const createdInvestor = await Investor.create(req.body)

      req.session.investorId = createdInvestor._id
      req.session.email = createdInvestor.email
      req.session.loggedIn = true
      req.session.investor = true

      res.redirect('/investor/show/' + createdInvestor.id);

    } catch (err) {
      next(err)
    }
});

// Edit Investor Route
router.get('/:id/edit', async (req, res, next) => {
  try {
    if (req.session.loggedIn == true && req.session.investor == true) {
      const foundInvestor = await Investor.findById(req.params.id);

      res.render('investor/edit.ejs', {
        investor: foundInvestor
      });
    }
  } catch (err) {
    next(err)
  }
});

// Destroy Investor Route
router.delete('/:id', async (req, res, next) => {
  try {
    console.log(req.params.id)
    const deletedInvestor = await Investor.findOneAndDelete(req.params.id);
    // const removedBonds = await Bond.remove()
    console.log(req.params.id)

    res.redirect('/investor/new');
  } catch (err) {
    next(err)
  }
});

// Update Investor Account Route
router.put('/:id', async (req, res, next) => {
  try {
    
    const updatedInvestor = await Investor.findByIdAndUpdate(req.params.id, req.body, {new: true});

    
    res.redirect('/investor/show/' + updatedInvestor.id);
  } catch (err) {
    next(err)
  }
});


//Show Investor Route
router.get('/show/:id', async (req, res, next) => {
  try {

    if (req.session.loggedIn == true && req.session.investor == true) {
      const foundInvestor = await Investor.findById(req.params.id);
      const currentOffering = await Bond.find({});

      console.log(foundInvestor);
      res.render('investor/show.ejs', {
        investor: foundInvestor,
        bonds: currentOffering
      });
    }
  } catch (err) {
    next(err)
  }
});



/*router.post('/login', async (req, res, next) => {
  try {

    const foundInvestor = await Investor.findOne({email: req.body.email})

    if (!foundInvestor){
      console.log("that email account doesn't exist")
    }
  }
});*/






module.exports = router