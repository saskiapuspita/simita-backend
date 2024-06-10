const db = require("../util/database");

module.exports = class NilaiPeminatanMahasiswa {
  constructor(idPeminatan, urutanMinat, idMatkul, nilai, user) {
    this.idPeminatan = idPeminatan;
    this.urutanMinat = urutanMinat;
    this.idMatkul = idMatkul;
    this.nilai = nilai;
    this.user = user;
  }

  static fetchAll() {
    return db.execute("SELECT * FROM nilai_matkul_peminatan_mahasiswa");
  }

  static fetchByUserId(idUser) {
    return db.execute("SELECT * FROM nilai_matkul_peminatan_mahasiswa WHERE user = ?", [
      idUser,
    ]);
  }

  static fetchNamaPeminatanNamaMatkulNilai() {
    return db.execute("SELECT pm.idPeminatan, p.nama AS namaPeminatan, pm.urutanMinat, pm.idMatkul, mk.nama AS namaMatkul, pm.nilai FROM nilai_matkul_peminatan_mahasiswa pm INNER JOIN peminatan p ON pm.idPeminatan = p.id INNER JOIN mata_kuliah mk ON pm.idMatkul = mk.id");
  }

  static find(idMatkul) {
    return db.execute(
      "SELECT * FROM nilai_matkul_peminatan_mahasiswa WHERE idMatkul = ?",
      [idMatkul]
    );
  }

  static save(nilaiMatkulPeminatanMahasiswa) {
    return db.execute(
      "INSERT INTO nilai_matkul_peminatan_mahasiswa (idPeminatan, urutanMinat, idMatkul, nilai, user) VALUES (?, ?, ?, ?, ?)",
      [
        nilaiMatkulPeminatanMahasiswa.idPeminatan,
        nilaiMatkulPeminatanMahasiswa.urutanMinat,
        nilaiMatkulPeminatanMahasiswa.idMatkul,
        nilaiMatkulPeminatanMahasiswa.nilai,
        nilaiMatkulPeminatanMahasiswa.user,
      ]
    );
  }

  static delete(id) {
    return db.execute("DELETE FROM nilai_matkul_peminatan_mahasiswa WHERE id = ?", [id]);
  }
};
