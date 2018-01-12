// Using Node.js `require()`
const db = require('mongoose');
const uri = process.env.MONGODB_URI || `mongodb://localhost/toppit`;
db.connect(uri);


let topicSchema = db.Schema({
  headline:      String,
  description:   String,
  timeStamp:     Date,
  upvotes:     Number,
  emotion:       String

});

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
  // 'topics' is an array of objects

  // for each topic object in topics array
  let newTopic = new Topic(topic);
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
// module.exports.users = User;
// module.exports.comments = Comment;
// module.exports.lists = List;
// module.exports.organizations = Organizatoin;