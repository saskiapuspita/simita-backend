const express = require('express');

const { body } = require('express-validator');

const nilaiPeminatanMahasiswaController = require('../controllers/nilaipeminatanmahasiswa');

const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, nilaiPeminatanMahasiswaController.fetchAll);

router.get('/:id', auth, nilaiPeminatanMahasiswaController.fetchByUserId);

router.post(
  '/',
  [
    auth,
    body('idPeminatan').trim().not().isEmpty(),
    body('urutanMinat').trim().not().isEmpty(),
    body('idMatkul').trim().not().isEmpty(),
    body('nilai').trim().not().isEmpty(),
    body('user').trim().not().isEmpty(),
  ],
  nilaiPeminatanMahasiswaController.postNilaiPeminatanMahasiswa
);

router.delete('/:id', auth, nilaiPeminatanMahasiswaController.deleteNilaiPeminatanMahasiswa);

module.exports = router;