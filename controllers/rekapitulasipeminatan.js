const { validationResult } = require("express-validator");

const RekapitulasiPeminatan = require("../models/RekapitulasiPeminatanModel");

exports.fetchRekapitulasiPeminatanProter = async (req, res, next) => {
  try {
    const [rekapitulasiPeminatanProter] =
      await RekapitulasiPeminatan.fetchRekapitulasiPeminatanProter();
    res.status(200).json(rekapitulasiPeminatanProter);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.fetchRekapitulasiPeminatanNMT = async (req, res, next) => {
  try {
    const [rekapitulasiPeminatanNMT] =
      await RekapitulasiPeminatan.fetchRekapitulasiPeminatanNMT();
    res.status(200).json(rekapitulasiPeminatanNMT);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
