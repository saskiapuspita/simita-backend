const express = require("express");

const { body } = require("express-validator");

const peminatanController = require("../controllers/peminatan");

const auth = require("../middleware/auth");
const Peminatan = require("../models/PeminatanModel");

const router = express.Router();

router.get("/", auth, peminatanController.fetchAll);

router.get("/:id", auth, peminatanController.fetchById);

router.post(
  "/",
  [
    auth,
    body("nama")
      .trim()
      .not()
      .isEmpty()
      .custom(async (nama) => {
        const user = await Peminatan.find(nama);
        if (user[0].length > 0) {
          return Promise.reject("Nama minat sudah tersedia!");
        }
      }),
    body("user").trim().not().isEmpty(),
  ],
  peminatanController.postPeminatan
);

router.delete("/:id", auth, peminatanController.deletePeminatan);

router.patch("/:id", auth, peminatanController.updatePeminatan);

module.exports = router;
