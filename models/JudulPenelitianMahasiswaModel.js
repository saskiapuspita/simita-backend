const db = require("../util/database");

module.exports = class JudulPenelitianMahasiswa {
  constructor(
    namaJudulPenelitian,
    lokasiPenelitian,
    idDosenPembimbing,
    idPeminatan,
    status,
    user
  ) {
    this.namaJudulPenelitian = namaJudulPenelitian;
    this.lokasiPenelitian = lokasiPenelitian;
    this.idDosenPembimbing = idDosenPembimbing;
    this.idPeminatan = idPeminatan;
    this.status = status;
    this.user = user;
  }

  static fetchAll() {
    return db.execute("SELECT jp.namaJudulPenelitian, jp.lokasiPenelitian, jp.idDosenPembimbing, u.name as namaDosenPembimbing, jp.idPeminatan, p.nama as namaPeminatan, jp.`user`, jp.created FROM judul_penelitian_mahasiswa jp INNER JOIN users u ON jp.idDosenPembimbing = u.id INNER JOIN peminatan p ON jp.idPeminatan = p.id");
  }

  static fetchById(idJudulPenelitianMahasiswa) {
    return db.execute("SELECT * FROM judul_penelitian_mahasiswa WHERE id = ?", [idJudulPenelitianMahasiswa]);
  }

  static fetchByUserId(userId) {
    return db.execute("SELECT jp.id, jp.namaJudulPenelitian, jp.lokasiPenelitian, jp.idDosenPembimbing, u.name as namaDosenPembimbing, jp.idPeminatan, p.nama as namaPeminatan, jp.status, jp.`user`, jp.created FROM judul_penelitian_mahasiswa jp INNER JOIN users u ON jp.idDosenPembimbing = u.id INNER JOIN peminatan p ON jp.idPeminatan = p.id WHERE jp.user = ?", [userId]);
  }

  static find(namaJudulPenelitian) {
    return db.execute(
      "SELECT * FROM judul_penelitian_mahasiswa WHERE namaJudulPenelitian = ?",
      [namaJudulPenelitian]
    );
  }

  static save(judulPenelitianMahasiswa) {
    return db.execute(
      "INSERT INTO judul_penelitian_mahasiswa (namaJudulPenelitian, lokasiPenelitian, idDosenPembimbing, idPeminatan, status, user) VALUES (?, ?, ?, ?, ?, ?)",
      [
        judulPenelitianMahasiswa.namaJudulPenelitian,
        judulPenelitianMahasiswa.lokasiPenelitian,
        judulPenelitianMahasiswa.idDosenPembimbing,
        judulPenelitianMahasiswa.idPeminatan,
        judulPenelitianMahasiswa.status,
        judulPenelitianMahasiswa.user,
      ]
    );
  }

  static delete(id) {
    return db.execute("DELETE FROM judul_penelitian_mahasiswa WHERE id = ?", [
      id,
    ]);
  }

  static update(judulPenelitianMahasiswa, id) {
    return db.execute(
      "UPDATE judul_penelitian_mahasiswa SET namaJudulPenelitian = ?, lokasiPenelitian = ?, idDosenPembimbing = ?, idPeminatan = ?, user = ? WHERE id = ?",
      [
        judulPenelitianMahasiswa.namaJudulPenelitian,
        judulPenelitianMahasiswa.lokasiPenelitian,
        judulPenelitianMahasiswa.idDosenPembimbing,
        judulPenelitianMahasiswa.idPeminatan,
        judulPenelitianMahasiswa.user,
        id,
      ]
    );
  }

  static updateStatusPengajuanJudulPenelitian(pengajuanJudulPenelitian, userId) {
    return db.execute(
      "UPDATE judul_penelitian_mahasiswa SET status = ? WHERE user = ?",
      [pengajuanJudulPenelitian.status, userId]
    );
  }

  static fetchByStatusNeedApproval() {
    return db.execute("SELECT jp.id, u.name as namaMahasiswa, jp.namaJudulPenelitian, jp.lokasiPenelitian, jp.idDosenPembimbing, d.name as namaDosenPembimbing, jp.idPeminatan, p.nama as namaPeminatan, jp.status, jp.`user`, jp.created FROM judul_penelitian_mahasiswa jp INNER JOIN users d ON jp.idDosenPembimbing = d.id INNER JOIN peminatan p ON jp.idPeminatan = p.id INNER JOIN users u ON jp.user = u.id WHERE jp.status = 'Menunggu persetujuan dosen pembimbing.'");
  }
};
