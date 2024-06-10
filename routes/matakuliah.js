const express = require('express');

const { body } = require('express-validator');

const mataKuliahController = require('../controllers/matakuliah');

const auth = require('../middleware/auth');
const MataKuliah = require('../models/MataKuliahModel');

const router = express.Router();

router.get('/', auth, mataKuliahController.fetchAll);

router.get("/:id", auth, mataKuliahController.fetchById);

router.post(
  '/',
  [
    auth,
    body('nama').trim().not().isEmpty()
    .custom(async (nama) => {
        const user = await MataKuliah.find(nama);
        if (user[0].length > 0) {
            return Promise.reject('Nama mata kuliah sudah tersedia!')
        }
    }),
    body('sks').trim().not().isEmpty(),
    body('minat').trim().not().isEmpty(),
    body('user').trim().not().isEmpty(),
  ],
  mataKuliahController.postMataKuliah
);

router.delete('/:id', auth, mataKuliahController.deleteMataKuliah);

router.patch("/:id", auth, mataKuliahController.updateMataKuliah);

module.exports = router;