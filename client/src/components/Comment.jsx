import React from'react';
import { Button, Comment, Form, Header } from 'semantic-ui-react';
import moment from 'moment';


const MyComment = (props) => {
console.log(props.timeStamp);
console.log(typeof props);
return(

  <Comment>
    <Comment.Content>
      <Comment.Author as='a'>{props.comment.username}</Comment.Author>
      <Comment.Metadata>
        {moment(props.comment.timeStamp).fromNow()}
      </Comment.Metadata>
      <Comment.Text>{props.comment.text}</Comment.Text>
    </Comment.Content>
  </Comment>
  )
}

export default MyComment;