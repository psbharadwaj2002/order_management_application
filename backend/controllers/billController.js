const billModel = require("../models/billsModel");

// add bills/orders
const addBillsController = async (request, response) => {
  try {
    const newBill = new billModel(request.body);
    await newBill.save();
    response.status(201).send("Bill Generated Successfully");
  } catch (error) {
    response.status(400).send("error");
  }
};

// get bills/orders
const getBillsController = async (request, response) => {
  try {
    const bills = await billModel.find();
    response.status(200).send(bills);
  } catch (error) {
    response.status(400).send("error");
  }
};

module.exports = {
  addBillsController,
  getBillsController,
};
