import React from 'react';
import Topic from './Topic.jsx';

const TopicList = (props) => (
      <div>
        {props.topicList.map((topic, index) => 
        <Topic topic={topic} key={index} />)}
      </div>  
);

export default TopicList;