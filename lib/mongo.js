const moment = require('moment');
const objectIdToTimestamp = require('objectId-to-timestamp');
const config = require('config-lite')(__dirname);
const Mongolass = require('mongolass');
const mongoglass = new Mongolass();

mongoglass.connect(config.mongodb);

mongoglass.plugin('addCreatedAt',{
  afterFind: function (results) {
    results.forEach(function (item) {
      item.created_at = moment(objectIdToTimestamp(item._id)).format('YYYY-MM-DD HH:mm');
    })
    return results;
  },
  afterOne: function(result){
    if(result){
      result.created_at = moment(objectIdToTimestamp(item._id)).format('YYYY-MM-DD HH:mm');
    }
    return result;
  }
});

exports.User = mongoglass.model('User',{
  name: {type:'string'},
  password: {type:'string'},
  avatar: {type:'string'},
  gender: {type:'string',enum: ['m','f','x']},
  bio: {type: 'string'}
});

exports.Post = mongoglass.model('Post',{
  author: {type: Mongolass.Types.ObjectId},
  title: {type: 'string'},
  content: {type: 'string'},
  pv: {type:'number'}
});

exports.Comment = mongoglass.model('Comment',{
  author: {type: Mongolass.Types.ObjectId},
  content: {type: 'string'},
  postId: {type: Mongolass.Types.ObjectId}
});

exports.User.index({name: 1},{unique: true}).exec();
exports.Post.index({author: 1,_id: -1}).exec();
exports.Comment.index({postId: 1,_id:1}).exec();
exports.Comment.index({author: 1,_id:1}).exec();
