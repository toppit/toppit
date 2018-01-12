
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
    http.get('/api/topics')

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
    if (query) {
      this.setState({
        filterBy: query.filterBy,
        sortBy: query.sortBy
      });
    } else {
      query = {
        filterBy: this.state.filterBy,
        sortBy: this.state.sortBy
      };
    }
    http.get('/api/topics', {params: query})

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
    
    http.post('/api/topic', topic)

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
    console.log(topic);
    this.setState({
      selectedTopic: topic
    });
  }

  upVote (topicId) {

    http.patch(`/api/topic/${topicId}`, {
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
    console.log(this.state.selectedTopic);
    return (
      <div>
        <NavBar history={this.props.history} home={this.getAllTopics} createNewTopic={this.createNewTopic}/>
        <Switch>
          <Route path='/share' render={(props) => (
            <Container>
              <NewTopic {...props}
                onNewTopic={this.onNewTopic}
                active={this.state.displayNewTopic}
                closeNewTopic={this.closeNewTopic}
              />
            </Container>
          )}/>
          <Route exact path='/' render={(props) => (
            <div>
              <UtilsBar onDropdownChange={this.getSelectTopics.bind(this)}/>
              <Container>
                <TopicList {...props} upVote={this.upVote} onDetailedTopic={this.onDetailedTopic} topicList={this.state.topicList} />
              </Container>
            </div>
          )}/>
          <Route path='/topic/:topicId' render={(props) => (
            <Container>
              <TopicListDetailed {...props} topicId={props.match.params.topicId} />
            </Container>
          )}/>
        </Switch>    
      </div>
    );
  }
}

export default App;