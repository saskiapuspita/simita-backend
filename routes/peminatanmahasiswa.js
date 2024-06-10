const express = require('express');

const { body } = require('express-validator');

const peminatanMahasiswaController = require('../controllers/peminatanmahasiswa');

const auth = require('../middleware/auth');
const PeminatanMahasiswa = require('../models/PeminatanMahasiswaModel');

const router = express.Router();

router.get('/', auth, peminatanMahasiswaController.fetchAll);

router.get('/:id', auth, peminatanMahasiswaController.fetchByUserId);

router.post(
  '/',
  [
    auth,
    body('pilihanPeminatan').trim().not().isEmpty()
    .custom(async (idPeminatan) => {
        const user = await PeminatanMahasiswa.find(idPeminatan);
        if (user[0].length > 0) {
            return Promise.reject('Pilihan peminatan sudah dipilih!')
        }
    }),
    body('user').trim().not().isEmpty(),
  ],
  peminatanMahasiswaController.postPeminatanMahasiswa
);

router.delete('/:id', auth, peminatanMahasiswaController.deletePeminatanMahasiswa);

module.exports = router;