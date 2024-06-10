const { validationResult } = require('express-validator');

const Peminatan = require('../models/PeminatanModel');

exports.fetchAll = async (req, res, next) => {
  try {
    const [allPeminatan] = await Peminatan.fetchAll();
    res.status(200).json(allPeminatan);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.fetchById = async (req, res, next) => {
  try {
    const peminatan = await Peminatan.fetchById(req.params.id);
    res.status(200).json(peminatan);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.postPeminatan = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) return;

  const nama = req.body.nama;
  const user = req.body.user;

  try {
    const peminatan = {
      nama: nama,
      user: user,
    };
    const result = await Peminatan.save(peminatan);
    res.status(201).json({ message: 'Peminatan Ditambahkan!' });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deletePeminatan = async (req, res, next) => {
  try {
    const deleteResponse = await Peminatan.delete(req.params.id);
    res.status(200).json(deleteResponse);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.updatePeminatan = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) return;

  const nama = req.body.nama;

  try {
    const peminatan = { nama: nama };

    const updateResponse = await Peminatan.update(peminatan, req.params.id);
    res.status(202).json({ message: "Peminatan updated!" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};