const pool = require("../config/database");
const dotenv = require("dotenv");
dotenv.config();

const userController = {
  getJoinTheClubPage: (req, res) => {
    if (!req.user) {
      return res.redirect("/login");
    }

    res.render("join-the-club", {
      error: null,
    });
  },
  updateUserMembershipStatus: async (req, res) => {
    try {
      const userId = req.user.id;
      const { membership_code } = req.body;
      if (membership_code !== process.env.MEMBERSHIP_CODE) {
        return res.render("join-the-club", {
          error: "Invalid membership code.",
        });
      }

      await pool.query(
        "UPDATE users SET membership_status = $1 WHERE id = $2",
        [true, userId]
      );

      res.redirect("/dashboard");
    } catch (error) {
      console.error("Error updating membership status:", error);
      res.status(500).send("Internal Server Error");
    }
  },
};

module.exports = userController;
