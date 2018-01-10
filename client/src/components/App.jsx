import React from 'react';
import NewTopic from './NewTopic.jsx'
class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div><h1>Hello World</h1>
      <NewTopic />
      </div>
    );
  }
}

module.exports = App;