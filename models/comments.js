const marked = require('marked');
const Comment = require('../lib/mongo').Comment;

Comment.plugin('contentToHtml',{
  create: function(comment){
    return Comment.create(comment).exec();
  },

  delCommentById: function(commentId,author){
    return Comment.remove({author: author,_id: commentId}).exec();
  },

  delCommentsByPostId: function (postId) {
    return Comment.remove({_id: postId}).exec();
  },

  getComments: function(postId){
    return Comment
    .find({postId:postId})
    .populate({path: 'author',model: 'User'})
    .sort({_id: 1})
    .addCreatedAt()
    .contentToHtml()
    .exec();
  },

  getCommentsCount: function(postId){
    return Comment.count({postId:postId}).exec();
  }
})
