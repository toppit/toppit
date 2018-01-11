var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuthStrategy;
var GoogleCredentials = require('../config/googleAuth.config');

var GOOGLE_CONSUMER_KEY = process.env.GOOGLE_CONSUMER_KEY || GoogleCredentials.GOOGLE_CLIENT_ID;
var GOOGLE_CONSUMER_SECRET = process.env.GOOGLE_CONSUMER_SECRET || GoogleCredentials.GOOGLE_SECRET;

// Use the GoogleStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a token, tokenSecret, and Google profile), and
//   invoke a callback with a user object.
passport.use(new GoogleStrategy({
  consumerKey: '28722236365-jq47qgutedd4mfviu1fiitdmqfc1voug.apps.googleusercontent.com',
  consumerSecret: '28722236365-jq47qgutedd4mfviu1fiitdmqfc1voug',
  callbackURL: "http://www.example.com/auth/google/callback"
},
function (token, tokenSecret, profile, done) {
  User.findOrCreate({ googleId: profile.id }, function (err, user) {
    return done(err, user);
  });
}));