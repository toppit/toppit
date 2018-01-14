// var passport = require('passport');
// var FacebookStrategy = require('passport-facebook').Strategy;
// var facebookCredentials = require('../config/facebookAuth.config');
// var GoogleStrategy = require('passport-google-oauth').OAuthStrategy;
// var GoogleCredentials = require('../config/googleAuth.config');

const route = require('express').Router();
const User = require('../db').User;
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const GitHubStrategy = require('passport-github').Strategy;
const db = require('../db');

const port = 3000;
const server = process.env.SERVER_IP || `http://localhost:${port}`;

// Local Strategy (Username & Password)
passport.use(User.createStrategy());
passport.serializeUser(function (user, done) {
  done(null, user._id);
});

passport.deserializeUser(function (id, done) {
  db.getUser({_id: id}, function (err, user) {
    done(err, user);
  });
});
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

// Google OAuth2 Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_ID || require('../config/google.config').id,
  clientSecret: process.env.GOOGLE_SECRET || require('../config/google.config').secret,
  callbackURL: `${server}/auth/google/callback`
},
  function (accessToken, refreshToken, profile, done) {
    db.findOrCreateUser({ googleId: profile.id }, {
      fullName: profile.displayName,
      photo: profile.photos[0].value
    }, function (err, user) {
      if (err) {
        console.log(err.message);
      }
      return done(err, user);
    });
  }
));


passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_ID || require('../config/github.config').id,
  clientSecret: process.env.GITHUB_SECRET || require('../config/github.config').secret,
  callbackURL: `${server}/auth/github/callback`
},
  function (accessToken, refreshToken, profile, cb) {
    db.findOrCreateUser({ githubId: profile.id }, {
      fullName: profile.displayName,
      photo: profile.photos[0].value
    }, function (err, user) {
      return cb(err, user);
    });
  }
));



route.post('/login', passport.authenticate('local'), (req, res) => {
  res.status(200).end(req.user.username);
});

route.post('/register', function (req, res, next) {

  User.register(new User({ username: req.body.username }), req.body.password, function (err, user) {
    if (err) {
      res.status(409).send('username already exists, please choose a different username');
      return;
    }

    req.login(user, (err) => {
      if (err) {
        return next(err);
      }

      res.status(201).end(user.username);
    });
  });
});




//Google OAuth2 endpoints
route.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

route.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function (req, res) {
    res.redirect('/');
  });


route.get('/auth/github',
  passport.authenticate('github'));

route.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  function (req, res) {
    // Successful authentication, redirect home. 
    res.redirect('/');
  });



//Logout of current session
route.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/login');
});

module.exports = route;
