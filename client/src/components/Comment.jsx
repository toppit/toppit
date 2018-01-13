import React from'react'
import { Button, Comment, Form, Header } from 'semantic-ui-react'


const MyComment = (props) => (

  <Comment>
    <Comment.Content>
      <Comment.Author as='a'>{props.comment.username}</Comment.Author>
      <Comment.Metadata>
        <div>{props.comment.timestamp}</div>
      </Comment.Metadata>
      <Comment.Text>{props.comment.description}</Comment.Text>
    </Comment.Content>
  </Comment>
  )

export default MyComment;