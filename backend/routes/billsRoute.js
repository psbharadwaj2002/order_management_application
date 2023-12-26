require("events").EventEmitter.defaultMaxListeners = 15;

const express = require("express");
const {
  addBillsController,
  getBillsController,
} = require("../controllers/billController");

const router = express.Router();

// add bill/orders
router.post("/addBills", addBillsController);

// get bills/orders
router.get("/getBills", getBillsController);

module.exports = router;
