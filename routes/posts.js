const express = require('express');
const router = express.Router();

const checkLogin = require('../middlewares/check').checkLogin;

// GET /posts?author=xxx
router.get('/',checkLogin,function (req,res,next) {
  res.send(req.flash());
});

// POST /posts
router.post('/',checkLogin,function (req,res,next) {
  res.send(req.flash());
});

// GET /posts/create
router.get('/create',checkLogin,function (req,res,next) {
  res.send(req.flash());
});

// GET /posts/:postId
router.get('/:postId',checkLogin,function (req,res,next) {
  res.send(req.flash());
});

// GET /posts/:postId/edit
router.get('/:postId/edit',checkLogin,function (req,res,next) {
  res.send(req.flash());
});

// POST /posts/:postId/edit
router.post('/:postId/edit',checkLogin,function (req,res,next) {
  res.send(req.flash());
});

// GET /posts/:postId/remove
router.get('/:postId/remove',checkLogin,function (req,res,next) {
  res.send(req.flash());
});

// POST /posts/:postId/comment/
router.post('/:postId/comment',checkLogin,function (req,res,next) {
  res.send(req.flash());
});

// GET /posts/:postId/comment/:commentId/remove
router.post('/:postId/comment/:commentId/remove',checkLogin,function (req,res,next) {
  res.send(req.flash());
});

module.exports = router;
