const express = require('express');

const judulPenelitianMahasiswaController = require('../controllers/judulpenelitianmahasiswa');

const auth = require('../middleware/auth');

const router = express.Router();

router.get('/:id', auth, judulPenelitianMahasiswaController.fetchByUserId);

router.get('/', auth, judulPenelitianMahasiswaController.fetchByStatusNeedApproval);

router.patch('/:id', auth, judulPenelitianMahasiswaController.updateStatusPengajuanJudulPenelitian);

module.exports = router;