const express = require('express')
const router = express()
const Investor = require('../models/investor')

router.get('/new', (req, res) => {
  res.render('investor/new.ejs');
});

router.get('/show', (req, res) => {
  res.render('investor/show.ejs');
});


router.post('/new', async (req, res, next) => {
    try {
      const createdInvestor = await Investor.create({
        email: req.body.email,
        password: req.body.password
      });

      res.redirect('/investor/show');
    } catch (err) {
      next(err)
    }
});






module.exports = router