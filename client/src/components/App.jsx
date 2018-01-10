
import React from 'react';
import TopicList from './TopicList.jsx';
import NewTopic from './NewTopic.jsx';
import http from 'axios';

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
        console.log(data);
        console.log('this',this);
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
        <div><h1>Toppit</h1></div>
        <nav>Login Goes Here</nav>
        <NewTopic onNewTopic={this.onNewTopic.bind(this)} />
        <TopicList topicList={this.state.topicList} />
    </div>
    )
  }
}

export default App;