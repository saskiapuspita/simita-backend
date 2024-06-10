const express = require("express");

const { body } = require("express-validator");

const userController = require("../controllers/user");

const auth = require("../middleware/auth");
const User = require("../models/UserModel");

const router = express.Router();

router.get("/", auth, userController.fetchAll);

router.get("/:id", auth, userController.fetchById);

router.post(
  "/", auth,
  userController.postUser
);

router.delete("/:id", auth, userController.deleteUser);

router.patch("/:id", auth, userController.editUser);

module.exports = router;
