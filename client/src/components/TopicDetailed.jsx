import React from 'react';
import {Container, Item, Header, Card, Icon, Button, Form} from 'semantic-ui-react';
import http from 'axios';
import CommentList from './CommentList.jsx';
import UpvoteButton from './UpvoteButton.jsx';
import {exampleCommentData} from '../exampleData.js';
import {exampleData} from '../exampleData.js';
import moment from 'moment';



class TopicDetailed extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: this.props.currentUser,
      topic: null,
      commentText: '',
      upvoteStateColor: 'grey'
    };
  }

  componentDidMount() {
    http.get(`/api/topic/${this.props.topicId}`)

      .then(({data}) => {
        console.log('getting topic', data);
        this.setState({
          topic: data,
          commentText: '',
          comments: data.commentId          

        });
      })

      .catch((err) => {
        console.log(err.message);
      });
  }

  handleInputText(e, {value} ) {

    this.setState({
      commentText: e.target.value
    })
  }

  submitComment(commentText) {
    var newComment = {
      authorId: this.state.currentUser._id,
      text: commentText,
      timeStamp: new Date(),
      upvotes: 0
    }
    //http request to database to add comment to topic

    http.post(`/api/topic/${this.props.topicId}`, newComment)
      .then( (result) => {
        console.log('success!', result);
        newComment.description = result.data.text;
      })
      .catch( (error) => {
        console.log(error)
      })

      var allComments = this.state.comments;
      allComments.push(newComment);
      this.setState({
        comments: allComments,
        commentText: ''
      })
  }  
  
  render() {
    if (!this.state.topic) {
      return null;
    }
    const {topic} = this.state;

    return (
      <div>
        <Container className='detailedtopic'>      
          <Card color="teal" fluid>
            <Card.Content header={topic.headline} meta={moment(topic.timeStamp).fromNow()}/>
            <Card.Content description={topic.description} />
            <Card.Content extra>
            <UpvoteButton topic={topic} upvote={this.props.upvote} currentUser={this.state.currentUser}/>            
              <Icon name='comments' />
              {this.state.comments.length || 0} comments
              &nbsp;&nbsp;
              {topic.emotion ?
                <Button compact color="blue" content={topic.emotion}/> : ''}                
            </Card.Content>
          </Card>
        </Container>
        <div>
        &nbsp;&nbsp;
          <CommentList 
          handleCommentSubmitClick= {this.submitComment.bind(this)}
          comments={this.state.comments}/>
        </div> 
        <Container className='newcommentcontainer' text>
          <Item>
            <Form  reply>
              <Form.TextArea value={this.state.commentText} onChange={this.handleInputText.bind(this)}/>
              <Button 
              onClick={ () => this.submitComment(this.state.commentText) }content="Add Reply" labelPosition='left' icon='edit' primary />
            </Form>
          </Item>   
        </Container> 
      </div>  
    );
  }
}

export default TopicDetailed;