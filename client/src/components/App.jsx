import React from 'react';
import {TopicList} from './topicList.jsx'
class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    // console.log('Hello');
    return (
      <div>
      <div><h1>Toppit</h1></div>
      <nav>Login Goes Here</nav>
      <TopicList />
      </div>
    );
  }
}

module.exports = App;