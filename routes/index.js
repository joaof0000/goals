const express = require("express");
const router = express.Router();
const passport = require("passport");

// The root route renders our only view 😀
router.get("/", function (req, res, next) {
  res.redirect("/goals");
});

// Google OAuth login route
router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
    failureMessage: true,
  })
);

// Google OAuth callback route
router.get(
  "/oauth2callback",
  passport.authenticate("google", {
    successRedirect: "/goals", // UPDATE THIS, where do you want the client to go after you login
    failureRedirect: "/goals", //  UPDATE THIS, where do you want the client to go if login fails
  })
);

// OAuth logout route
router.get("/logout", function (req, res) {
  req.logout(function () {
    //< - req.logout comes from passport, and what it does is destorys the cookie keeping track of the user!
    //so the user has to login again
    res.redirect("/goals");
  });
});

module.exports = router;
