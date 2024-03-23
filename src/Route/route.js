const express = require("express");
const router = express.Router();
const multer = require("multer");
const storage = multer.memoryStorage(); // using memory storage for simplicity
const upload = multer({ storage: storage });
const { createUser, userLogin, getusersData } = require('../Controllers/loginController')
const {
  BlogData,
  getData,
  getByblogId,
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
const middelware = require("../middleware/authorization");
//**********************************user*******************************//
//login
router.post("/V1/createUser", createUser);
router.post("/V1/Loginuser", userLogin);
router.get("/V1/getuser", getusersData);

//Blog//
router.post("/V1/createBlogData", middelware, BlogData);
router.post("/V1/uploadImg", saveImage);
router.get("/V1/getBlogData", getData);
router.get("/V1/getByblogId/:blogId", getByblogId);
router.put("/V1/updateBlogData/:blogId", middelware, updateData);
router.delete("/V1/deleteBlogData", Deletedata);
router.delete("/V1/deleteId/:blogId", DeleteById);

//Category

router.post("/V1/createcategoryData", middelware, CategoryData);
router.get("/V1/getcategoryData", getCategoryData);
router.put("/V1/updatecategoryData/:categoryId", middelware, updateCategoryData);
router.delete("/V1/deletecategoryData", DeleteCategorydata);
router.get("/V1/getBycategoryId/:categoryId", getBycategoryId);
router.delete("/V1/deletecategory/:categoryId", DeleteBycategoryId);
module.exports = router;
