const express = require("express");
const router = express.Router();
const multer = require("multer");
// const Middleware = require("../middleware/authorization");
const storage = multer.memoryStorage(); // using memory storage for simplicity
const upload = multer({ storage: storage });
const { createUser, userLogin, getusersData } = require('../Controllers/loginController')
const {
  BlogData,
  getData,
  getById,
  updateData,
  Deletedata,
  DeleteById,
  saveImage,
} = require("../Controllers/BlogController");


const {
  CategoryData,
  getCategoryData,
  getBycategoryId,
  updateCategoryData,
  DeleteCategorydata,
  DeleteBycategoryId
} = require("../Controllers/categoryController");

//**********************************user*******************************//
//login
router.post("/V1/createUser", createUser);
router.post("/V1/Loginuser", userLogin);
router.get("/V1/getuser", getusersData);

//Blog//
router.post("/V1/createBlogData", BlogData);
router.post("/V1/uploadImg", saveImage);
router.get("/V1/getBlogData", getData);
router.get("/V1/getByblogId/:blogId", getById);
router.put("/V1/updateBlogData/:blogId", updateData);
router.delete("/V1/deleteBlogData", Deletedata);
router.delete("/V1/deleteId/:blogId", DeleteById);

//Category

router.post("/V1/createcategoryData", CategoryData);
router.get("/V1/getcategoryData", getCategoryData);
router.put("/V1/updatecategoryData/:categoryId", updateCategoryData);
router.delete("/V1/deletecategoryData", DeleteCategorydata);
router.get("/V1/getBycatagoryId/:categoryId", getBycategoryId);
router.delete("/V1/deletecategory/:categoryId", DeleteBycategoryId);
module.exports = router;
