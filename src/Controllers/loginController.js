const loginModel = require("../Models/loginModel");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
  try {
    let data = req.body;
    const { userName, Password } = data;

    if (!userName || !Password) {
      return res
        .status(400)
        .send({ status: false, message: "All fields are required" });
    }

    const newUser = new loginModel(data);
    await newUser.save();

    return res.status(201).send({
      status: true,
      message: "User created successfully",
      data: newUser,
    });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

const userLogin = async (req, res) => {
  try {
    const { userName, Password } = req.body;

    // Check if both userName and password are provided
    if (!userName || !Password) {
      return res.status(400).send({
        status: false,
        message: "Both userName and password are required",
      });
    }

    // Find the user by userName
    const user = await loginModel.findOne({ userName });

    // Check if user exists and if the password matches
    if (!user) {
      return res.status(401).send({
        status: false,
        message: "No user found with this userName",
      });
    }

    // Assuming you are saving the plain text passwords (which you shouldn't, passwords should be hashed)
    if (user.Password !== Password) {
      return res.status(401).send({
        status: false,
        message: "Password is incorrect",
      });
    }

    // Generate a token
    let token = jwt.sign(
      {
        userId: user._id,
      },
      "chessBoard",
      { expiresIn: "12hrs" }
    );

    // Respond with token
    res.setHeader("x-api-key", token);
    return res.status(200).send({ status: "loggedin", token: token });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

const getusersData = async (req, res) => {
  try {
    const Data = await loginModel.find();
    res.status(200).send({
      status: true,
      msg: "Data retrieved successfully",
      data: Data,
    });
  } catch (err) {
    return res
      .status(500)
      .send({ status: false, msg: "Server error", error: err.message });
  }
};

module.exports = {
  createUser,
  userLogin,
  getusersData,
};
