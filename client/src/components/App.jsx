
import React from 'react';
import TopicList from './topicList.jsx'
import NewTopic from './NewTopic.jsx'

class App extends React.Component {
  constructor() {
    super();
  }

  renderNewTopicView() {
    console.log('clicked new topic! This will show new topic view page')
  }

  onNewTopic (topic) {
    //do server request to add new topic to database 
    //then get new topic and render new list to topic list.
    console.log('post request to servet to add topic', topic)
  }

  render() {


    return (
      <div>
      <div><h1>Toppit</h1></div>
      <nav>Login Goes Here</nav>
      <NewTopic
      onNewTopic={this.onNewTopic.bind(this)}
      />
      <TopicList />
      <NewTopic />
      </div>
    )
  }
}

export default App;