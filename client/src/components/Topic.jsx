import React from 'react';
import { Card, Button, Icon } from 'semantic-ui-react';
import http from 'axios';
import TopicDetailedView from './TopicDetailedView.jsx'
import UpvoteButton from './UpvoteButton.jsx'
import moment from 'moment'

class Topic extends React.Component {
  constructor(props) {
    super(props);

    this.renderTopicDetailedView = this.renderTopicDetailedView.bind(this);
  }

  renderTopicDetailedView () {
    //react router something?
    console.log('clicked Topic! Goes to topicView page');
    this.props.history.push(`/topic/${this.props.topic._id}`)
    this.props.onDetailedTopic(this.props.topic);
  }

  render () {
    
    return (
      <div>
      <Card fluid>
        <Card.Content onClick={this.renderTopicDetailedView} header={this.props.topic.headline} />
        <Card.Content description={this.props.topic.description} 
        meta={moment(this.props.topic.timeStamp).fromNow()} />
        <Card.Content extra>
          <UpvoteButton topic={this.props.topic} upvote={this.props.upVote} /> 
          &nbsp;
          <Icon name='comments' />
          {this.props.topic.comments || 0} comments
          &nbsp;&nbsp;
          {this.props.topic.emotion ?
            <Button compact color="blue" content={this.props.topic.emotion}/> : ''}
        </Card.Content>
      </Card>
      &nbsp;&nbsp;
      </div>

    );
  }  
}

export default Topic;