const express = require('express')
const router = express.Router()
const Bond = require('../models/bonds')
const Investor = require('../models/investor')

router.put('/', async (req, res, next) => {
  try {
    console.log("in the bond put route")
    const foundBond = await Bond.findById(req.body.bondId)
    console.log(foundBond, 'foundBond')
    foundBond.user = req.body.investorId;
    console.log(foundBond.user, '<-------FOUND BONDS USER')
    foundBond.issued = true;
    foundBond.save()
    console.log(foundBond, '<-------FOUND BOND AFTER SAVE')

    
    res.redirect('/investor/show/' + req.body.investorId);
  } catch (err) {
    next(err)
  }
});


module.exports = router;