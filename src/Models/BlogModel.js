const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema(
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
    slug: {
      type: String,
    },
    Tag: {
      type: [],
    },
    Date: {
      type: String,
    },
    MetaTitle: {
      type: String,
    },
    MetaKey: {
      type: String,
    },
    MetaDescription: {
      type: String,
    },
    Detail: {
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
module.exports = mongoose.model("Blogs", BlogSchema);
