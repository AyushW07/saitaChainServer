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
            to: "noreply@saitachain.com",
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

        // Since email was sent, now save/update the user home data
        const options = { upsert: true, new: true, setDefaultsOnInsert: true };
        let query = {};
        if (_id) {
            query._id = _id;
        }
        const update = { Name, LastName, Email, ProjectName, Message, Interest };
        const updatedData = await useformsModel.findOneAndUpdate(query, update, options);

        // Now, safely send back a single response
        return res.status(200).send({
            status: true,
            msg: "Data created or updated successfully, and email sent",
            data: updatedData,
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
