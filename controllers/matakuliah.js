const { validationResult } = require('express-validator');

const MataKuliah = require('../models/MataKuliahModel');

exports.fetchAll = async (req, res, next) => {
  try {
    const [allMataKuliah] = await MataKuliah.fetchAll();
    res.status(200).json(allMataKuliah);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.fetchMatkulBasedOnIdPeminatan = async (req, res, next) => {
  try {
    const mataKuliah = await MataKuliah.fetchMatkulBasedOnIdPeminatan(req.params.id);
    res.json({ data: mataKuliah})
    // res.status(200).json(mataKuliah);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.fetchNamaPeminatanBasedOnIdMinat = async (req, res, next) => {
  try {
    const [allMataKuliah] = await MataKuliah.fetchNamaPeminatanBasedOnIdMinat();
    res.status(200).json(allMataKuliah);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.fetchById = async (req, res, next) => {
  try {
    const mataKuliah = await MataKuliah.fetchById(req.params.id);
    res.status(200).json(mataKuliah);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.postMataKuliah = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) return;

  const nama = req.body.nama;
  const sks = req.body.sks;
  const minat = req.body.minat;
  const user = req.body.user;

  try {
    const mataKuliah = {
      nama: nama,
      sks: sks,
      minat: minat,
      user: user,
    };
    const result = await MataKuliah.save(mataKuliah);
    res.status(201).json({ message: 'Mata Kuliah Ditambahkan!' });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deleteMataKuliah = async (req, res, next) => {
  try {
    const deleteResponse = await MataKuliah.delete(req.params.id);
    res.status(200).json(deleteResponse);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.updateMataKuliah = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) return;

  const nama = req.body.nama;
  const sks = req.body.sks;
  const minat = req.body.minat;
  const user = req.body.user;
  
  try {
    const mataKuliah = {
      nama: nama,
      sks: sks,
      minat: minat,
      user: user,
    };

    const updateResponse = await MataKuliah.update(mataKuliah, req.params.id);
    res.status(202).json({ message: "Mata Kuliah Updated!" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};