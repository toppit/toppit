// Using Node.js `require()`
const mongoose = require('mongoose');

const database = 'toppit';
const uri = process.env.MONGODB_URI || `mongodb://localhost/${database}`;
mongoose.connect(uri);

const db = mongoose.createConnection(uri);

let topicSchema = mongoose.Schema({
  id:            Number,
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
    if (err) throw err;
    callback(null, result);
  });
};

// Save Topics to MongoDB
let save = (topics) => {
  // 'topics' is an array of objects

  // for each topic object in topics array
  topics.forEach((topic) => {
    let topicId = Schema.Types.ObjectId; // might need to declare a ObjectId variable
    topicId = new Topic({ 
      id:           topicId,
      headline:     topic.headline,
      description:  topic.description,
      timeStamp:    topic.timeStamp
    });

    Topic.update({ id: topicId }, name, { upsert: true }, (err, name) => {
      if (err) {
        return console.error(err);
      }
        console.log("Success")
    });
  
    // name.save(function (err, name) {
    //   if (err) {
    //     return console.error(err);
    //   }
    // });
  });
};

module.exports.save = save;
module.exports.getTopics = getTopics;
module.exports.topics = Topic;
// module.exports.users = User;
// module.exports.comments = Comment;
// module.exports.lists = List;
// module.exports.organizations = Organizatoin;
