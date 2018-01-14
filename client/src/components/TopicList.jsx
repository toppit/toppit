import React from 'react';
import Topic from './Topic.jsx';
import {Container} from 'semantic-ui-react';


const TopicList = (props) => (
  <Container>
    {props.topicList.map((topic, index) => (
      <Topic {...props} 
        topic={topic} 
        key={index} 
        upVote={props.upVote}
        currentUser={props.currentUser} 
      />))}
  </Container>);

export default TopicList;

