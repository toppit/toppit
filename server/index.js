const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;
const morgan = require('morgan');
const api = require('./api');
const auth = require('./auth');
const db = require('../db');
const passport = require('passport');


app.use(morgan('tiny'));
app.use(cookieParser());
app.use(session({ 
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false 
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());

/////////////////////// PUBLIC ENDPOINTS ///////////////////////////////

app.use(auth);
app.use('/login', express.static(path.join(__dirname, '../client/dist')));

/////////////////////// PRIVATE ENDPOINTS ///////////////////////////////

app.use((req, res, next) => {
  
  if (req.session.passport) {
    if (req.session.passport.user) {
      next();
    }
  } else {
    res.redirect('/login');
  }
});

app.use('/api', api);


app.use(express.static(path.join(__dirname, '../client/dist')));
app.use('/topic/:topicId', express.static(path.join(__dirname, '../client/dist')));







// GET /auth/google
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Google authentication will involve redirecting
//   the user to google.com.  After authorization, Google will redirect the user
//   back to this application at /auth/google/callback
// app.get('/auth/google',
//   passport.authenticate('google', { scope: 'https://www.google.com/m8/feeds' }));

// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
// app.get('/auth/google/callback',
//   passport.authenticate('google', { failureRedirect: '/login' }),
//   function (req, res) {
//     res.redirect('/');
//   });


// Facebook Auth
// app.get('/auth/facebook',
//   passport.authenticate('facebook'));

// app.get('/auth/facebook/callback', 
//   passport.authenticate('facebook', { 
//     failureRedirect: '/login' 
//   }), (req, res) => {
//     res.redirect('/');
//   });






app.listen(port, () => console.log(`listening on port ${port}!`));

