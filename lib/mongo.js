const config = require('config-lite')(__dirname);
const Mongolass = require('mongolass');
const mongoglass = new Mongolass();

mongoglass.connect(config.mongodb);

exports.User = mongoglass.model('User',{
  name: {type:'string'},
  password: {type:'string'},
  avatar: {type:'string'},
  gender: {type:'string',enum: ['m','f','x']},
  bio: {type: 'string'}
});

exports.User.index({name: 1},{unique: true}).exec();
