const mongoose = require("mongoose");
const userformsSchema = new mongoose.Schema(
    {
        id: {
            type: String,
        },

        Name: {
            type: String,
        },
        LastName: {
            type: String,
        },
        Email: {
            type: String,
        },
        ProjectName: {
            type: String,
        },
        Interest: {
            type: String,
        },


        Message: {
            type: String,
        },

        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);
module.exports = mongoose.model("UserformsData", userformsSchema);
