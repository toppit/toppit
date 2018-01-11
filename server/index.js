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

app.get('/selectTopics', (req, res) => {
  console.log(req.query.sortCriteria);
  // db.getSelectTopics((error, result) => {
  //   if (error) {
  //     re.status(503).end();
  //     console.log(error.message);
  //     return;
  //   }
    // res.status(200).send(result);
  // })
})

// Post topic from the server
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

app.patch('/topic/:topicId', (req, res) => {
  console.log('req body', req.body);
  console.log(req.params);
// { vote: decrement}


  db.updateVoteCount(req.params.topicId, req.body.upvotes, (error, result) => {
    if (error) {
      res.status(503).end();
      return;
    }
    res.status(200).send(result);
    
  })
})
app.listen(port, () => console.log(`listening on port ${port}!`));