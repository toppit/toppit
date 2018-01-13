const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const api = require('./api');
const db = require('../db');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
// const auth = require('./Auth');


app.use(morgan('tiny'));
app.use(express.json());
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());


app.post('/login', passport.authenticate('local'), function (req, res) {
  res.redirect('/');
});

app.post('/register', function (req, res) {
  
  User.register(new User({ username: req.body.username }), req.body.password, function (err, account) {
    if (err) {
      res.redirect('/login');
    }

    passport.authenticate('local')(req, res, function () {
      res.redirect('/');
    });
  });
});


app.use('/login', express.static(path.join(__dirname, '../client/dist')));

// app.use(passport.authenticate('facebook'));
app.use(passport.authenticate('local'));
app.use('/api', api);

app.use(express.static(path.join(__dirname, '../client/dist')));
app.get('/topic/:topicId', express.static(path.join(__dirname, '../client/dist')));

app.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/login');
});


// passport config
var User = require('../db').User;
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

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