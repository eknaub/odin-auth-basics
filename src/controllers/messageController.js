const pool = require("../config/database");

const messageController = {
  getDashboard: async (req, res) => {
    try {
      const messages = await pool.query(
        `SELECT messages.id, messages.content, messages.created_at, users.first_name, users.last_name
         FROM messages
         JOIN users ON messages.user_id = users.id
         ORDER BY messages.created_at DESC`
      );
      res.render("dashboard", { user: req.user, messages: messages.rows });
    } catch (error) {
      console.error("Error fetching messages:", error);
      res.status(500).send("Internal Server Error");
    }
  },
  addMessage: async (req, res) => {
    try {
      const { content } = req.body;
      const userId = req.user.id;
      await pool.query(
        "INSERT INTO messages (content, user_id) VALUES ($1, $2)",
        [content, userId]
      );
      res.redirect("/dashboard");
    } catch (error) {
      console.error("Error adding message:", error);
      res.status(500).send("Internal Server Error");
    }
  },
  deleteMessage: async (req, res) => {
    try {
      const messageId = req.params.id;
      await pool.query("DELETE FROM messages WHERE id = $1", [messageId]);
      res.redirect("/dashboard");
    } catch (error) {
      console.error("Error deleting message:", error);
      res.status(500).send("Internal Server Error");
    }
  },
};

module.exports = messageController;
