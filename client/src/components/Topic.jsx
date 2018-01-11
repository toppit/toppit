import React from 'react';
import {Card, Button, Icon} from 'semantic-ui-react';
import Moment from 'react-moment';

class Topic extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      upvotes: this.props.topic.upvotes,
      upvoteState: false,
      timeStamp: new Date()
    }
  } 

  increaseUpvoteCount (topic) {
    //if neutral state
    var plusOrMinusCount = 0
    if (!this.state.upVoteState) {
      plusOrMinusCount = 1;
    } else {
      plusOrMinusCount = -1;
     }
    // http PUT request to server to increase/decrease upvote count
    //use axios
    this.setState({
      upvotes: topic.upvotes++
    })
  }

  renderTopicDetailedView () {
    //react router something?
    console.log('clicked Topic! Goes to topicView page');
  }  

  render() {
    //access time topic was created at
        const dateToFormat = new Date ();
    return (
      <Card fluid>
        <Card.Content header={this.props.topic.headline} />
        <Card.Content description={this.props.topic.description} />
        <Card.Content extra>
          <Button
            content='UpVote'
            icon='heart'
            label={{ as: 'a', basic: true, content: this.props.topic.votes || 0}}
            labelPosition='right'
          />
          <Moment onChange={this.timeStamp} fromNow>{this.state.timeStamp}</Moment>
          <Icon name='comments' />
          {this.props.topic.comments || 0} comments
        </Card.Content>
      </Card>
    );
  }  
}

export default Topic;