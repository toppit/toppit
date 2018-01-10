import React from 'react'
import NewTopic from './NewTopic.jsx'


class App extends React.Component {
  constructor() {
    super();
  }

  renderNewTopicView() {
    console.log('clicked new topic! This will show new topic view page')
  }

  render() {


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
      <NewTopic />
      </div>
    );
  }
}

module.exports = App;