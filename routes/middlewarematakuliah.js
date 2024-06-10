const express = require('express');

const { body } = require('express-validator');

const mataKuliahController = require('../controllers/matakuliah');

const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, mataKuliahController.fetchNamaPeminatanBasedOnIdMinat);

router.get('/:id', auth, mataKuliahController.fetchMatkulBasedOnIdPeminatan);

module.exports = router;