const db = require("../util/database");

module.exports = class NilaiPeminatanMahasiswa {
  constructor(
    idPeminatan,
    urutanMinat,
    idMatkul1,
    nilaiMatkul1,
    idMatkul2,
    nilaiMatkul2,
    idMatkul3,
    nilaiMatkul3,
    idMatkul4,
    nilaiMatkul4,
    idMatkul5,
    nilaiMatkul5,
    isFinalSubmit,
    user
  ) {
    this.idPeminatan = idPeminatan;
    this.urutanMinat = urutanMinat;
    this.idMatkul1 = idMatkul1;
    this.nilaiMatkul1 = nilaiMatkul1;
    this.idMatkul2 = idMatkul2;
    this.nilaiMatkul2 = nilaiMatkul2;
    this.idMatkul3 = idMatkul3;
    this.nilaiMatkul3 = nilaiMatkul3;
    this.idMatkul4 = idMatkul4;
    this.nilaiMatkul4 = nilaiMatkul4;
    this.idMatkul5 = idMatkul5;
    this.nilaiMatkul5 = nilaiMatkul5;
    this.isFinalSubmit = isFinalSubmit;
    this.user = user;
  }

  static fetchAll() {
    return db.execute("SELECT * FROM nilai_matkul_peminatan_mahasiswa");
  }

  static fetchByUserId(idUser) {
    return db.execute(
      "SELECT * FROM nilai_matkul_peminatan_mahasiswa WHERE user = ?",
      [idUser]
    );
  }

  static fetchDataTableNilaiPeminatanMahasiswa(idUser) {
    return db.execute(
      // "SELECT pm.idPeminatan, p.nama AS namaPeminatan, pm.urutanMinat, pm.idMatkul1, mk.nama AS namaMatkul, pm.nilai FROM nilai_matkul_peminatan_mahasiswa pm INNER JOIN peminatan p ON pm.idPeminatan = p.id INNER JOIN mata_kuliah mk ON pm.idMatkul = mk.id"
      "SELECT nmpm.id, p.id as idPeminatan, p.nama as namaPeminatan, nmpm.urutanMinat, nmpm.idMatkul1, mk1.nama as namaMatkul1, nmpm.nilaiMatkul1, nmpm.idMatkul2, mk2.nama as namaMatkul2, nmpm.nilaiMatkul2, nmpm.idMatkul3, mk3.nama as namaMatkul3, nmpm.nilaiMatkul3, nmpm.idMatkul4, mk4.nama as namaMatkul4, nmpm.nilaiMatkul4, nmpm.idMatkul5, mk5.nama as namaMatkul5, nmpm.nilaiMatkul5 FROM nilai_matkul_peminatan_mahasiswa nmpm INNER JOIN peminatan p ON p.id = nmpm.idPeminatan INNER JOIN mata_kuliah mk1 ON mk1.id = nmpm.idMatkul1 INNER JOIN mata_kuliah mk2 ON mk2.id = nmpm.idMatkul2 INNER JOIN mata_kuliah mk3 ON mk3.id = nmpm.idMatkul3 INNER JOIN mata_kuliah mk4 ON mk4.id = nmpm.idMatkul4 INNER JOIN mata_kuliah mk5 ON mk5.id = nmpm.idMatkul5 WHERE nmpm.user = ?",
      [idUser]
    );
  }

  static find(idMatkul) {
    return db.execute(
      "SELECT * FROM nilai_matkul_peminatan_mahasiswa WHERE idMatkul = ?",
      [idMatkul]
    );
  }

  static save(nilaiMatkulPeminatanMahasiswa) {
    return db.execute(
      "INSERT INTO nilai_matkul_peminatan_mahasiswa (idPeminatan, urutanMinat, idMatkul1, nilaiMatkul1, idMatkul2, nilaiMatkul2, idMatkul3, nilaiMatkul3, idMatkul4, nilaiMatkul4, idMatkul5, nilaiMatkul5, user) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        nilaiMatkulPeminatanMahasiswa.idPeminatan,
        nilaiMatkulPeminatanMahasiswa.urutanMinat,
        nilaiMatkulPeminatanMahasiswa.idMatkul1,
        nilaiMatkulPeminatanMahasiswa.nilaiMatkul1,
        nilaiMatkulPeminatanMahasiswa.idMatkul2,
        nilaiMatkulPeminatanMahasiswa.nilaiMatkul2,
        nilaiMatkulPeminatanMahasiswa.idMatkul3,
        nilaiMatkulPeminatanMahasiswa.nilaiMatkul3,
        nilaiMatkulPeminatanMahasiswa.idMatkul4,
        nilaiMatkulPeminatanMahasiswa.nilaiMatkul4,
        nilaiMatkulPeminatanMahasiswa.idMatkul5,
        nilaiMatkulPeminatanMahasiswa.nilaiMatkul5,
        nilaiMatkulPeminatanMahasiswa.user,
      ]
    );
  }

  static delete(id) {
    return db.execute(
      "DELETE FROM nilai_matkul_peminatan_mahasiswa WHERE id = ?",
      [id]
    );
  }

  static updateIsFinalSubmit(nilaiPeminatanMahasiswa, id) {
    return db.execute(
      "UPDATE nilai_matkul_peminatan_mahasiswa SET isFinalSubmit = ? WHERE id = ?",
      [nilaiPeminatanMahasiswa.isFinalSubmit, id]
    );
  }
};
