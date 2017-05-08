const express = require('express');
const router = express.Router();

const checkNotLogin = require('../middlewares/check').checkNotLogin;

// GET /signup
router.get('/',checkNotLogin,function (req,res,next) {
  res.render('signup');
})

// POST /signup
router.post('/',checkNotLogin,function (req,res,next) {
  res.send(req.flash());
})

module.exports = router;
