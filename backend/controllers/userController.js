const UserModel = require("../models/userModel");

// login
const loginController = async (request, response) => {
  try {
    const { userId, password } = request.body;
    const user = await UserModel.findOne({ userId, password, verified: true });
    if (user) {
      response.status(200).send("Login Success");
    } else {
      response.json({
        message: "Login Fail",
        user,
      });
    }
  } catch (error) {
    console.log(`Error => ${error.message}`);
  }
};

// register
const registerController = async (request, response) => {
  try {
    const newUser = new UserModel({ ...request.body, verified: true });
    await newUser.save();
    response.status(201).send("New User Created Successfully");
  } catch (error) {
    response.status(400).send("error");
    console.log(`Error => ${error.message}`);
  }
};

module.exports = {
  loginController,
  registerController,
};
