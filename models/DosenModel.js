const db = require("../util/database");

module.exports = class User {
  constructor(name, email, nidn, role, password) {
    this.name = name;
    this.email = email;
    this.nidn = nidn;
    this.role = role;
    this.password = password;
  }

  static find(nidn) {
    return db.execute("SELECT * FROM users WHERE nidn = ?", [nidn]);
  }

  static fetchById(idUser) {
    return db.execute("SELECT * FROM users WHERE id = ?", [idUser]);
  }

  static fetchAll() {
    return db.execute("SELECT * FROM users");
  }

  static save(user) {
    return db.execute(
      "INSERT INTO users (name, email, nidn, role, password) VALUES (?, ?, ?, ?, ?)",
      [user.name, user.email, user.nidn, user.role, user.password]
    );
  }

  static delete(id) {
    return db.execute("DELETE FROM users WHERE id = ?", [id]);
  }

  static update(user, id) {
    return db.execute(
      "UPDATE users SET name = ?, email = ?, nidn = ?, role = ?, password = ? WHERE id = ?",
      [user.name, user.email, user.nidn, user.role, user.password, id]
    );
  }
};
