const db = require("../util/database");

module.exports = class peminatanMahasiswa {
  constructor(ipk, pilihanPeminatan, user) {
    this.ipk = ipk;
    this.pilihanPeminatan = pilihanPeminatan;
    this.user = user;
  }

  static fetchAll() {
    return db.execute("SELECT * FROM peminatan_mahasiswa");
  }

  static fetchByUserId(idUser) {
    return db.execute("SELECT * FROM peminatan_mahasiswa WHERE user = ?", [
      idUser,
    ]);
  }

  static fetchNamaPeminatan() {
    return db.execute("SELECT pm.pilihanPeminatan, p.nama FROM peminatan_mahasiswa pm INNER JOIN peminatan p ON pm.pilihanPeminatan = p.id");
  }

  static find(idPeminatan) {
    return db.execute(
      "SELECT * FROM peminatan_mahasiswa WHERE pilihanpeminatan = ?",
      [idPeminatan]
    );
  }

  static save(peminatanMahasiswa) {
    return db.execute(
      "INSERT INTO peminatan_mahasiswa (ipk, pilihanPeminatan, user) VALUES (?, ?, ?)",
      [
        peminatanMahasiswa.ipk,
        peminatanMahasiswa.pilihanPeminatan,
        peminatanMahasiswa.user,
      ]
    );
  }

  static delete(id) {
    return db.execute("DELETE FROM peminatan_mahasiswa WHERE id = ?", [id]);
  }
};
