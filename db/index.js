const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const options = { promiseLibrary: require('bluebird') };

const uri = process.env.MONGODB_URI || `mongodb://localhost/toppit`;
const passportLocalMongoose = require('passport-local-mongoose');
var db = mongoose.createConnection(uri, options);

const topicSchema = mongoose.Schema({
  _id:           mongoose.Schema.Types.ObjectId,
  headline:      String,
  description:   String,
  timeStamp:     Date,
  upvotes:       Number,
  commentId:     [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  authorId:      { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  emotion:       String,
  upvoteUsers:   []
  });

const commentSchema = mongoose.Schema({
  _id:        mongoose.Schema.Types.ObjectId,
  text:       String,
  timeStamp:  Date,
  authorId:   { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  username:   String,
  upvotes:    Number
});

const userSchema = mongoose.Schema({
  username:    String,
  password:    String,
  googleId:    String,
  githubId:    String,
  fullName:    String,
  photo:       String,
  topicId:     [{ type: mongoose.Schema.Types.ObjectId, ref: 'Topic' }],
  listId:      Number,
  commentId:   [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
});

userSchema.plugin(passportLocalMongoose);

let Topic = db.model('Topic', topicSchema);
let User = db.model('User', userSchema);
let Comment = db.model('Comment', commentSchema);
//let List = db.model('List', listchema);
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

//query key should be either username or _id
let getUser = (query, callback) => {
  User.findOne(query, (err, user) => {
    if (err) {
      console.log(err.message);
      callback(err, null);
      return;
    }
    callback(null, user);
  });
};

let findOrCreateUser = (query, attributes, callback) => {
  User.findOneAndUpdate(query, attributes, { new: true, upsert: true }, (err, user) => {
    if (err) {
      console.log(err.message);
      callback(err, null);
      return;
    }
    callback(null, user);
  });
}

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
  // find topic instancy by topicId, populate commentId, then inside commentId Values, populate authorId
  Topic.
    findById(topicId).
    populate('authorId').
    populate({path : 'commentId', populate : {path : 'authorId'}}).
    exec(function (err, topic) {
      if (err) {
        console.log(err.message);
        callback(err, null);
        return;
      }
      console.log('Topic Returned From DB: ', topic);
      callback(null, topic);
    });
};

// Save Topic to MongoDB
let saveTopic = (topic, callback) => {
  let id = mongoose.Types.ObjectId();

  let newTopic = new Topic(topic);
  newTopic._id = id;

  Topic.create(newTopic, (err, result) => {
    if (err) {
      console.log(err.message);
      callback(err, null);
    }
    callback(null, newTopic);
  });
};

const updateVoteCount = (id, plusOrMinus, currentUser, callback) => {

  Topic.update(
    {
      "_id": id,
      "upvoteUsers": {"$ne": currentUser} 
    },
    {
      '$push': {'upvoteUsers': currentUser},
      '$inc': {'upvotes': 1}
    }, 
    (err, doc) => {
      if (err) {
        console.log(err)
        callback(err, null);
        return;
      }
      callback(null, doc)
    }
  )
};

let saveComment = (commentObj, topicId, callback) => {
  let id = mongoose.Types.ObjectId();

  let comment = new Comment({
    _id:        id,
    text:       commentObj.text,
    timeStamp:  commentObj.timeStamp,
    username:   commentObj.username,
    upvotes:    commentObj.upvotes
  });
  // find User instance by username
  User.findOne({ username: commentObj.username}, (err, doc) => {
    if (err) {
      console.log(err);
      return;
    }
    // then add that instances object id 'doc._id' to the comments authorId property
    comment = {
      _id:        id,
      text:       commentObj.text,
      timeStamp:  commentObj.timeStamp,
      authorId:   doc._id,
      username:   commentObj.username,
      upvotes:    commentObj.upvotes
    };
    Comment.create(comment, (err, result) => {
      if (err) {
        console.log(err.message);
        callback(err, null);
      }
      console.log("Comment Save Success");
  
      // create reference from authorId property to user object
      Comment.populate(comment, {path:"authorId"}, (err, commentData) => {
        if (err) {
          console.log(err.message);
          callback(err, null);
          return;
        }
        callback(null, commentData);
      });
    });
  });

  // Add 'comment._id' to topic instance for comment-object reference
  // - Find topic by topicId  
  Topic.findById(topicId, (err, doc) => {
    if(err){
      console.log(err);
    } else {
      // - Insert comment._id into Topic
      doc.commentId.push(comment._id);      
      // - Update Database
      Topic.update({_id: topicId}, doc, (err, raw) => {
        if (err) {
          console.log(err);
        }
        console.log("Successful update of topic", raw);       
      });
    }
  });

};

module.exports.saveComment = saveComment;
module.exports.saveTopic = saveTopic;
module.exports.getTopics = getTopics;
module.exports.updateVoteCount = updateVoteCount;
module.exports.getSelectTopics = getSelectTopics;
module.exports.getTopicById = getTopicById;
module.exports.User = User;
module.exports.getUser = getUser;
module.exports.findOrCreateUser = findOrCreateUser;
// module.exports.users = User;
// module.exports.comments = Comment;
// module.exports.lists = List;
// module.exports.organizations = Organizatoin;