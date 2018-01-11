
import React from 'react';
import TopicList from './TopicList.jsx';
import NewTopic from './NewTopic.jsx';
import Login from './Login.jsx';
import NavBar from './NavBar.jsx';
import http from 'axios';
import Moment from 'react-moment';
import 'moment-timezone';

import {Button, Container, Header} from 'semantic-ui-react';

import FacebookAuth from 'react-facebook-auth';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      topicList: []
    };

    this.createNewTopic = this.createNewTopic.bind(this);
    this.onNewTopic = this.onNewTopic.bind(this);
    this.closeNewTopic = this.closeNewTopic.bind(this);
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


  createNewTopic() {
    console.log('create new topic');
    this.setState({
      displayNewTopic: true
    });
  }

  closeNewTopic() {
    this.setState({
      displayNewTopic: false
    });
  }

  onNewTopic (topic) {
    //do server request to add new topic to database 
    //then get new topic and render new list to topic list.

    this.setState({
      displayNewTopic: false
    });
    
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
    //facebook auth//
    const MyFacebookButton = ({ onClick }) => (
      <button onClick={onClick}>
        Login with facebook
      </button>
    );

    const authenticate = (response) => {
      console.log(response);
    };
    /////////////////

    return (
      <div>
        <NavBar createNewTopic={this.createNewTopic}/>
        <Container>
          {this.state.displayNewTopic ?
            <NewTopic
              onNewTopic={this.onNewTopic}
              active={this.state.displayNewTopic}
              closeNewTopic={this.closeNewTopic}
            /> : ''}
          <FacebookAuth
            className="facebookAuthButton"
            appId="A2001932130081706"
            callback={authenticate}
            component={MyFacebookButton}
          />
          <NewTopic onNewTopic={this.onNewTopic.bind(this)} />
          <TopicList topicList={this.state.topicList} />
        </Container>
      </div>
    );
  }
}

export default App;