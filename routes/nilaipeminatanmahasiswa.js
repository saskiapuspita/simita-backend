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
    body('idMatkul1').trim().not().isEmpty(),
    body('nilaiMatkul1').trim().not().isEmpty(),
    body('idMatkul2').trim().not().isEmpty(),
    body('nilaiMatkul2').trim().not().isEmpty(),
    body('idMatkul3').trim().not().isEmpty(),
    body('nilaiMatkul3').trim().not().isEmpty(),
    body('idMatkul4').trim().not().isEmpty(),
    body('nilaiMatkul4').trim().not().isEmpty(),
    body('idMatkul5').trim().not().isEmpty(),
    body('nilaiMatkul5').trim().not().isEmpty(),
    body('user').trim().not().isEmpty(),
  ],
  nilaiPeminatanMahasiswaController.postNilaiPeminatanMahasiswa
);

router.delete('/:id', auth, nilaiPeminatanMahasiswaController.deleteNilaiPeminatanMahasiswa);

router.patch('/:id', auth, nilaiPeminatanMahasiswaController.updateIsFinalSubmit);

module.exports = router;