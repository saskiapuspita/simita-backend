const db = require("../util/database");

module.exports = class MataKuliah {
  constructor(nama, sks, minat, user) {
    this.nama = nama;
    this.sks = sks;
    this.minat = minat;
    this.user = user;
  }

  static fetchAll() {
    return db.execute("SELECT * FROM mata_kuliah");
  }

  static fetchById(idMataKuliah) {
    return db.execute("SELECT * FROM mata_kuliah WHERE id = ?", [idMataKuliah]);
  }

  static fetchMatkulBasedOnIdPeminatan(idPeminatan) {
    return db.execute("SELECT * FROM mata_kuliah WHERE minat = ?", [idPeminatan]);
  }

  static fetchNamaPeminatanBasedOnIdMinat() {
    return db.execute("SELECT p.id as idPeminatan, p.nama as namaPeminatan, mk.id as idMatkul, mk.nama as namaMatkul, mk.sks as sks FROM mata_kuliah mk INNER JOIN peminatan p ON mk.minat = p.id");
  }

  static find(nama) {
    return db.execute("SELECT * FROM mata_kuliah WHERE nama = ?", [nama]);
  }

  static save(mataKuliah) {
    return db.execute(
      "INSERT INTO mata_kuliah (nama, sks, minat, user) VALUES (?, ?, ?, ?)",
      [mataKuliah.nama, mataKuliah.sks, mataKuliah.minat, mataKuliah.user]
    );
  }

  static delete(id) {
    return db.execute("DELETE FROM mata_kuliah WHERE id = ?", [id]);
  }

  static update(mataKuliah, id) {
    return db.execute(
      "UPDATE mata_kuliah SET nama = ?, sks = ?, minat = ?, user = ? WHERE id = ?",
      [mataKuliah.nama, mataKuliah.sks, mataKuliah.minat, mataKuliah.user, id]
    );
  }
};
