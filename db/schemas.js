const topicSchema = db.Schema({
    headline:      String,
    description:   String,
    timeStamp:     Date,
    upvotes:       Number,
    emotion:       String
  });

  const commentSchema = db.Schema({
    text:       String,
    timeStamp:  Date,
    authorId:   Number,
    upvotes:    Number
  });

  const userSchema = db.Schema({
    userName:    String,
    fullName:    String,
    password:     String,
    topicId:     Number,
    listId:      Number,
    commentId:   Number
  });

  const schema = {
    topicSchema,
    commentSchema,
    userSchema
  };
  
  export default schema;