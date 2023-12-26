const itemModel = require("../models/itemModel");

// get items
const getItemController = async (request, response) => {
  try {
    const items = await itemModel.find();
    response.status(200).send(items);
  } catch (error) {
    console.log(`Error => ${error.message}`);
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
    console.log(`Error => ${error.message}`);
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
    console.log(`Error => ${error.message}`);
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
    console.log(`Error => ${error.message}`);
  }
};

module.exports = {
  getItemController,
  addItemController,
  editItemController,
  deleteItemController,
};
