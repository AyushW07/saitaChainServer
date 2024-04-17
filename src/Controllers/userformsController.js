const useformsModel = require("../Models/useformsModel");
const nodemailer = require("nodemailer");


const userhomeData = async (req, res) => {
    try {
        const { _id, Name, LastName, Email, ProjectName, Message, Interest } = req.body;
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
        ProjectName: ${ProjectName}
        LastName: ${LastName}
        Email :${Email}
        Interest: ${Interest}
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

        const createData = await useformsModel.create({ Name, LastName, Email, ProjectName, Message, Interest });
        return res.status(201).send({
            status: true,
            msg: "Data created successfully, and email sent",
            data: createData,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ status: false, msg: "Server error", error: err.message });
    }
};

const getuserhomeData = async (req, res) => {
    try {
        const userhomeData = await useformsModel.findOne({ isDeleted: false });
        res.status(200).send({
            status: true,
            msg: "userhomeData retrieved succesfully",
            data: userhomeData,
        });
    } catch (err) {
        return res
            .status(500)
            .send({ status: false, msg: "server error", error: err.message });
    }
};

const updateuserhomeData = async (req, res) => {
    try {
        const { Name, LastName, Email, ProjectName, Message, Interest } = req.body;
        const userHomeId = req.params.userHomeId;

        const UpdateuserHome = await useformsModel.findByIdAndUpdate(
            userHomeId,
            { $set: { Name, LastName, Email, ProjectName, Message, Interest } },
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

const DeleteuserhomeData = async (req, res) => {
    try {
        const result = await useformsModel.deleteMany({});
        res.send(`Deleted ${result.deletedCount} userhomeData`);
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .send({ status: false, msg: "server error", error: err.message });
    }
};

module.exports = {
    userhomeData,
    getuserhomeData,
    updateuserhomeData,
    DeleteuserhomeData,
};
