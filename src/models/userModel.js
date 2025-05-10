class UserModel {
  constructor(pool) {
    this.pool = pool;
  }

  async createUser(username, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await this.pool.query(
      "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *",
      [username, hashedPassword]
    );
    return result.rows[0];
  }

  async findUserByUsername(username) {
    const result = await this.pool.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );
    return result.rows[0];
  }

  async findUserById(id) {
    const result = await this.pool.query(
      "SELECT * FROM users WHERE id = $1",
      [id]
    );
    return result.rows[0];
  }
}

module.exports = UserModel;