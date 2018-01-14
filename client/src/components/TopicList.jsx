import React from 'react';
import Topic from './Topic.jsx';
import {Container} from 'semantic-ui-react';


const TopicList = (props) => (
  <Container>
    {props.topicList.map((topic) => (
      <Topic {...props} 
        topic={topic} 
        key={topic._id} 
        upVote={props.upVote}
        currentUser={props.currentUser} 
      />))}
  </Container>);

export default TopicList;

