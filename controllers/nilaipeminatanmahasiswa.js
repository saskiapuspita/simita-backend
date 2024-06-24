const { validationResult } = require("express-validator");

const NilaiPeminatanMahasiswa = require("../models/NilaiPeminatanMahasiswaModel");

exports.fetchAll = async (req, res, next) => {
  try {
    const [allNilaiPeminatanMahasiswa] =
      await NilaiPeminatanMahasiswa.fetchAll();
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

exports.fetchDataTableNilaiPeminatanMahasiswa = async (req, res, next) => {
  try {
    const [allNamaPeminatanDanNamaMatkul] =
      await NilaiPeminatanMahasiswa.fetchDataTableNilaiPeminatanMahasiswa(
        req.params.id
      );
    res.status(200).json(allNamaPeminatanDanNamaMatkul);
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
  const idMatkul1 = req.body.idMatkul1;
  const nilaiMatkul1 = req.body.nilaiMatkul1;
  const idMatkul2 = req.body.idMatkul2;
  const nilaiMatkul2 = req.body.nilaiMatkul2;
  const idMatkul3 = req.body.idMatkul3;
  const nilaiMatkul3 = req.body.nilaiMatkul3;
  const idMatkul4 = req.body.idMatkul4;
  const nilaiMatkul4 = req.body.nilaiMatkul4;
  const idMatkul5 = req.body.idMatkul5;
  const nilaiMatkul5 = req.body.nilaiMatkul5;
  const user = req.body.user;

  // const nilaiPeminatanMahasiswa = await NilaiPeminatanMahasiswa.fetchByUserId(
  //   req.body.user
  // );
  // console.log("nilai peminatan mahasiswa: " + nilaiPeminatanMahasiswa[0].urutanMinat);

  try {
    const nilaiMatkulPeminatanMahasiswa = {
      idPeminatan: idPeminatan,
      urutanMinat: urutanMinat,
      idMatkul1: idMatkul1,
      nilaiMatkul1: nilaiMatkul1,
      idMatkul2: idMatkul2,
      nilaiMatkul2: nilaiMatkul2,
      idMatkul3: idMatkul3,
      nilaiMatkul3: nilaiMatkul3,
      idMatkul4: idMatkul4,
      nilaiMatkul4: nilaiMatkul4,
      idMatkul5: idMatkul5,
      nilaiMatkul5: nilaiMatkul5,
      user: user,
    };

    const result = await NilaiPeminatanMahasiswa.save(
      nilaiMatkulPeminatanMahasiswa
    );

    res
      .status(201)
      .json({ message: "Nilai Matkul Peminatan Mahasiswa Ditambahkan!" });
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

exports.updateIsFinalSubmit = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) return;

  const isFinalSubmit = req.body.isFinalSubmit;

  try {
    const nilaiPeminatanMahasiswa = {
      isFinalSubmit: isFinalSubmit,
    };

    const updateResponse = await NilaiPeminatanMahasiswa.updateIsFinalSubmit(
      nilaiPeminatanMahasiswa,
      req.params.id
    );
    res.status(202).json({ message: "Is Final Submit Updated!" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
