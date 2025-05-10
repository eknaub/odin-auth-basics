const bcrypt = require("bcryptjs");
const pool = require("../config/database");
const passport = require("passport");

const authController = {
  signUp: async (req, res, next) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      await pool.query(
        "INSERT INTO users (username, password) VALUES ($1, $2)",
        [req.body.username, hashedPassword]
      );
      res.redirect("/");
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  logIn: (req, res, next) => {
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/",
    })(req, res, next);
  },

  logOut: async (req, res, next) => {
    try {
      await req.logout();
      res.redirect("/");
    } catch (err) {
      console.error("Logout error:", err);
      next(err);
    }
  },

  getSignUpForm: (req, res) => {
    res.render("sign-up");
  },

  getHomePage: (req, res) => {
    if (req.user) {
      // Render a different view for logged-in users
      res.render("dashboard", { user: req.user });
    } else {
      // Render the default index view for guests
      res.render("index");
    }
  },

  getLogInForm: (req, res) => {
    res.render("log-in");
  },
};

module.exports = authController;
