const express = require('express');

const { body } = require('express-validator');

const nilaiMataKuliahController = require('../controllers/nilaimatakuliah');

const auth = require('../middleware/auth');

const NilaiMataKuliah = require('../models/NilaiMataKuliahModel');

const router = express.Router();

router.get('/', auth, nilaiMataKuliahController.fetchAll);

router.post(
  '/',
  [
    auth,
    body('nilai').trim().not().isEmpty(),
    body('mataKuliah').trim().not().isEmpty()
    .custom(async (idPeminatan) => {
        const user = await NilaiMataKuliah.find(idPeminatan);
        if (user[0].length > 0) {
            return Promise.reject('Pilihan peminatan sudah dipilih!')
        }
    }),
    body('user').trim().not().isEmpty(),
  ],
  nilaiMataKuliahController.postNilaiMataKuliah
);

router.delete('/:id', auth, nilaiMataKuliahController.deleteNilaiMataKuliah);

module.exports = router;