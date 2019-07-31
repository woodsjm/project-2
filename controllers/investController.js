const express = require('express')
const router = express()
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

      if (!logInvestor) {
        console.log("this account doesn't exit")
        res.redirect('/investor/login')
      } else {
        res.redirect('/investor/show/' + logInvestor.id)
      }
    } catch (err) {
      next(err)
    }
});


// Create Investor Route
router.post('/new', async (req, res, next) => {
    try {
      const createdInvestor = await Investor.create({
        email: req.body.email,
        password: req.body.password
      });

      res.redirect('/investor/show/' + createdInvestor.id);
    } catch (err) {
      next(err)
    }
});

// Edit Investor Route
router.get('/:id/edit', async (req, res, next) => {
  try {
    const foundInvestor = await Investor.findById(req.params.id);

    res.render('investor/edit.ejs', {
      investor: foundInvestor
    });
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
    const foundInvestor = await Investor.findById(req.params.id);
    const currentOffering = await Bond.find({});


    console.log(foundInvestor);
    res.render('investor/show.ejs', {
      investor: foundInvestor,
      bonds: currentOffering
    });
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