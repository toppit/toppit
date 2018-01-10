// Using Node.js `require()`
const db = require('mongoose');
const uri = process.env.MONGODB_URI || `mongodb://localhost/toppit`;
db.connect(uri);


let topicSchema = db.Schema({
  headline:      String,
  description:   String,
  timeStamp:     Date
});

let Topic = db.model('Topic', topicSchema);
//let Comment = db.model('Comment, commentSchema);
//let List = db.model('List, listchema);
//let User = db.model('User', userSchema);
//let Organization = db.model('Organization', sessionSchema);

let getTopics = (callback) => {

  Topic.find({}, function(err, result) {
    if (err) {
      console.log(err.message);
      callback(err, null);
    }

    callback(null, result);
  });
};

// Save Topics to MongoDB
let saveTopic = (topic, callback) => {
  // 'topics' is an array of objects

  // for each topic object in topics array
  let newTopic = new Topic(topic);
  console.log('New Topci: ',newTopic);

  Topic.create(newTopic, (err, result) => {
    if (err) {
      callback(err, null);
      console.log(err.message);
      return;
    }
    callback(null, newTopic);
  });
};

module.exports.saveTopic = saveTopic;
module.exports.getTopics = getTopics;
// module.exports.users = User;
// module.exports.comments = Comment;
// module.exports.lists = List;
// module.exports.organizations = Organizatoin;
