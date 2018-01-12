import React from'react'
import { Button, Comment, Form, Header } from 'semantic-ui-react'
import img from '../assets/images/testAvatar.png'
import img2 from '../assets/images/testpic.png'

const MyComment = (props) => (

  <Comment>
    <Comment.Avatar src={img} />
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