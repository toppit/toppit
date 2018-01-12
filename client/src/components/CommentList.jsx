import React from'react'
import MyComment from './Comment.jsx'
import {Button, Header, Comment, Container, Form} from 'semantic-ui-react'


const CommentList  = (props) => (
  <Comment.Group>
    <Header as="h3" dividing>Comments</Header>
    {props.comments.map( (comment, index) => (
      <MyComment comment={comment} key={index} />
      )
    )}

  </Comment.Group>
  );


export default CommentList