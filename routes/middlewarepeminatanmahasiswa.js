const express = require('express');

const { body } = require('express-validator');

const peminatanMahasiswaController = require('../controllers/peminatanmahasiswa');

const auth = require('../middleware/auth');
const PeminatanMahasiswa = require('../models/PeminatanMahasiswaModel');

const router = express.Router();

router.get('/', auth, peminatanMahasiswaController.fetchNamaPeminatan);

module.exports = router;