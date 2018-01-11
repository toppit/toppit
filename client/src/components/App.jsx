
import React from 'react';
import TopicList from './TopicList.jsx';
import NewTopic from './NewTopic.jsx';
import Login from './Login.jsx';
import NavBar from './NavBar.jsx';
import http from 'axios';

import {Link, Redirect, BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Button, Container, Header} from 'semantic-ui-react';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      topicList: []
    };

    this.createNewTopic = this.createNewTopic.bind(this);
    this.onNewTopic = this.onNewTopic.bind(this);
    this.closeNewTopic = this.closeNewTopic.bind(this);
    this.getAllTopics = this.getAllTopics.bind(this);
    this.upVote = this.upVote.bind(this)
  }

  componentDidMount() {
    this.getAllTopics();
  }

  getAllTopics() {
    http.get('/topics')

      .then(({ data }) => {
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
    console.log('New Topic');
    this.setState({
      displayNewTopic: false
    });
  }

  onNewTopic (topic) {
    //do server request to add new topic to database 
    //then get new topic and render new list to topic list.
    console.log('post request to servet to add topic', topic);

    this.setState({
      displayNewTopic: false
    });
    
    http.post('/topic', topic)

      .then(({data}) => {
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

  upVote (topicId) {

    http.patch(`/topic/${topicId}`, {
      upvotes: 1
    })      
      .then( ({data}) => {
        console.log(data);
        // function to be implemented to get all topics
        this.getAllTopics();
      })
      .catch( (error) => {
        console.log(error);
      });
    
  }

  downVote (topicId) {

  }  

  render() {
    console.log(this.state.displayNewTopic);
    return (
      <div>
        <NavBar home={this.getAllTopics} createNewTopic={this.createNewTopic}/>
        <Container>
          <Switch>
            <Route path='/share' render={(props) => {

              return (<NewTopic
                {...props}
                onNewTopic={this.onNewTopic}
                active={this.state.displayNewTopic}
                closeNewTopic={this.closeNewTopic}
              />
              )}}/>
            <Route path='/' render={(props) => (
              <TopicList {...props} upVote={this.upVote} topicList={this.state.topicList} />
            )}/>
          </Switch>    
        </Container>
      </div>
    );
  }
}

export default App;