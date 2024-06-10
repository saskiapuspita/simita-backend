const { validationResult } = require("express-validator");

const PeminatanMahasiswa = require("../models/PeminatanMahasiswaModel");

exports.fetchAll = async (req, res, next) => {
  try {
    const [allPeminatanMahasiswa] = await PeminatanMahasiswa.fetchAll();
    res.status(200).json(allPeminatanMahasiswa);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.fetchByUserId = async (req, res, next) => {
  try {
    const peminatanMahasiswa = await PeminatanMahasiswa.fetchByUserId(
      req.params.id
    );
    res.status(200).json(peminatanMahasiswa);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.fetchNamaPeminatan = async (req, res, next) => {
  try {
    const [allNamaPeminatanMahasiswa] = await PeminatanMahasiswa.fetchNamaPeminatan();
    res.status(200).json(allNamaPeminatanMahasiswa);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.postPeminatanMahasiswa = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) return;

  if (req.body.ipk == null) {
    req.body.ipk = null;
  }

  const ipk = req.body.ipk;
  const pilihanPeminatan = req.body.pilihanPeminatan;
  const user = req.body.user;

  console.log("ipk: " + ipk);
  console.log("pilihanPeminatan: " + pilihanPeminatan);
  console.log("user: " + user);

  try {
    const peminatanMahasiswa = {
      ipk: ipk,
      pilihanPeminatan: pilihanPeminatan,
      user: user,
    };
    const result = await PeminatanMahasiswa.save(peminatanMahasiswa);
    res.status(201).json({ message: "Peminatan Mahasiswa Ditambahkan!" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deletePeminatanMahasiswa = async (req, res, next) => {
  try {
    const deleteResponse = await PeminatanMahasiswa.delete(req.params.id);
    res.status(200).json(deleteResponse);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
