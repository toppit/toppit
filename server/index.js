const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;
const morgan = require('morgan');
const api = require('./api');

app.use(morgan('tiny'));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/dist')));
app.use('/topic/:topicId', express.static(path.join(__dirname, '../client/dist')));
app.use('/api', apiRouter);

// Handle internal API endpoints
app.use('/api', api);

app.listen(port, () => console.log(`listening on port ${port}!`));