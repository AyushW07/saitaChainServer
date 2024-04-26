const mongoose = require("mongoose");
const userformSchema = new mongoose.Schema(
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
    Subject: {
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
module.exports = mongoose.model("UserformData", userformSchema);
