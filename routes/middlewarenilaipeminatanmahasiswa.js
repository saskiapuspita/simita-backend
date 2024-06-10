const express = require('express');

const { body } = require('express-validator');

const nilaiPeminatanMahasiswaController = require('../controllers/nilaipeminatanmahasiswa');

const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, nilaiPeminatanMahasiswaController.fetchNamaPeminatanDanNamaMatkul);

module.exports = router;