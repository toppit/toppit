const topicSchema = db.Schema({
    _id:           Number,
    headline:      String,
    description:   String,
    timeStamp:     Date,
    upvotes:       Number,
    commentId:     [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    userId:        Number,
    emotion:       String
  });

  const commentSchema = db.Schema({
    _id:        Number,
    text:       String,
    timeStamp:  Date,
    authorId:   Number,
    upvotes:    Number
  });

  const userSchema = db.Schema({
    _id:         Number,
    userName:    String,
    fullName:    String,
    password:    String,
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