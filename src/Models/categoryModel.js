
const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    id: {
      type: String,
    },

    Photos: {
      type: String,
    },
   
    Name: {
      type: String,
    },
    slugName: {
      type: String,
    },
    Link: {
      type: String,
    },
    Active: {
      type: Boolean,
      default: false,
    },
   
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Categorys", CategorySchema);
