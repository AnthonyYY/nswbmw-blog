const config = require('config-lite')(__dirname);
const Mongolass = require('mongolass');
const mongoglass = new Mongolass();

mongoglass.connect(config.mongodb);

exports.User = {
  name: {type:'stirng'},
  password: {type:'stirng'},
  avatar: {type:'stirng'},
  gender: {type:'stirng',enum: ['m','f','x']},
  bio: {type: 'string'}
};

exports.User.index({name: 1},{unique: true}).exec();
