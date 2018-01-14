import React from 'react';
import { Card, Button, Icon } from 'semantic-ui-react';
import http from 'axios';
import TopicDetailed from './TopicDetailed.jsx';
import UpvoteButton from './UpvoteButton.jsx';
import moment from 'moment';

class Topic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: this.props.currentUser
    }
    this.renderTopicDetailedView = this.renderTopicDetailedView.bind(this);
  }
  
  renderTopicDetailedView () {
    //react router something?
    this.props.history.push(`/topic/${this.props.topic._id}`)
    this.props.onDetailedTopic(this.props.topic);
  }

  render () {

    return (
      <Card color="teal" fluid>
        <Card.Content onClick={this.renderTopicDetailedView} header={this.props.topic.headline} meta={moment(this.props.topic.timeStamp).fromNow()}/>
        <Card.Content description={this.props.topic.description}/>
        <Card.Content extra>
        <UpvoteButton topic={this.props.topic} upvote={this.props.upVote} currentUser={this.state.currentUser}/>
          &nbsp;
          <a onClick={this.renderTopicDetailedView}>
            <Icon name='comments'/>
            {this.props.topic.comments || 0} comments
          </a>
          &nbsp;&nbsp;
          {this.props.topic.emotion ?
            <Button compact color="blue" content={this.props.topic.emotion}/> : ''}
        </Card.Content>
      </Card>
    );
  }  
}

export default Topic;