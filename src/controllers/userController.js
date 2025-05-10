const pool = require('../config/database');

const userController = {
  getUserProfile: async (req, res) => {
    try {
      const userId = req.user.id;
      const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);
      const user = rows[0];

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  updateUserProfile: async (req, res) => {
    try {
      const userId = req.user.id;
      const { username, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);

      await pool.query(
        'UPDATE users SET username = $1, password = $2 WHERE id = $3',
        [username, hashedPassword, userId]
      );

      res.status(200).json({ message: 'User profile updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

module.exports = userController;