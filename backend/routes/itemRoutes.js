require("events").EventEmitter.defaultMaxListeners = 15;

const express = require("express");
const {
  getItemController,
  addItemController,
  editItemController,
  deleteItemController,
} = require("../controllers/itemController");

const router = express.Router();

// get items
router.get("/getItems", getItemController);

// add items
router.post("/addItems", addItemController);

// update item
router.put("/editItem", editItemController);

// delete item
router.post("/deleteItem", deleteItemController);

module.exports = router;
