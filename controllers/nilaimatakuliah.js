const { validationResult } = require('express-validator');

const NilaiMataKuliah = require('../models/NilaiMataKuliahModel');

exports.fetchAll = async (req, res, next) => {
  try {
    const [allNilaiMataKuliah] = await NilaiMataKuliah.fetchAll();
    res.status(200).json(allNilaiMataKuliah);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.postNilaiMataKuliah = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) return;

  const nilai = req.body.nilai;
  const mataKuliah = req.body.mataKuliah;
  const user = req.body.user;

  try {
    const nilaiMataKuliah = {
      nilai: nilai,
      mataKuliah: mataKuliah,
      user: user,
    };
    const result = await NilaiMataKuliah.save(nilaiMataKuliah);
    res.status(201).json({ message: 'Nilai Mata Kuliah Ditambahkan!' });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deleteNilaiMataKuliah = async (req, res, next) => {
  try {
    const deleteResponse = await NilaiMataKuliah.delete(req.params.id);
    res.status(200).json(deleteResponse);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};