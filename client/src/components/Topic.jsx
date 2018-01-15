import React from 'react';
import { Card, Grid, Button, Image, Header,  Icon } from 'semantic-ui-react';
import http from 'axios';
import TopicDetailed from './TopicDetailed.jsx';
import UpvoteButton from './UpvoteButton.jsx';
import moment from 'moment';
import emojis from '../emojis';
import defaultPhoto from '../images/defaultPhoto.jpg';
 

const test = {
  topic: {
    authorId: {
      fullName: 'Mike Sutherland',
      photo: 'https://semantic-ui.com/images/avatar/large/elliot.jpg'
    }
  }
}
var colors = {};
colors[emojis[0].value] = 'yellow';
colors[emojis[1].value] = 'orange';
colors[emojis[2].value] = 'pink';
colors[emojis[3].value] = 'blue';
colors[emojis[4].value] = 'green';
colors[emojis[5].value] = 'red';
colors[emojis[6].value] = 'violet';
colors[emojis[7].value] = 'purple';
colors[emojis[8].value] = 'teal';

class Topic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: this.props.currentUser
    };
    this.renderTopicDetailedView = this.renderTopicDetailedView.bind(this);
  }
  
  renderTopicDetailedView () {
    //react router something?
    this.props.history.push(`/topic/${this.props.topic._id}`);
    this.props.onDetailedTopic(this.props.topic);
  }

  render () {

    let name = (test.topic.authorId && (test.topic.authorId.fullName || test.topic.authorId.username) || '');
    let photoUrl = (test.topic.authorId && test.topic.authorId.photo) || defaultPhoto;

    let color = colors[this.props.topic.emotion];
    let headline = /^([.]+)\s[.]+$/.exec(this.props.topic.emotion) + this.props.topic.headline 

    let meta = (
      <span>
        <span className='ui meta topicauthorname'>{name} | </span>
        <span className='ui meta topictime'>{moment(this.props.topic.timeStamp).fromNow()}</span>
      </span>
    );

    return (
      <Grid columns={2}>
        <Grid.Column verticalAlign='top' width={1}>
          <Image className='topicavatar' size='small'rounded src={photoUrl}/>
        </Grid.Column>
        <Grid.Column width={14}>
          <Card className='topiccard' color={color} fluid>
            <Card.Content onClick={this.renderTopicDetailedView} header={this.props.topic.headline} meta={meta}/>
            <Card.Content description={this.props.topic.description}/>
            <Card.Content extra>
              <UpvoteButton topic={this.props.topic} upvote={this.props.upVote} currentUser={this.state.currentUser}/>
              &nbsp;
              <a onClick={this.renderTopicDetailedView}>
                <Icon name='comments'/>
                {this.props.topic.commentId.length || 0} comments
              </a>
              &nbsp;&nbsp;
              {this.props.topic.emotion ?
              <Button compact color="blue" content={this.props.topic.emotion}/> : ''}
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid>
    );
  }  
}

export default Topic;