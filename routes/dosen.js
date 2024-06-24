const express = require("express");

const { body } = require("express-validator");

const dosenController = require("../controllers/dosen");

const auth = require("../middleware/auth");

const Dosen = require("../models/DosenModel");

const router = express.Router();

router.get("/", auth, dosenController.fetchAll);

router.get("/:id", auth, dosenController.fetchById);

router.post("/", auth, dosenController.postDosen);

router.delete("/:id", auth, dosenController.deleteDosen);

router.patch("/:id", auth, dosenController.editDosen);

module.exports = router;
