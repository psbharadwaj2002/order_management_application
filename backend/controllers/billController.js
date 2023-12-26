const billModel = require("../models/billsModel");

// add bills/orders
const addBillsController = async (request, response) => {
  try {
    const newBill = new billModel(request.body);
    await newBill.save();
    response.status(201).send("Bill Generated Successfully");
  } catch (error) {
    response.status(400).send("error");
    console.log(`Error => ${error.message}`);
  }
};

// get bills/orders
const getBillsController = async (request, response) => {
  try {
    const bills = await billModel.find();
    response.status(200).send(bills);
  } catch (error) {
    console.log(`Error => ${error.message}`);
  }
};

module.exports = {
  addBillsController,
  getBillsController,
};
