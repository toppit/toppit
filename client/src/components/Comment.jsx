import React from'react';
import { Button, Comment, Form, Card, Header } from 'semantic-ui-react';
import moment from 'moment';
import defaultPhoto from '../images/defaultPhoto.jpg';

const test = {
  comment: {
    authorId: {
      fullName: 'Test User',
      photo: 'https://semantic-ui.com/images/avatar/large/elliot.jpg'
    }
  }
};

const MyComment = (props) => {
console.log(props.timeStamp);
console.log(typeof props);

console.log(props);

let name = (test.comment.authorId && (test.comment.authorId.fullName || test.comment.authorId.username) || '');
let photoUrl = (test.comment.authorId && test.comment.authorId.photo) || defaultPhoto;


return(
  <Comment>
    <Comment.Avatar className='commentuser' src={photoUrl} />
    <Comment.Content>
      <Comment.Author as='a'>{name}</Comment.Author>
      <Comment.Metadata>
        <div>{moment(props.comment.timeStamp).fromNow()}</div>
      </Comment.Metadata>
      <Comment.Text>{props.comment.text}</Comment.Text>
    </Comment.Content>
  </Comment>
  );
}

export default MyComment;

/*   <Comment>
    <Comment.Avatar src={defaultPhoto} />
    <Comment.Content>
      <Comment.Author as='a'>Matt</Comment.Author>
      <Comment.Metadata>
        <div>Today at 5:42PM</div>
      </Comment.Metadata>
      <Comment.Text>How artistic!</Comment.Text>
      <Comment.Actions>
        <Comment.Action>Reply</Comment.Action>
      </Comment.Actions>
    </Comment.Content>
  </Comment>
  */