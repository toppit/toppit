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
      res.statusCode(503).end();
      console.log(error.message);
      return;
    }
    res.statusCode(200).send(result);
  });
});



app.listen(port, () => console.log(`listening on port ${port}!`));