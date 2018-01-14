const api = require('express').Router();
const db = require('../db');


// Get all topics
api.get('/topics', (req, res) => {

  if (Object.keys(req.query).length) {
    
    db.getSelectTopics(req.query, (error, result) => {
      if (error) {
        res.status(503).end();
        console.log('Error: ', error.message);
        return;
      }
      res.status(200).send(result);
    });
  } else {
    db.getTopics((error, result) => {
      if (error) {
        res.status(503).end();
        console.log('Error: ', error.message);
        return;
      }
      res.status(200).send(result);
    });
  }
});


// Get an individual topic
api.get('/topic/:topicId', (req, res) => {
  console.log('Topic Id: ', req.params.topicId);
  db.getTopicById(req.params.topicId, (error, topic) => {
    if (error) {
      console.log(error.message);
      res.status(503).end();
      return;
    }
    console.log('Topic: ', topic);
    res.status(200).send(topic);
  });
});


// Create a new topic
api.post('/topic', (req, res) => {
  console.log('Creating new topic ', req.body);

  db.saveTopic(req.body, (error, result) => {
    if (error) {
      res.status(503).end();
      console.log('Error: ', error.message);
      return;
    }
    res.status(200).send(result);
  });
});


// Update a topic
api.patch('/topic/:topicId', (req, res) => {


  db.updateVoteCount(req.params.topicId, req.body.upvotes, req.body.currentUser, (error, result) => {
    if (error) {
      res.status(503).end();
      return;
    }
    console.log('resultsss, ', result)
    res.status(200).send(result);

  });
});


//Post a comment to a topic
api.post('/topic/:topicId', (req, res) => {
  
  db.saveComment(req.body, req.params.topicId, (error, result) => {
    if (error) {
      res.status(503).end();
      return;
    }
    res.status(200); // .send(result);
  });
  res.sendStatus(201);
  // db.updateVoteCount(req.params.topicId, req.body.upvotes, (error, result) => {
  //   if (error) {
  //     res.status(503).end();
  //     return;
  //   }
  //   res.status(200).send(result);

  // });
});

api.get('/user/:userId', (req, res) => {

  let query = {};
  if (req.params.userId === 'current') {
    query._id = req.session.passport.user;
  } else {
    query[Object.keys(req.params.userId)[0]] = req.params.userId;
  }

  db.getUser(query, (err, user) => {
    if (err) {
      res.status(400).send('Unable to retrieve user');
      console.log('Error: ', err.message);
      return;
    }

    res.status(200).send(user);
  });
});

module.exports = api;