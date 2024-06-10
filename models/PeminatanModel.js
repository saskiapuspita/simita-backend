const db = require("../util/database");

module.exports = class Peminatan {
  constructor(nama, user) {
    this.nama = nama;
    this.user = user;
  }

  static fetchAll() {
    return db.execute("SELECT * FROM peminatan");
  }

  static fetchById(idPeminatan) {
    return db.execute("SELECT * FROM peminatan WHERE id = ?", [idPeminatan]);
  }

  static find(nama) {
    return db.execute("SELECT * FROM peminatan WHERE nama = ?", [nama]);
  }

  static save(peminatan) {
    return db.execute("INSERT INTO peminatan (nama, user) VALUES (?, ?)", [
      peminatan.nama,
      peminatan.user,
    ]);
  }

  static delete(id) {
    return db.execute("DELETE FROM peminatan WHERE id = ?", [id]);
  }

  static update(peminatan, id) {
    return db.execute("UPDATE peminatan SET nama = ? WHERE id = ?", [
      peminatan.nama,
      id,
    ]);
  }
};
