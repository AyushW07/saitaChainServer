const express = require("express");
const router = express.Router();
const multer = require("multer");
const storage = multer.memoryStorage(); // using memory storage for simplicity
const upload = multer({ storage: storage });
const { userLogin, getusersData } = require('../Controllers/loginController')
const {
  BlogData,
  getData,
  getByblogId,
  updateData,
  Deletedata,
  DeleteById,
  saveImage,
  DeleteByNameData
} = require("../Controllers/BlogController");


const {
  CategoryData,
  getCategoryData,
  getBycategoryId,
  updateCategoryData,
  DeleteCategorydata,
  DeleteBycategoryId
} = require("../Controllers/categoryController");

const {
  userformData,
  getuserformData,
  updateuserformData,
  DeleteuserformData
} = require("../Controllers/userformController");

const {
  userhomeData,
  getuserhomeData,
  updateuserhomeData,
  DeleteuserhomeData,
} = require("../Controllers/userformsController")
const { ClientRoles } = require("../clientRole")
// const authMidd = require("../middleware/authorization")
const middleware = require("../middleware/authorization");
const currentUser = require("../middleware/currentUser");
const auth = require("../middleware/auth")
//**********************************user*******************************//
//login
// router.post("/V1/createUser", createUser);
router.post("/V1/Loginuser", userLogin);
router.get("/V1/getuser", getusersData);

//Blog//
router.post("/V1/createBlogData", currentUser, auth(ClientRoles.PALNESTO_ADMIN), BlogData);
router.post("/V1/uploadImg", saveImage);
router.get("/V1/getBlogData", currentUser, auth(ClientRoles.PALNESTO_ADMIN), getData);
router.get("/V1/getByblogId/:blogId", getByblogId);
router.put("/V1/updateBlogData/:blogId", currentUser, auth(ClientRoles.PALNESTO_ADMIN), updateData);
router.delete("/V1/deleteBlogData", Deletedata);
router.delete("/V1/deleteId/:blogId", currentUser, auth(ClientRoles.PALNESTO_ADMIN), DeleteById);
router.delete("/V1/deleteByName", DeleteByNameData);

//Category

router.post("/V1/createcategoryData", currentUser, auth(ClientRoles.PALNESTO_ADMIN), CategoryData);
router.get("/V1/getcategoryData", getCategoryData);
router.put("/V1/updatecategoryData/:categoryId", currentUser, auth(ClientRoles.PALNESTO_ADMIN), updateCategoryData);
router.delete("/V1/deletecategoryData", DeleteCategorydata);
router.get("/V1/getBycategoryId/:categoryId", getBycategoryId);
router.delete("/V1/deletecategory/:categoryId", currentUser, auth(ClientRoles.PALNESTO_ADMIN), DeleteBycategoryId);


//userForm

router.post("/V1/userformcreate", currentUser, auth(ClientRoles.PALNESTO_ADMIN), userformData);
router.get("/V1/getformData", getuserformData);
router.put(
  "/V1/updateData/:homeId",
  currentUser, auth(ClientRoles.PALNESTO_ADMIN),
  updateuserformData
);
router.delete("/V1/deleteData", currentUser, auth(ClientRoles.PALNESTO_ADMIN), DeleteuserformData);


//userHome
router.post("/V1/userhomeformcreate", currentUser, auth(ClientRoles.PALNESTO_ADMIN), userhomeData);
router.get("/V1/gethomeformData", getuserhomeData);
router.put(
  "/V1/updatehomeData/:homeId",
  currentUser, auth(ClientRoles.PALNESTO_ADMIN),
  updateuserhomeData
);
router.delete("/V1/deletehomeData", currentUser, auth(ClientRoles.PALNESTO_ADMIN), DeleteuserhomeData);

module.exports = router;

