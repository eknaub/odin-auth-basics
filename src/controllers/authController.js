const bcrypt = require("bcryptjs");
const pool = require("../config/database");
const passport = require("passport");

const authController = {
  signUp: async (req, res, next) => {
    try {
      const {
        email,
        password,
        confirmPassword,
        first_name,
        last_name,
        is_admin,
      } = req.body;

      if (password !== confirmPassword) {
        return res.render("sign-up", { error: "Passwords do not match." });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      await pool.query(
        "INSERT INTO users (email, password, first_name, last_name, is_admin) VALUES ($1, $2, $3, $4, $5)",
        [email, hashedPassword, first_name, last_name, is_admin]
      );

      res.redirect("/");
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  logIn: (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.render("log-in", { error: info.message });
      }
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        return res.redirect("/dashboard");
      });
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
    res.render("sign-up", {
      error: null,
    });
  },

  getHomePage: async (req, res) => {
    const result = await pool.query(
      "SELECT * FROM messages ORDER BY created_at desc"
    );
    const messages = result.rows.map((message) => ({
      ...message,
      first_name: "Anonymous",
      last_name: "",
    }));

    if (req.user) {
      res.render("dashboard", { user: req.user });
    } else {
      res.render("index", { messages });
    }
  },

  getLogInForm: (req, res) => {
    res.render("log-in", {
      error: null,
    });
  },
};

module.exports = authController;
