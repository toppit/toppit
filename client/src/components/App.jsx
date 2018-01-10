import React from 'react'
import NewTopic from './NewTopic.jsx'


class App extends React.Component {
  constructor() {
    super();
  }

  render() {


    return (
      <div>
      <div><h1>Toppit</h1></div>
      <nav>Login Goes Here</nav>
      <TopicList />
      <NewTopic />
      </div>
    );
  }
}

module.exports = App;