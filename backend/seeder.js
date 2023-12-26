const mongoose = require("mongoose");
require("dotenv").config();

const itemModel = require("./models/itemModel");
const items = require("./utils/data");

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("App connected to DB Successfully");
  })
  .catch((error) => {
    console.log(`Error => ${error.message}`);
  });

const importData = async () => {
  try {
    await itemModel.deleteMany();
    const itemsData = await itemModel.insertMany(items);
    console.log("All items added successfully");
    process.exit();
  } catch (error) {
    console.log(` error => ${error.message}`);
    process.exit(1);
  }
};

importData();
