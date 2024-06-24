const { validationResult } = require('express-validator');

const Dosen = require('../models/DosenModel');
const bcrypt = require("bcryptjs");

exports.fetchAll = async (req, res, next) => {
  try {
    const [allDosen] = await Dosen.fetchAll();
    res.status(200).json(allDosen);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.fetchById = async (req, res, next) => {
  try {
    const [dosen] = await Dosen.fetchById(req.params.id);
    // res.json({ data: dosen})
    res.status(200).json({ data: dosen});
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.postDosen = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) return;

  if (req.body.role == null) {
    req.body.role = "dosen";
  }

  if (req.body.password == null) {
    req.body.password = req.body.nidn;
  }

  const name = req.body.name;
  const email = req.body.email;
  const nidn = req.body.nidn;
  const role = req.body.role;
  const password = req.body.password;

  try {
    const hashedPassword = await bcrypt.hash(password, 12);

    const dosenDetails = {
      name: name,
      email: email,
      nidn: nidn,
      role: role,
      password: hashedPassword,
    };

    const result = await Dosen.save(dosenDetails);
    res.status(201).json({ message: "User registered!" });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.deleteDosen = async (req, res, next) => {
  try {
    const deleteResponse = await Dosen.delete(req.params.id);
    res.status(200).json(deleteResponse);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.editDosen = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) return;

  if (req.body.role == null) {
    req.body.role = "dosen";
  }

  if (req.body.password == null) {
    req.body.password = req.body.nidn;
  }

  const name = req.body.name;
  const email = req.body.email;
  const nidn = req.body.nidn;
  const role = req.body.role;
  const password = req.body.password;

  try {
    const hashedPassword = await bcrypt.hash(password, 12);

    const dosenDetails = {
      name: name,
      email: email,
      nidn: nidn,
      role: role,
      password: hashedPassword,
    };

    const updateResponse = await Dosen.update(dosenDetails, req.params.id);
    res.status(202).json({ message: "User updated!" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};