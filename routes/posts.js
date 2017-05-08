const PostModel = require('../models/posts');
const express = require('express');
const router = express.Router();

const checkLogin = require('../middlewares/check').checkLogin;

// GET /posts?author=xxx
router.get('/',checkLogin,function (req,res,next) {
  res.render('posts');
});

// POST /posts
router.post('/',checkLogin,function (req,res,next) {
  var author = req.session.user._id;
  var title = req.fields.title;
  var content = req.fields.content;

  try {
    if(!title.length){
      throw new Error('请填写资料');
    }
    if(!content.length){
      throw new Error('请填写内容');
    }
  } catch (e) {
    req.flash('error',e.message);
    return res.redirect('back');
  }

  var post = {
    author: author,
    title: title,
    content: content,
    pv: 0
  };

  PostModel.create(post)
    .then(function (result) {
      post = result.ops[0];
      req.flash('success','发布成功');
      res.redirect(`/posts/${post._id}`);
    }).catch(next);
});

// GET /posts/create
router.get('/create',checkLogin,function (req,res,next) {
  res.render('create');
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
