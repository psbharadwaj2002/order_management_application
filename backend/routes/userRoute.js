require("events").EventEmitter.defaultMaxListeners = 15;

const express = require("express");
const {
  loginController,
  registerController,
} = require("../controllers/userController");

const router = express.Router();

// login user
router.post("/login", loginController);

// register user
router.post("/register", registerController);

module.exports = router;
