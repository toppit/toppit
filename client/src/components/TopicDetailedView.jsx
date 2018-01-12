import React from'react'
import CommentList from './CommentList.jsx'
import {exampleCommentData} from '../exampleData.js'
import {exampleData} from '../exampleData.js' 
import {Form, Button} from'semantic-ui-react'
import http from 'axios'

class TopicDetailedView extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      username: 'NathanForYou',
      commentText: '',
      topic: exampleData[0],
      comments: [{
  username: 'jrodchu',
  description: 'This is sooo funny! ...chu',
  timestamp: 'yesterday'
}, {
  username: 'sfkiwi',
  description: 'A really good point! I agree',
  timeStamp: 'a few seconds ago'
}]
    }

  }

  handleInputText(e, {value} ) {

    this.setState({
      commentText: e.target.value
    })
  }

  submitComment(commentText) {
    var newComment = {
      username: this.state.username,
      description: commentText,
      timeStamp: new Date()
    }
    //http request to database to add comment to topic
    // http.post(`/topic/${this.topic._id}`, newComment)
    //   .then( () => {
    //     console.log('success!')
    //   })
    //   .catch( (error) => {
    //     console.log(error)
    //   })

      var allComments = this.state.comments;
      allComments.push(newComment);
      this.setState({
        comments: allComments
      })
  }

  render() {
    return (
      <div>
        <div>
          <div>{this.state.topic.headline}</div>
          <div>{this.state.topic.description}</div>
        </div>8
        <div>
          <CommentList 
          handleCommentSubmitClick= {this.submitComment.bind(this)}
          comments={this.state.comments}/>
        </div>
        <Form  reply>
          <Form.TextArea value={this.state.commentText} onChange={this.handleInputText.bind(this)}/>
          <Button 
          onClick={ () => this.submitComment(this.state.commentText) }content="Add Reply" labelPosition='left' icon='edit' primary />
        </Form>
      </div>
      )
  }
}

export default TopicDetailedView