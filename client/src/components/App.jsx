
import React from 'react';
import TopicList from './TopicList.jsx';
import NewTopic from './NewTopic.jsx';
import Login from './Login.jsx';
import NavBar from './NavBar.jsx';
import http from 'axios';

import {Button, Container, Header} from 'semantic-ui-react';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      topicList: []
    };
  }

  componentDidMount() {
    http.get('/topics')

      .then(({data}) => {
        this.setState({
          topicList: data
        });
      })

      .catch((err) => {
        console.log(err.message);
      });
  }

  renderNewTopicView() {
    console.log('clicked new topic! This will show new topic view page')
  }

  onNewTopic (topic) {
    //do server request to add new topic to database 
    //then get new topic and render new list to topic list.
    console.log('post request to servet to add topic', topic);
    http.post('/topic', topic)

      .then(({data}) => {
        console.log(data);
        let list = this.state.topicList;
        list.push(data);
        this.setState({
          topicList: list
        });
      })

      .catch((err) => {
        console.log(err.message);
      });
  }

  render() {
    return (
      <div>
        <NavBar/>
        <Container>
          <NewTopic onNewTopic={this.onNewTopic.bind(this)} />
          <TopicList topicList={this.state.topicList} />
        </Container>
      </div>
    );
  }
}

export default App;