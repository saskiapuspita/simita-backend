const express = require('express');

const { body } = require('express-validator');

const rekapitulasiPeminatanController = require('../controllers/rekapitulasipeminatan');

const auth = require('../middleware/auth');
const RekapitulasiPeminatan = require('../models/RekapitulasiPeminatanModel');

const router = express.Router();

router.get('/rekapitulasipeminatanproter', auth, rekapitulasiPeminatanController.fetchRekapitulasiPeminatanProter);

router.get('/rekapitulasipeminatannmt', auth, rekapitulasiPeminatanController.fetchRekapitulasiPeminatanNMT);

module.exports = router;