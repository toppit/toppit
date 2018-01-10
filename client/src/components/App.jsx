import React from 'react';
import {TopicList} from './topicList.jsx'
class App extends React.Component {
  constructor() {
    super();
  }

  renderNewTopicView() {
    console.log('clicked new topic! This will show new topic view page')
  }

  render() {
    // console.log('Hello');
    return (
      <div>
      <div><h1>Toppit</h1></div>
      <nav>Login Goes Here</nav>
      <button type="button" 
      name="newTopicView" 
      onClick={() => this.renderNewTopicView()}>
      Add new Topic!
      </button>
      <TopicList />
      </div>
    );
  }
}

module.exports = App;