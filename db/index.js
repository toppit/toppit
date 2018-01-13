// Using Node.js `require()`
const db = require('mongoose');
const uri = process.env.MONGODB_URI || `mongodb://localhost/toppit`;
db.connect(uri);

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
    userName:    String,
    fullName:    String,
    password:    String,
    topicId:     [{ type: db.Schema.Types.ObjectId, ref: 'Topic' }],
    listId:      Number,
    commentId:   [{ type: db.Schema.Types.ObjectId, ref: 'Comment' }]
  });

let Topic = db.model('Topic', topicSchema);
let Comment = db.model('Comment', commentSchema);
//let List = db.model('List', listchema);
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

// ----------------------
// SAVE TOPIC TO MONGO DB
// ----------------------
let saveTopic = (topic, callback) => {
  let id = db.Types.ObjectId();

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

// ------------------------
// SAVE COMMENT TO MONGO DB
// ------------------------
// - Receives comments object and topicId
// - Saves comment to DB
// - Places new comment ID into associated topic based on topicId
// - can create reference to comment object stored in DB
let saveComment = (commentObj, topicId, callback) => {
  let id = db.Types.ObjectId();

  let comment = new Comment({
    _id:        id,
    text:       commentObj.text,
    timeStamp:  commentObj.timeStamp,
  //  authorId:   { type: db.Schema.Types.ObjectId, ref: 'User' },
    upvotes:    commentObj.upvotes
  });

  // - Find topic by topicId  
  Topic.findById(topicId, function (err, doc){
    if(err){
      console.log(err);
    } else {
      // - Insert comment._id into Topic
      doc.commentId.push(comment._id);
      
      // - Update Database
      Topic.update({_id: topicId}, doc, function(err, raw) {
        if (err) {
          console.log(err);
        }
        console.log("Successful update of topic", raw);
        
      });
    }
  });

  comment.save(function (err) {
    if (err) {
      console.log(err.message);
      // callback(err, null);
    } else {
      // create reference from topic.commentId property to comment object
      Topic.
        findById(topicId).
        populate('commentId').
        exec(function (err, topic) {
          if (err) return handleError(err);
          console.log('The topic commentId Array: ', topic.commentId);

        });
    }
    // callback(null, .....);
    // console.log("Comment Save Success");
  });
};


module.exports.saveComment = saveComment;
module.exports.saveTopic = saveTopic;
module.exports.getTopics = getTopics;
module.exports.updateVoteCount = updateVoteCount;
module.exports.getSelectTopics = getSelectTopics;
module.exports.getTopicById = getTopicById;
// module.exports.users = User;
// module.exports.comments = Comment;
// module.exports.lists = List;
// module.exports.organizations = Organizatoin;