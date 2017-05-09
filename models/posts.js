const marked = require('marked');
const Post = require('../lib/mongo').Post;
const Comment = require('./comments');

Post.plugin('contentToHtml',{
  afterFind: function (posts) {
    return posts.map(function (post) {
      post.content = marked(post.content);
      return post;
    });
  },
  afterFindOne: function (post) {
    if(post){
      post.content = marked(post.content);
    }
    return post;
  }
});

module.exports = {
  create: function create(post) {
    return Post.create(post).exec();
  },
  getPostById: function (postId) {
    return Post.findOne({_id: postId})
    .populate({path: 'author',model: 'User'})
    .addCreatedAt()
    .contentToHtml()
    .exec();
  },

  getPosts: function (author) {
    var query = {};
    if(author){
      query.author = author;
    }
    return Post.find(query)
    .populate({path: 'author',model: 'User'})
    .sort({_id: -1})
    .addCreatedAt()
    .contentToHtml()
    .exec();
  },

  incPv: function incPv(postId) {
    return Post
      .update({_id:postId},{$inc: {pv: 1}})
      .exec();
  },

  getRawPostById: function (postId) {
    return Post.findOne({_id: postId})
    .populate({path: 'author',model: 'User'})
    .exec();
  },

  updatePostById: function (postId,author,data) {
    return Post.update({author: author,_id:postId},{$set: data}).exec();
  },

  delPostById: function (postId,author) {
    return Post.remove({author: author,_id: postId}).exec();
  }
};
