
const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    id: {
      type: String,
    },

   
    Name: {
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
