// Using Node.js `require()`
const mongoose = require('mongoose');

const database = 'toppit';
const uri = process.env.MONGODB_URI || `mongodb://localhost/${database}`;
mongoose.connect(uri);

const db = mongoose.createConnection(uri, options);


let topicSchema = mongoose.Schema({
  headline: String,
  description: String,
});



let Topic = db.model('Topic', topicSchema);
//let Comment = db.model('Comment, commentSchema);
//let List = db.model('List, listchema);
//let User = db.model('User', userSchema);
//let Organization = db.model('Organization', sessionSchema);

module.exports.topics = Topic;
// module.exports.users = User;
// module.exports.comments = Comment;
// module.exports.lists = List;
// module.exports.organizations = Organizatoin;
