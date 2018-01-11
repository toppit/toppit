import React from 'react';
import {Card, Button, Icon} from 'semantic-ui-react';
import http from 'axios';

class Topic extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      upvotes: this.props.topic.upvotes,
      upvoteState: false
    }
  } 

  increaseUpvoteCount (topic) {

    var plusOrMinusCount = -1
    var upvoteState = false;
    //change above values depending on current state
    if (!this.state.upvoteState) {
      plusOrMinusCount = 1;
      upvoteState = true;
    }
      http.patch('/topic', {
        _id: topic._id,
        upvote: plusOrMinusCount
      })
        .then( ({data}) => {
          console.log('where is my data', data);
          this.setState({
            upvotes: data.upvotes,
            upvoteState: upvoteState
          })
        })
        .catch( (error) => {
          console.log(error);
        })
    
  }

  renderTopicDetailedView () {
    //react router something?
    console.log('clicked Topic! Goes to topicView page');
  }  

  render() {
    var upvoteStateColor = 'blue';
     if (!this.state.upvoteState) {
      upvoteStateColor = 'grey';
     }

    return (
      <Card fluid>
        <Card.Content header={this.props.topic.headline} />
        <Card.Content description={this.props.topic.description} />
        <Card.Content extra>
          <Button
            color={upvoteStateColor} 
            content="UpVote"
            icon='heart'
            label={{ as: 'a', basic: true, content: this.state.upvotes || 0}}
            labelPosition='right'
            onClick={ () => this.increaseUpvoteCount(this.props.topic)}
          />
          <Icon name='comments' />
          {this.props.topic.comments || 0} comments
        </Card.Content>
      </Card>
    );
  }  
}

export default Topic;