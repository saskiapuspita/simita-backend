const { validationResult } = require("express-validator");

const JudulPenelitianMahasiswa = require("../models/JudulPenelitianMahasiswaModel");

exports.fetchAll = async (req, res, next) => {
  try {
    const [allJudulPenelitianMahasiswa] =
      await JudulPenelitianMahasiswa.fetchAll();
    res.status(200).json(allJudulPenelitianMahasiswa);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.fetchById = async (req, res, next) => {
  try {
    const [judulPenelitianMahasiswa] = await JudulPenelitianMahasiswa.fetchById(
      req.params.id
    );
    res.status(200).json({ data: judulPenelitianMahasiswa });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.fetchByUserId = async (req, res, next) => {
  try {
    const [judulPenelitianMahasiswa] =
      await JudulPenelitianMahasiswa.fetchByUserId(req.params.id);
    res.status(200).json({ data: judulPenelitianMahasiswa });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.postJudulPenelitianMahasiswa = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) return;

  if (req.body.status == null) {
    req.body.status = "Menunggu persetujuan dosen pembimbing.";
  }

  const namaJudulPenelitian = req.body.namaJudulPenelitian;
  const lokasiPenelitian = req.body.lokasiPenelitian;
  const idDosenPembimbing = req.body.idDosenPembimbing;
  const idPeminatan = req.body.idPeminatan;
  const status = req.body.status;
  const user = req.body.user;

  try {
    const judulPenelitianMahasiswa = {
      namaJudulPenelitian: namaJudulPenelitian,
      lokasiPenelitian: lokasiPenelitian,
      idDosenPembimbing: idDosenPembimbing,
      idPeminatan: idPeminatan,
      status: status,
      user: user,
    };

    const result = await JudulPenelitianMahasiswa.save(
      judulPenelitianMahasiswa
    );

    res
      .status(201)
      .json({ message: "Judul Penelitian Mahasiswa Ditambahkan!" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deleteJudulPenelitianMahasiswa = async (req, res, next) => {
  try {
    const deleteResponse = await JudulPenelitianMahasiswa.delete(req.params.id);
    res.status(200).json(deleteResponse);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.updateJudulPenelitianMahasiswa = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) return;

  const namaJudulPenelitian = req.body.namaJudulPenelitian;
  const lokasiPenelitian = req.body.lokasiPenelitian;
  const idDosenPembimbing = req.body.idDosenPembimbing;
  const idPeminatan = req.body.idPeminatan;
  const user = req.body.user;

  try {
    const judulPenelitianMahasiswa = {
      namaJudulPenelitian: namaJudulPenelitian,
      lokasiPenelitian: lokasiPenelitian,
      idDosenPembimbing: idDosenPembimbing,
      idPeminatan: idPeminatan,
      user: user,
    };

    const updateResponse = await JudulPenelitianMahasiswa.update(
      judulPenelitianMahasiswa,
      req.params.id
    );
    res.status(202).json({ message: "Judul Penelitian Mahasiswa Updated!" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.updateStatusPengajuanJudulPenelitian = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) return;

  const status = req.body.status;

  try {
    const pengajuanJudulPenelitian = {
      status: status,
    };

    const updateResponse =
      await JudulPenelitianMahasiswa.updateStatusPengajuanJudulPenelitian(
        pengajuanJudulPenelitian,
        req.params.id
      );

    res.status(202).json({ message: "Approval Status Updated!" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.fetchByStatusNeedApproval = async (req, res, next) => {
  try {
    const [judulPenelitianMahasiswa] =
      await JudulPenelitianMahasiswa.fetchByStatusNeedApproval();
    res.status(200).json({ data: judulPenelitianMahasiswa });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
