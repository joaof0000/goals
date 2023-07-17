const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
//Require your User Model here!
const UserModel = require("../models/user");

// configuring Passport!
passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
  },
  async function(accessToken, refreshToken, profile, cb) {
    // a user has logged in via OAuth!
    try {
      let userDocument = await UserModel.findOne({ googleId: profile.id });

      if(userDocument) return cb(null, userDocument);

      //first time logging in create the user
      userDocument = await UserModel.create({
        Name: profile.displayName,
        googleId: profile.id,
        email: profile.emails[0].value,
        avatar: profile.photos[0].value,
      });

      //pass the created users information to the next function in the middleware chain
      return cb(null, userDocument);
    } catch(err) {
      return cb(err);
    }
  }
));

passport.serializeUser(function(user, cb) {
  cb(null, user._id);
});

// Find your User, using your model, and then call done(err, whateverYourUserIsCalled)
// When you call this done function passport assigns the user document to req.user, which will 
// be availible in every Single controller function, so you always know the logged in user
passport.deserializeUser(async function(userId, cb) {
  const user = await UserModel.findById(userId);
  cb(null, user); //req.user = user document from the database

});



