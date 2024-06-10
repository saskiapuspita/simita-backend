const { validationResult } = require('express-validator');

const User = require('../models/UserModel');
const bcrypt = require("bcryptjs");

exports.fetchAll = async (req, res, next) => {
  try {
    const [allUser] = await User.fetchAll();
    res.status(200).json(allUser);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.fetchById = async (req, res, next) => {
  try {
    const user = await User.fetchById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.postUser = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) return;

  if (req.body.ipk == null) {
    req.body.ipk = null;
  }

  if (req.body.role == null) {
    req.body.role = "mahasiswa";
  }

  if (req.body.password == null) {
    req.body.password = req.body.nim;
  }

  const name = req.body.name;
  const email = req.body.email;
  const nim = req.body.nim;
  const ipk = req.body.ipk;
  const role = req.body.role;
  const password = req.body.password;

  try {
    const hashedPassword = await bcrypt.hash(password, 12);

    const userDetails = {
      name: name,
      email: email,
      nim: nim,
      ipk: ipk,
      role: role,
      password: hashedPassword,
    };

    const result = await User.save(userDetails);
    res.status(201).json({ message: "User registered!" });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const deleteResponse = await User.delete(req.params.id);
    res.status(200).json(deleteResponse);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.editUser = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) return;

  if (req.body.ipk == null) {
    req.body.ipk = null;
  } else {
    req.body.role = "mahasiswa";
  }

  if (req.body.password == null) {
    req.body.password = req.body.nim;
  }

  const name = req.body.name;
  const email = req.body.email;
  const nim = req.body.nim;
  const ipk = req.body.ipk;
  const role = req.body.role;
  const password = req.body.password;

  try {
    const hashedPassword = await bcrypt.hash(password, 12);

    const userDetails = {
      name: name,
      email: email,
      nim: nim,
      ipk: ipk,
      role: role,
      password: hashedPassword,
    };

    const updateResponse = await User.update(userDetails, req.params.id);
    res.status(202).json({ message: "User updated!" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};