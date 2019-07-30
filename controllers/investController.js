const express = require('express')
const router = express()
const Investor = require('../models/investor')

router.get('/new', (req, res) => {
  res.render('investor/new.ejs');
});



router.post('/new', async (req, res, next) => {
    try {
      const createdInvestor = Investor.create({
        email: req.body.email,
        password: req.body.password
      });
    } catch (err) {
      next(err)
    }
});






module.exports = router