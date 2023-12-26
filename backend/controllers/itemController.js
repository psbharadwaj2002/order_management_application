const itemModel = require("../models/itemModel");

// get items
const getItemController = async (request, response) => {
  try {
    const items = await itemModel.find();
    response.status(200).send(items);
  } catch (error) {
    response.status(400).send("error");
  }
};

// post items
const addItemController = async (request, response) => {
  try {
    const newItem = new itemModel(request.body);
    await newItem.save();
    response.status(201).send("Item Created Successfully");
  } catch (error) {
    response.status(400).send("error");
  }
};
// edit item
const editItemController = async (request, response) => {
  try {
    await itemModel.findByIdAndUpdate(
      { _id: request.body.itemId },
      request.body
    );
    response.status(201).send("Item Updated");
  } catch (error) {
    response.status(400).send("error");
  }
};

// delete item
const deleteItemController = async (request, response) => {
  try {
    const { itemId } = request.body;
    await itemModel.findOneAndDelete({ _id: itemId });
    response.status(200).json("Item Deleted");
  } catch (error) {
    response.status(400).send("error");
  }
};

module.exports = {
  getItemController,
  addItemController,
  editItemController,
  deleteItemController,
};
