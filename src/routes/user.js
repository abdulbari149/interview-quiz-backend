const db = require("../config/db");
const express = require("express");
const { models } = require("../models");
const userController = require("../controllers/user");

const router = express.Router();
router.post("/", userController.createUser);
router.get("/:id", userController.getUserById);

module.exports = router;
