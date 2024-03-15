const CategoryModel = require("../Models/categoryModel");
const aws = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");
const CategoryData = async (req, res) => {
  try {
  
    const {
    
      Name,
      Active,
    } = req.body;

    const id = uuidv4();

   
    const newCategory = new CategoryModel({
      id, 

      Name,
      Active,
    });

    
    const savedCategory = await newCategory.save();

  
    return res.status(201).send({
      status: true,
      msg: "New category created successfully",
      data: savedCategory,
    });

  } catch (err) {
   
    return res.status(500).send({ status: false, msg: "Server error", error: err.message });
  }
};

const getCategoryData = async (req, res) => {
  try {
    const CategoryData = await CategoryModel.find();
    res.status(200).send({
      status: true,
      msg: "CategoryData retrieved succesfully",
      data: CategoryData,
    });
  } catch (err) {
    return res
      .status(500)
      .send({ status: false, msg: "server error", error: err.message });
  }
};

const getBycategoryId = async (req, res) => {
  const categoryId = req.params.categoryId;

  const CategoryData = await CategoryModel.findOne({
    id: categoryId,
    isDeleted: false,
  });
  return res
    .status(200)
    .send({ status: true, msg: "Data fetch succesfully", data: CategoryData });
};

const updateCategoryData = async (req, res) => {
  try {
    const { Active,Name } = req.body;

    let categoryId = req.params.categoryId;

    const existingUnit = await CategoryModel.findOne({
        Active,
      id: { $ne: categoryId },
    });
    let updateBody = await CategoryModel.findOneAndUpdate(
      { id: categoryId },
      {
        $set: {
            Active: Active,
            Name:Name,
        },
      },
      { new: true }
    );
    return res.status(200).send({
      status: true,
      msg: "Data updated successfully",
      data: updateBody,
    });
  } catch (err) {
    return res
      .status(500)
      .send({ status: false, msg: "server error", error: err.message });
  }
};

const DeleteCategorydata = async (req, res) => {
  try {
    const result = await CategoryModel.deleteMany({});
    res.send(`Deleted ${result.deletedCount} CategoryData`);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ status: false, msg: "server error", error: err.message });
  }
};


const DeleteBycategoryId = async (req, res) => {
  try {
    let categoryId = req.params.categoryId;
    const deletionResult = await CategoryModel.deleteOne({ id: categoryId });

    if (deletionResult.deletedCount === 0) {
      return res.status(404).send({ status: false, message: "Page not found" });
    }

    return res.status(200).send({ status: true, message: "Data deleted successfully." });
  } catch (err) {
    return res.status(500).send({ status: false, message: "Server error", error: err.message });
  }
};

module.exports = {
  CategoryData,
  getCategoryData,
  getBycategoryId,
  updateCategoryData,
  DeleteCategorydata,
  DeleteBycategoryId
};
