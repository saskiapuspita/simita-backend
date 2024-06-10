const { validationResult } = require("express-validator");

const NilaiPeminatanMahasiswa = require("../models/NilaiPeminatanMahasiswaModel");

exports.fetchAll = async (req, res, next) => {
  try {
    const [allNilaiPeminatanMahasiswa] = await NilaiPeminatanMahasiswa.fetchAll();
    res.status(200).json(allNilaiPeminatanMahasiswa);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.fetchByUserId = async (req, res, next) => {
  try {
    const nilaiPeminatanMahasiswa = await NilaiPeminatanMahasiswa.fetchByUserId(
      req.params.id
    );
    res.status(200).json(nilaiPeminatanMahasiswa);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.fetchNamaPeminatanDanNamaMatkul = async (req, res, next) => {
  try {
    const [allNamaPeminatandanNamaMatkul] = await NilaiPeminatanMahasiswa.fetchNamaPeminatanNamaMatkulNilai();
    res.status(200).json(allNamaPeminatandanNamaMatkul);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.postNilaiPeminatanMahasiswa = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) return;

  const idPeminatan = req.body.idPeminatan;
  const urutanMinat = req.body.urutanMinat;
  const idMatkul = req.body.idMatkul;
  const nilai = req.body.nilai;
  const user = req.body.user;

  console.log("idPeminatan: " + idPeminatan);
  console.log("urutanMinat: " + urutanMinat);
  console.log("idMatkul: " + idMatkul);
  console.log("nilai: " + nilai);
  console.log("user: " + user);

  try {
    const nilaiMatkulPeminatanMahasiswa = {
      idPeminatan: idPeminatan,
      urutanMinat: urutanMinat,
      idMatkul: idMatkul,
      nilai: nilai,
      user: user,
    };

    const result = await NilaiPeminatanMahasiswa.save(nilaiMatkulPeminatanMahasiswa);

    res.status(201).json({ message: "Nilai Matkul Peminatan Mahasiswa Ditambahkan!" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deleteNilaiPeminatanMahasiswa = async (req, res, next) => {
  try {
    const deleteResponse = await NilaiPeminatanMahasiswa.delete(req.params.id);
    res.status(200).json(deleteResponse);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
