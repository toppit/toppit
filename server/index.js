const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;
const morgan = require('morgan');
const db = require('../db');

app.use(morgan('tiny'));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/dist')));



// GET all topics from the server
app.get('/topics', (req, res) => {
  db.getTopics((error, result) => {
    if (error) {
      res.status(503).end();
      console.log(error.message);
      return;
    }
    res.status(200).send(result);
  });
});

// GET all topics from the server
app.post('/topic', (req, res) => {
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

app.patch('/topic', (req, res) => {
  console.log('req body', req.body);

  db.updateVoteCount(req.body._id, req.body.upvote, (error, result) => {
    if (error) {
      res.status(503).end();
      console.log('uhoh, error running updatevot function', error);
      return;
    }
    console.log('the result!', result)
    res.status(200).send(result);
    
  })
})
app.listen(port, () => console.log(`listening on port ${port}!`));