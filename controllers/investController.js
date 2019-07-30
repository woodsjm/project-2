const express = require('express')
const router = express()
const Investor = require('../models/investor')

router.get('/new', (req, res) => {
  res.render('investor/new.ejs');
});

router.get('/show/:id', (req, res) => {
  res.render('investor/show.ejs');
});

/*router.get('/login', (req, res) => {
  res.render
})*/


router.post('/new', async (req, res, next) => {
    try {
      const createdInvestor = await Investor.create({
        email: req.body.email,
        password: req.body.password
      });

      res.redirect('/investor/show/:id');
    } catch (err) {
      next(err)
    }
});






module.exports = router