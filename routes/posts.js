const PostModel = require('../models/posts');
const CommentModel = require('../models/comments');
const express = require('express');
const router = express.Router();

const checkLogin = require('../middlewares/check').checkLogin;

// GET /posts?author=xxx
router.get('/',checkLogin,function (req,res,next) {
  var author = req.query.author;
  PostModel.getPosts(author).then(function (posts) {
    res.render('posts',{posts:posts});
  }).catch(next);
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
  var postId = req.params.postId;
  Promise.all([
    PostModel.getPostById(postId),
    CommentModel.getComments(postId),
    PostModel.incPv(postId)
  ])
  .then(function (result) {
    var post = result[0];
    var comments = result[1];
    if(!post){
      throw new Error('该文章不存在');
    }
    res.render('post',{
      post: post,
      comments: comments
    });
  }).catch(next);
});

// GET /posts/:postId/edit
router.get('/:postId/edit',checkLogin,function (req,res,next) {
  var postId = req.params.postId;
  var author = req.session.user._id;
  PostModel.getRawPostById(postId)
  .then(function(post){
    if(!post){
      throw new Error('文章不存在');
    }
    if(author.toString() !== post.author._id.toString()){
      throw new Error('权限不足');
    }
    res.render('edit',{post: post})
  }).catch(next)
});

// POST /posts/:postId/edit
router.post('/:postId/edit',checkLogin,function (req,res,next) {
  var postId = req.params.postId;
  var author = req.session.user._id;
  var title = req.fields.title;
  var content = req.fields.content;

  PostModel.updatePostById(postId,author,{title: title,content: content})
  .then(function () {
      req.flash('success','编辑文章成功');
      res.redirect(`/posts/${postId}`);
  }).catch(next);
});

// GET /posts/:postId/remove
router.get('/:postId/remove',checkLogin,function (req,res,next) {
  var postId = req.params.postId;
  var author = req.session.user._id;

  PostModel.delPostById(postId,author)
  .then(function () {
    req.flash('success','删除文章成功');
    res.redirect('/posts');
  }).catch(next);
});

// POST /posts/:postId/comment/
router.post('/:postId/comment',checkLogin,function (req,res,next) {
  var postId = req.params.postId;
  var content = req.fields.content;
  var author = req.session.user._id;
  var comment = {
    postId: postId,
    content: content,
    author: author
  };
  CommentModel.create(comment)
  .then(function () {
    req.flash('success','留言成功');
    res.redirect('back');
  }).catch(next);

});

// GET /posts/:postId/comment/:commentId/remove
router.get('/:postId/comments/:commentId/remove',checkLogin,function (req,res,next) {
  console.log('run over here...');
  var commentId = req.params.commentId;
  var author = req.session.user._id;

  CommentModel.delCommentById(commentId,author)
  .then(function(){
    req.flash('success','删除留言成功');
    res.redirect('back');
  }).catch(next)
});

module.exports = router;
