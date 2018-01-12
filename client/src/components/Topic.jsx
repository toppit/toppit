import React from 'react';
import { Card, Button, Icon } from 'semantic-ui-react';
import http from 'axios';
import TopicDetailedView from './TopicDetailedView.jsx'

class Topic extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      upvoteState: false
    };

    this.renderTopicDetailedView = this.renderTopicDetailedView.bind(this);
  }
  
  handleClick () {

    var newUpvoteState = false;
    if (!this.state.upvoteState) {
      newUpvoteState = true;
    }
    this.setState ({
      upvoteState: newUpvoteState
    });
    this.props.upVote(this.props.topic._id);
  }
  
  renderTopicDetailedView () {
    //react router something?
    console.log('clicked Topic! Goes to topicView page');
    this.props.history.push(`/topic/${this.props.topic._id}`)
    this.props.onDetailedTopic(this.props.topic);
  }

  render () {
    
    var upvoteStateColor = 'blue';
    
    if (!this.state.upvoteState) {
      upvoteStateColor = 'grey';
    }

    return (
      <div>
      <Card fluid>
        <Card.Content onClick={this.renderTopicDetailedView} header={this.props.topic.headline} />
        <Card.Content description={this.props.topic.description} />
        <Card.Content extra>
          <Button
            color={upvoteStateColor} 
            content="UpVote"
            icon='heart'
            label={{ as: 'a', basic: true, content: this.props.topic.upvotes || 0}}
            labelPosition='right'
            onClick={ this.handleClick.bind(this)}
          />
          &nbsp;
          <Icon name='comments' />
          {this.props.topic.comments || 0} comments
          &nbsp;&nbsp;
          {this.props.topic.emotion ?
            <Button compact color="blue" content={this.props.topic.emotion}/> : ''}
        </Card.Content>
      </Card>
        <TopicDetailedView />
      </div>
    );
  }  
}

export default Topic;