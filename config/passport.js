const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
// Require your User Model here!
const User = require("../models/user");

// Configuring Passport!
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK,
    },
    async function (accessToken, refreshToken, profile, cb) {
      // A user has logged in via OAuth!
      // Refer to the lesson plan from earlier today in order to set this up
      try {
        // Find a user in the database that matches the profile of the user logging in
        // Set that user to the user variable
        let user = await User.findOne({ googleId: profile.id });

        // If there's a matching user, provide it to Passport
        if (user) return cb(null, user);

        // If there's no matching user, create a new user
        user = await User.create({
          userName: profile.displayName,
          googleId: profile.id,
          email: profile.emails[0].value,
        });

        return cb(null, user);
      } catch (err) {
        return cb(err);
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
  try {
    // Find the user in the database using the provided id
    const user = await User.findById(id);
    done(null, user); // req.user = user document from the database
    // When you call this done function, Passport assigns the user document to req.user,
    // which will be available in every single controller function, so you always know the logged-in user
  } catch (err) {
    done(err);
  }
});
