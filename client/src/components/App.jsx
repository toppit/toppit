
import React from 'react';
import TopicList from './TopicList.jsx';
import NewTopic from './NewTopic.jsx';
import Login from './Login.jsx';
import NavBar from './NavBar.jsx';
import UtilsBar from './UtilsBar.jsx';
import TopicDetailed from './TopicDetailed.jsx';
import axios from 'axios';
import { Menu, Image, Sticky } from 'semantic-ui-react';
import Logo from '../images/logo.png';

var http = axios.create({
  withCredentials: true,
});

import {Link, Redirect, BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Button, Container, Header} from 'semantic-ui-react';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      topicList: [],
      filterBy: '',
      sortBy: 'timeStamp',
      // search: ''
    };

    this.createNewTopic = this.createNewTopic.bind(this);
    this.onNewTopic = this.onNewTopic.bind(this);
    this.closeNewTopic = this.closeNewTopic.bind(this);
    this.getAllTopics = this.getAllTopics.bind(this);
    this.upVote = this.upVote.bind(this);
    this.onDetailedTopic = this.onDetailedTopic.bind(this);
    this.getSelectTopics = this.getSelectTopics.bind(this);
  }

  componentDidMount() {
    this.getCurrentUser()
    .then(() => (
      this.getAllTopics()))
    .catch( (err) => console.log(err.message))
  }

  getAllTopics() {
    this.setState({
      filterBy: '',
      sortBy: 'timeStamp'
    });
    return http.get('/api/topics')

      .then(({ data }) => {
        this.setState({
          topicList: data
        });
      })

      .catch((err) => {
        console.log(err.message);
      });
  }

  getCurrentUser() {
    return http.get('/api/user/current')

      .then(({data}) => {
        console.log('Current User ', data);
        this.setState({ 
          currentUser: data 
        });
      })

      .catch((err) => {
        console.log(err.message);
      });
  }
  
  getSelectTopics(query, search) {
    if (query) {
      this.setState({
        filterBy: query.filterBy,
        sortBy: query.sortBy
      });
    } else {
      query = {
        filterBy: this.state.filterBy,
        sortBy: this.state.sortBy,
      };
    }
    http.get('/api/topics', {params: query})

      .then(({data}) => {
        if (search) {
          var filteredData = data.filter((item) => item.headline.toLowerCase().includes(search.toLowerCase()))
        }
        this.setState({
          topicList: filteredData || data,
          // search: search
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
        this.getSelectTopics();
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

  upVote (topicId, currentUser, increment) {
    http.patch(`/api/topic/${topicId}`, {
      upvotes: increment,
      currentUser: currentUser
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

  topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  render() {
    const { contextRef } = this.state

    return (
      <div className='mainapp'>
        <NavBar 
          currentUser={this.state.currentUser}
          history={this.props.history} 
          home={this.getAllTopics} 
          createNewTopic={this.createNewTopic}
          onSearch={this.getSelectTopics}
          />
        <Switch>
          <Route path='/share' render={(props) => (
            <Container>
              <NewTopic {...props}
                currentUser={this.state.currentUser}
                onNewTopic={this.onNewTopic}
                active={this.state.displayNewTopic}
                closeNewTopic={this.closeNewTopic}
              />
            </Container>
          )}/>
          <Route exact path='/' render={(props) => (
            <div>
              <Container>
                <UtilsBar 
                  defaultFilter={this.state.filterBy} 
                  defaultSort={this.state.sortBy} 
                  onDropdownChange={this.getSelectTopics}/>
                <TopicList {...props} 
                  currentUser={this.state.currentUser}
                  upVote={this.upVote} 
                  onDetailedTopic={this.onDetailedTopic} 
                  topicList={this.state.topicList} />
              </Container>
            </div>
          )}/>
          <Route path='/topic/:topicId' render={(props) => (
            <Container>
              <TopicDetailed {...props} 
                currentUser={this.state.currentUser}
                topicId={props.match.params.topicId} 
                upvote={this.upVote}/>
            </Container>
          )}/>
        </Switch> 
        <Menu attached='bottom' className='footer'>
          <Menu.Item >
          <i className="copyright icon"></i><p>2018 Prospective Technologies, Inc. All Rights Reserved.</p>
          </Menu.Item> 
          <Menu.Item className="toTop button" onClick={this.topFunction} >
            <i class="arrow up icon"></i>
          </Menu.Item>
          <Menu.Item >
            <img className="logo" src={Logo} />
          </Menu.Item> 
        </Menu>  
      </div>
    );
  }
}

export default App;