const { validationResult } = require("express-validator");
const User = require("../models/UserModel");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) return;

  if (req.body.ipk == null) {
    req.body.ipk = null;
  }

  if (req.body.role == null) {
    req.body.role = "mahasiswa";
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

exports.login = async (req, res, next) => {
  // const email = req.body.email;
  const nim = req.body.nim;
  const password = req.body.password;
  try {
    const user = await User.find(nim);

    if (user[0].length !== 1) {
      const error = new Error("A user with this nim could not be found.");
      error.statusCode = 401;
      throw error;
    }

    const storedUser = user[0][0];

    const isEqual = await bcrypt.compare(password, storedUser.password);

    if (!isEqual) {
      const error = new Error("Wrong password!");
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign(
      {
        email: storedUser.email,
        name: storedUser.name,
        nim: storedUser.nim,
        ipk: storedUser.ipk,
        role: storedUser.role,
        userId: storedUser.id,
      },
      "secretfortoken",
      { expiresIn: "1h" }
    );
    res
      .status(200)
      .json({
        token: token,
        userId: storedUser.id,
        name: storedUser.name,
        nim: storedUser.nim,
        ipk: storedUser.ipk,
        role: storedUser.role,
        email: storedUser.email,
      });
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
    res.status(201).json({ message: "User updated!" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
