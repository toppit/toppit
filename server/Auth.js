var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var facebookCredentials = require('../config/facebookAuth.config');
var GoogleStrategy = require('passport-google-oauth').OAuthStrategy;
var GoogleCredentials = require('../config/googleAuth.config');



var User = {
  findOrCreate: function (facebookId, callback) {
    User.user.facebookId = facebookId;
    console.log('user: ', User.user);
    callback(null, User.user);
  },
  findById: function (id, callback) {
    callback(null, User.user);
  },
  user: {
    _id: '434279842342342342',
    facebookId: '',
    name: 'Bob',
    email: 'bob@email.com',
    username: 'bob33'
  }
};



passport.use(new FacebookStrategy({
  clientID: facebookCredentials.id,
  clientSecret: facebookCredentials.secret,
  callbackURL: "http://localhost:3000/auth/facebook/callback"
}, function (accessToken, refreshToken, profile, done) {
  console.log('Callback called');
  User.findOrCreate({facebookid: profile.id}, function (err, user) {
    console.log('User: ', user);
    if (err) { return done(err); }
    done(null, user);
  });
}));



// Use the GoogleStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a token, tokenSecret, and Google profile), and
//   invoke a callback with a user object.
passport.use(new GoogleStrategy({
  consumerKey: '28722236365-jq47qgutedd4mfviu1fiitdmqfc1voug.apps.googleusercontent.com',
  consumerSecret: '28722236365-jq47qgutedd4mfviu1fiitdmqfc1voug',
  callbackURL: 'http://localhost:3000/auth/google/callback'
}, function (token, tokenSecret, profile, done) {
  User.findOrCreate({ googleId: profile.id }, function (err, user) {
    return done(err, user);
  });
}));



passport.serializeUser(function (user, done) {
  console.log('Serializing User', user);
  done(null, user._id);
});

passport.deserializeUser(function (id, done) {
  console.log('Deserializing User', id);
  User.findById(id, function (err, user) {
    done(err, user);
  });
});