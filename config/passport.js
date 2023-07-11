const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
//Require your User Model here!

// configuring Passport!
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
  },
  function(accessToken, refreshToken, profile, cb) {
    // a user has logged in via OAuth!
    // refer to the lesson plan from earlier today in order to set this up
    User.findOne({ googleId: profile.id }, function (err, user) {
      if (err) {
        return cb(err);
      }
      if (!user) {
        // Create a new user if it doesn't exist
        user = new User({
          username: profile.displayName,
          googleId: profile.id,
          // Additional fields based on the profile data
        });
        user.save(function (err) {
          if (err) {
            return cb(err);
          }
          return cb(null, user);
        });
      } else {
        // User already exists, so just return it
        return cb(null, user);
      }
    });
  }
));


passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

  // Find your User, using your model, and then call done(err, whateverYourUserIsCalled)
  // When you call this done function passport assigns the user document to req.user, which will 
  // available in every Single controller function, so you always know the logged in user
  // if there is one









