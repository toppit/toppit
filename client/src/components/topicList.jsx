import React from 'react';
import {Topic} from './Topic.jsx';
import {exampleData} from '../exampleData.js';

export class TopicList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      topicList: exampleData
    }
  }

  render() {
    return (
      <div>
        {this.state.topicList.map( (topic, index) => <Topic 
          topic={topic} 
          key={index}
          />)
        }
      </div>  
        )
  }

}

module.exports = TopicList;