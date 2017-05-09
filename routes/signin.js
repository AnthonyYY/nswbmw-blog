const sha1 = require('sha1');
const express = require('express');
const router = express.Router();

const UserModel = require('../models/users');
const checkNotLogin = require('../middlewares/check').checkNotLogin;

// GET /signin
router.get('/',checkNotLogin,function (req,res,next) {
  res.render('signin');
})

// POST /signin
router.post('/',checkNotLogin,function (req,res,next) {
  var name = req.fields.name;
  var password = req.fields.password;

  UserModel.getUserByName(name)
    .then(function (user) {
      if(!user){
        req.flash('error','用户不存在');
        return res.redirect('back');
      }
      if(sha1(password) !== user.password){
        req.flash('error','用户名或密码错误');
        return res.redirect('back');
      }
      req.flash('success','登录成功');
      delete user.password;
      req.session.user = user;
      res.redirect('/');
    }).catch(next);
});

module.exports = router;
