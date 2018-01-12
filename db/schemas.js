const topicSchema = db.Schema({
    headline:      String,
    description:   String,
    timeStamp:     Date,
    upvotes:       Number
  });

  const commentSchema = db.Schema({
    text:       String,
    timeStamp:  Date,
    author_id:  Number,
    upvotes:    Number
  });

  const userSchema = db.Schema({
    user_name:    String,
    full_name:    String,
    password:     String,
    topic_id:     Number,
    list_id:      Number,
    comment_id:   Number
  });

  const schema = {
    topicSchema,
    commentSchema,
    userSchema
  };
  
  export default schema;