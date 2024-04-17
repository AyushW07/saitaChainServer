const userFormModel = require("../Models/userformModel");
const nodemailer = require("nodemailer");


const userformData = async (req, res) => {
  try {
    const { _id, Name, LastName, Email, Subject, Message } = req.body;
    console.log(req.body);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "noreply@saitachain.com",
        pass: "orvu sfsy hbwu ugti",
      },
    });

    const mailOptions = {
      from: "noreply@saitachain.com",
      to: "info@saitachain.com",
      subject: "Submission for saitaChain.com",
      text: `
        Name: ${Name}
        Subject: ${Subject}
        LastName: ${LastName}
        Email :${Email}
        Message: ${Message}
      `,
    };

    // Convert sendMail to use Promise
    await new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          reject(error);
        } else {
          resolve(info);
        }
      });
    });

    console.log("Email sent");

    const datacreate = await userFormModel.create({ Name, LastName, Email, Subject, Message });
    return res.status(201).send({
      status: true,
      msg: "Data created successfully, and email sent",
      data: datacreate,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ status: false, msg: "Server error", error: err.message });
  }
};

const getuserformData = async (req, res) => {
  try {
    const userformData = await userFormModel.findOne({ isDeleted: false });
    res.status(200).send({
      status: true,
      msg: "userformData retrieved succesfully",
      data: userformData,
    });
  } catch (err) {
    return res
      .status(500)
      .send({ status: false, msg: "server error", error: err.message });
  }
};

const updateuserformData = async (req, res) => {
  try {
    const { Name, LastName, Email, Subject, Message } = req.body;
    const userHomeId = req.params.userHomeId;

    const UpdateuserHome = await userFormModel.findByIdAndUpdate(
      userHomeId,
      { $set: { Name, LastName, Email, Subject, Message } },
      { new: true }
    );

    // console.log("Update result:", UpdateuserHome);

    return res.status(200).send({
      status: true,
      msg: "Data updated successfully",
      data: UpdateuserHome,
    });
  } catch (err) {
    return res
      .status(500)
      .send({ status: false, msg: "server error", error: err.message });
  }
};

const DeleteuserformData = async (req, res) => {
  try {
    const result = await userFormModel.deleteMany({});
    res.send(`Deleted ${result.deletedCount} userformData`);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ status: false, msg: "server error", error: err.message });
  }
};

module.exports = {
  userformData,
  getuserformData,
  updateuserformData,
  DeleteuserformData,
};
