const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const options = { promiseLibrary: require('bluebird') };

const uri = process.env.MONGODB_URI || `mongodb://localhost/toppit`;
const passportLocalMongoose = require('passport-local-mongoose');
var db = mongoose.createConnection(uri, options);

const topicSchema = db.Schema({
  _id:           db.Schema.Types.ObjectId,
  headline:      String,
  description:   String,
  timeStamp:     Date,
  upvotes:       Number,
  commentId:     [{ type: db.Schema.Types.ObjectId, ref: 'Comment' }],
  authorId:      { type: db.Schema.Types.ObjectId, ref: 'User' },
  emotion:       String
  });

const commentSchema = db.Schema({
  _id:        db.Schema.Types.ObjectId,
  text:       String,
  timeStamp:  Date,
  authorId:   { type: db.Schema.Types.ObjectId, ref: 'User' },
  upvotes:    Number
});

const userSchema = db.Schema({
  _id:         db.Schema.Types.ObjectId,
  username:    String,
  password:    String,
  fullName:    String,
  topicId:     [{ type: db.Schema.Types.ObjectId, ref: 'Topic' }],
  listId:      Number,
  commentId:   [{ type: db.Schema.Types.ObjectId, ref: 'Comment' }]
});

userSchema.plugin(passportLocalMongoose);

let Topic = db.model('Topic', topicSchema);

//let Comment = db.model('Comment, commentSchema);
//let List = db.model('List, listchema);
//let User = db.model('User', userSchema);
//let Organization = db.model('Organization', sessionSchema);

let getTopics = (callback) => {

  Topic.find({}, null, {sort: '-timeStamp'}, function(err, result) {
    if (err) {
      console.log(err.message);
      callback(err, null);
      return;
    }

    callback(null, result);
  });
};

let getSelectTopics = (query, callback) => {
  var sortParams = {};
  var filterParams = {};
  if (query.sortBy.length > 0) {
    sortParams[query.sortBy] = -1;
  }
  if (query.filterBy.length > 0) {
    filterParams['emotion'] = query.filterBy;
  }
  Topic.find(filterParams).sort(sortParams).exec(function (err, results) {
    if (err) {
      console.log(err.message);
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

let getTopicById = (topicId, callback) => {
  Topic.findById(topicId, function(err, result) {
    if (err) {
      console.log(err.message);
      callback(err, null);
      return;
    }
    console.log('DB ', result);
    callback(null, result);
  });
};

// Save Topics to MongoDB
let saveTopic = (topic, callback) => {
  let id = db.Types.ObjectId();
  // 'topics' is an array of objects

  // for each topic object in topics array
  let newTopic = new Topic(topic);
  newTopic._id = id;
  console.log('New Topic: ',newTopic);

  Topic.create(newTopic, (err, result) => {
    if (err) {
      console.log(err.message);
      callback(err, null);
    }
    callback(null, newTopic);
  });
};

const updateVoteCount = (id, plusOrMinus, callback) => {
  console.log('upvote', plusOrMinus)
  Topic.findOneAndUpdate({_id: id}, {$inc: {'upvotes': plusOrMinus} }, {'new': true}, (err, doc) => {
    if (err) {
      callback(err, null);
      return;
    }
    console.log('after increment: ', doc);
    callback(null, doc);
  });
};

module.exports.saveTopic = saveTopic;
module.exports.getTopics = getTopics;
module.exports.updateVoteCount = updateVoteCount;
module.exports.getSelectTopics = getSelectTopics;
module.exports.getTopicById = getTopicById;
module.exports.User = db.model('User', User);
// module.exports.users = User;
// module.exports.comments = Comment;
// module.exports.lists = List;
// module.exports.organizations = Organizatoin;