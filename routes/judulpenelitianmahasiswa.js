const express = require('express');

const { body } = require('express-validator');

const judulPenelitianMahasiswaController = require('../controllers/judulpenelitianmahasiswa');

const auth = require('../middleware/auth');

const JudulPenelitianMahasiswa = require('../models/JudulPenelitianMahasiswaModel');

const router = express.Router();

router.get('/', auth, judulPenelitianMahasiswaController.fetchAll);

router.get('/:id', auth, judulPenelitianMahasiswaController.fetchById);

router.post(
  '/',
  [
    auth,
    body('namaJudulPenelitian').trim().not().isEmpty()
    .custom(async (namaJudulPenelitian) => {
        const user = await JudulPenelitianMahasiswa.find(namaJudulPenelitian);
        if (user[0].length > 0) {
            return Promise.reject('Nama judul penelitian mahasiswa sudah tersedia!')
        }
    }),
    body('lokasiPenelitian').trim().not().isEmpty(),
    body('idDosenPembimbing').trim().not().isEmpty(),
    body('idPeminatan').trim().not().isEmpty(),
    body('user').trim().not().isEmpty(),
  ],
  judulPenelitianMahasiswaController.postJudulPenelitianMahasiswa
);

router.delete('/:id', auth, judulPenelitianMahasiswaController.deleteJudulPenelitianMahasiswa);

router.patch('/:id', auth, judulPenelitianMahasiswaController.updateJudulPenelitianMahasiswa);

module.exports = router;