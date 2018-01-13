import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import Login from './components/Login.jsx';
import './styles/styles.css';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

console.log('Rendering Main Page');

ReactDOM.render((
  <Router>
    <Switch>
      <Route exact path='/login' component={Login}/>
      <Route path='/' component={App}/>
    </Switch>
  </Router>
), document.getElementById('app'));
