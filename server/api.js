const api = require('express').Router();
const db = require('../db');


// Get all topics
api.get('/topics', (req, res) => {

  if (Object.keys(req.query).length) {
    console.log(req.query);
    
    db.getSelectTopics(req.query, (error, result) => {
      if (error) {
        res.status(503).end();
        console.log(error.message);
        return;
      }
      res.status(200).send(result);
    });
  } else {
    db.getTopics((error, result) => {
      if (error) {
        res.status(503).end();
        console.log(error.message);
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
      console.log(err.message);
      res.status(503).end();
      return;
    }
    console.log('Topic: ', topic);
    res.status(200).send(topic);
  });
});


// Create a new topic
api.post('/topic', (req, res) => {
  console.log(req.body);

  db.saveTopic(req.body, (error, result) => {
    if (error) {
      res.status(503).end();
      console.log(error.message);
      return;
    }
    res.status(200).send(result);
  });
});


// Update a topic
api.patch('/topic/:topicId', (req, res) => {
  console.log('req body', req.body);
  console.log(req.params);

  db.updateVoteCount(req.params.topicId, req.body.upvotes, (error, result) => {
    if (error) {
      res.status(503).end();
      return;
    }
    res.status(200).send(result);

  });
});


//Post a comment to a topic
api.post('/topic/:topicId', (req, res) => {
  // db.updateVoteCount(req.params.topicId, req.body.upvotes, (error, result) => {
  //   if (error) {
  //     res.status(503).end();
  //     return;
  //   }
  //   res.status(200).send(result);

  // });
  res.sendStatus(201);
});

api.get('/user/:userId', (req, res) => {

  let query = {};
  if (req.params.userId === 'current') {
    query.username = req.session.passport.user;
  } else {
    query[Object.keys(req.params.userId)[0]] = req.params.userId;
  }

  db.getUser(query, (err, user) => {
    if (err) {
      res.status(400).send('Unable to retrieve user');
      console.log(err.message);
      return;
    }
    console.log(user);

    res.status(200).send(user);
  });
});

module.exports = api;