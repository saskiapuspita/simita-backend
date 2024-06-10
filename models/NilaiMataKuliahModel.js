const db = require("../util/database");

module.exports = class NilaiMataKuliah {
  constructor(nilai, mataKuliah, user) {
    this.nilai = nilai;
    this.mataKuliah = mataKuliah;
    this.user = user;
  }

  static fetchAll() {
    return db.execute("SELECT * FROM nilai_mata_kuliah");
  }

  static find(idMataKuliah) {
    return db.execute("SELECT * FROM nilai_mata_kuliah WHERE mataKuliah = ?", [
      idMataKuliah,
    ]);
  }

  static save(nilaiMataKuliah) {
    return db.execute(
      "INSERT INTO nilai_mata_kuliah (nilai, mataKuliah, user) VALUES (?, ?, ?)",
      [nilaiMataKuliah.nilai, nilaiMataKuliah.mataKuliah, nilaiMataKuliah.user]
    );
  }

  static delete(id) {
    return db.execute("DELETE FROM nilai_mata_kuliah WHERE id = ?", [id]);
  }
};
