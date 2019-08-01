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

    
    res.redirect('/investor/' + req.body.investorId);
  } catch (err) {
    next(err)
  }
});


// DELETE ROUTE
router.delete('/:id', async (req, res, next) => {
  try {
    // const foundInvestor = await Investor.findById()

    console.log(req.params.id, '<-- req.params.id');
    const deletedBond = await Bond.findByIdAndDelete(req.params.id)
    console.log(deletedBond, '<-- deletedBond');

    res.redirect('/investor/' + deletedBond.user)
    res.send('hey')

  } catch (err) {
    next(err)
  }
})


module.exports = router;