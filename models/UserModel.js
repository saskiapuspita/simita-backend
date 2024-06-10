// import { Sequelize } from "sequelize";
// import db from "../config/Database.js";

// const { DataTypes } = Sequelize;

// const Users = db.define('users', {
//     name: {
//         type: DataTypes.STRING
//     },
//     email: {
//         type: DataTypes.STRING
//     },
//     password: {
//         type: DataTypes.STRING
//     }
// }, {
//     freezeTableName: true
// });

// export default Users;

const db = require("../util/database");

module.exports = class User {
  constructor(name, email, nim, ipk, role, password) {
    this.name = name;
    this.email = email;
    this.nim = nim;
    this.ipk = ipk;
    this.role = role;
    this.password = password;
  }

  static find(nim) {
    return db.execute("SELECT * FROM users WHERE nim = ?", [nim]);
  }

  static fetchById(idUser) {
    return db.execute("SELECT * FROM users WHERE id = ?", [idUser]);
  }

  static fetchAll() {
    return db.execute("SELECT * FROM users");
  }

  static save(user) {
    return db.execute(
      "INSERT INTO users (name, email, nim, ipk, role, password) VALUES (?, ?, ?, ?, ?, ?)",
      [user.name, user.email, user.nim, user.ipk, user.role, user.password]
    );
  }

  static delete(id) {
    return db.execute("DELETE FROM users WHERE id = ?", [id]);
  }

  static update(user, id) {
    return db.execute(
      "UPDATE users SET name = ?, email = ?, nim = ?, ipk = ?, role = ?, password = ? WHERE id = ?",
      [user.name, user.email, user.nim, user.ipk, user.role, user.password, id]
    );
  }
};
