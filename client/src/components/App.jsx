import React from 'react';

class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    console.log('Hello');
    return (
      <div><h1>Hello World</h1></div>
    );
  }
}

module.exports = App;