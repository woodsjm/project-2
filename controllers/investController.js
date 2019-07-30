const express = require('express')
const router = express()
const Investor = require('../models/investor')

router.get('/new', (req, res) => {
  res.render('investor/new.ejs');
});

router.get('/login', (req, res) => {
  res.render('investor/login.ejs');
});


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

router.get('/show/:id', async (req, res, next) => {
  try {
    const foundInvestor = await Investor.findById(req.params.id)
    console.log(foundInvestor);
    res.render('investor/show.ejs', {
      investor: foundInvestor
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