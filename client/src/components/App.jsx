
import React from 'react';
import TopicList from './TopicList.jsx';
import NewTopic from './NewTopic.jsx';
import Login from './Login.jsx';
import NavBar from './NavBar.jsx';
import UtilsBar from './UtilsBar.jsx';
import TopicListDetailed from './TopicDetailed.jsx';
import http from 'axios';

import {Link, Redirect, BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Button, Container, Header} from 'semantic-ui-react';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      topicList: [],
      filterBy: '',
      sortBy: ''
    };

    this.createNewTopic = this.createNewTopic.bind(this);
    this.onNewTopic = this.onNewTopic.bind(this);
    this.closeNewTopic = this.closeNewTopic.bind(this);
    this.getAllTopics = this.getAllTopics.bind(this);
    this.upVote = this.upVote.bind(this);
    this.onDetailedTopic = this.onDetailedTopic.bind(this);
  }

  componentDidMount() {
    this.getAllTopics();
  }

  getAllTopics() {
    this.setState({
      filterBy: '',
      sortBy: 'timeStamp'
    });
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
  
  getSelectTopics(query) {
    console.log('hello' + query)
    if (query) {
      this.setState({
        filterBy: query.filterBy,
        sortBy: query.sortBy
      })
    } else {
      console.log('hello state' + this.state);
      query = {
        filterBy: this.state.filterBy,
        sortBy: this.state.sortBy
      }
      console.log('hello query again' + query);
    }
    http.get('/selectTopics', {params: query})

    .then(({data}) => {
      console.log(data);
      this.setState({
        topicList: data
      });
    })

    .catch((err) => {
      console.log(err.message);
    });
  }


  createNewTopic() {
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

  onDetailedTopic(topic) {
    this.setState({
      selectedTopic: topic
    });
  }

  upVote (topicId) {

    http.patch(`/topic/${topicId}`, {
      upvotes: 1
    })      
      .then( ({data}) => {
        // function to be implemented to get all topics
        this.getSelectTopics();
      })
      .catch( (error) => {
        console.log(error);
      });
    
  }

  downVote (topicId) {

  }  

  render() {
    return (
      <div>
        <UtilsBar onDropdownChange={this.getSelectTopics.bind(this)}/>
        <NavBar history={this.props.history} home={this.getAllTopics} createNewTopic={this.createNewTopic}/>
        <Container>
          <Switch>
            <Route path='/share' render={(props) => (
              <NewTopic {...props}
                onNewTopic={this.onNewTopic}
                active={this.state.displayNewTopic}
                closeNewTopic={this.closeNewTopic}
              />)}/>
            <Route exact path='/' render={(props) => (
              <TopicList {...props} upVote={this.upVote} onDetailedTopic={this.onDetailedTopic} topicList={this.state.topicList} />
            )}/>
            <Route path='/topic/:topicId' render={(props) => (
              <TopicListDetailed {...props} topic={this.selectedTopic} />
            )}/>
          </Switch>    
        </Container>
      </div>
    );
  }
}

export default App;