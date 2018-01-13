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

// Save Topics to MongoDB
let saveTopic = (topic, callback) => {
  let id = db.Types.ObjectId();

  let newTopic = new Topic(topic);
  // let newTopic = new Topic({
  //   _id:           id,
  //   headline:      topic.headline,
  //   description:   topic.description,
  //   timeStamp:     topic.timeStamp,
  //   upvotes:       0,
  //   commentId:     [comment._id],
  //   //authorId:      { user._id },
  //   emotion:       topic.emotion
  // });
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

// Posting comment
// api.post('/topic/:topicId', (req, res))... Go to specific topicId and place properties in received object
  // will receive everything in comments object
  // should be placed in correct Topic, given a Topic URL

// Save Comments to MongoDB
let saveComment = (commentObj, topicId, callback) => {
  let id = db.Types.ObjectId();

  let comment = new Comment({
    _id:        id,
    text:       commentObj.text,
    timeStamp:  commentObj.timeStamp,
  //  authorId:   { type: db.Schema.Types.ObjectId, ref: 'User' },
    upvotes:    commentObj.upvotes
  });

  // find topic by topicId
  Topic.findById(topicId, function (err, doc){
    // add error handling
    if(err){
      console.log(err);
    } else {

          // doc is a Document
      // push comment._id to array
      console.log('Topic Comment Id Before: ', doc);
      doc.commentId.push(comment._id);

      Topic.update({_id: topicId}, doc, function(err, raw) {
        if (err) {
          console.log(err);
        }
        console.log("Successful update of topic", raw);
        
      });
    }

  });
   
  console.log('New Comment: ', comment);

  comment.save(function (err) {
    if (err) {
      console.log(err.message);
      //callback(err, null);
    } else {
      Topic.
        findById(topicId).
        populate('commentId').
        exec(function (err, topic) {
          if (err) return handleError(err);
          console.log('The topic commentId Array: ', topic.commentId);
          // prints the text from the first comment in array
        });
    }
    //callback(null, newTopic);
    // console.log("Comment Save Success");
  });

  
  
  // Create comment. Populate comment 'authorId' with userId Object
  // Comment.create(newComment, (err, result) => {
  //   if (err) {
  //     console.log(err.message);
  //     callback(err, null);
  //   } else {
  //     // Comment.find({})
  //     // .populate('authorId')
  //     // .exec(function(error, data) {
  //     //   console.log(JSON.stringify(data, null, "\t"))
  //     //  })
  //     callback(null, newComment);
  //   }
  // });
};

// Gather All Data
// Topic Detail
// On get request:
// result data should be more than topics object, but comments as well including username
// modify function that does db query
// When click on topic
 // Get all info about Topic
   // Headline
   // Descript
   // Timestamp
   // Number of upvotes

   // Comments object
     // Text
     // Author
     // Timestamp

  // Comment component 
    // comment author username


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