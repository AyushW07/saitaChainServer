const BlogModel = require("../Models/BlogModel");
const aws = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");
const BlogData = async (req, res) => {
  try {
    const {
      _id,
    
      Photos,
      Name,
      slug,
      Tag,
      Date,
      MetaTitle,
      MetaKey,
      MetaDescription,
      Detail,
      Active,
    } = req.body;
    const id = uuidv4();
    const newData = await BlogModel.findOneAndUpdate(
      { id },
      {
        _id,
        Photos,
        Name,
        slug,
        Tag,
        Date,
        MetaTitle,
        MetaKey,
        MetaDescription,
        Detail,
        Active,
      },
      {
        new: true,
        upsert: true,
      }
    );

    return res.status(201).send({
      status: true,
      msg: "Data created or updated successfully",
      data: newData,
    });
  } catch (err) {
    return res
      .status(500)
      .send({ status: false, msg: "Server error", error: err.message });
  }
};



const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
  CopyObjectCommand,
} = require("@aws-sdk/client-s3");

// Configure AWS S3 client
const s3Client = new S3Client({
  // Replace with your AWS region
  region: "us-east-2",

  credentials: {
    accessKeyId: "AKIAXHTOAEVTVTQHS66S",
    secretAccessKey: "vaYJBhIXivxzxc/3Owf/t3Ci3lJskakipjRwmg7P",
  },
});
const saveImage = async (req, res) => {
  console.log("s", saveImage);

  const file = req.files[0];
  console.log("first error", file);
  const fileNameParts = file.originalname.split(".");
  const fileExtension = fileNameParts[fileNameParts.length - 1];
  const fileMimeType = file.mimetype;
  let uuid = uuidv4();
  const input = {
    // PutObjectRequest
    Body: file.buffer, // required
    Bucket: "saitarealty", // required
    Key: uuid, // requiredz
    Metadata: {
      format: fileExtension, // Add metadata indicating the format is JPEG
    },
    ContentType: fileMimeType, // Set the ContentType to the MIME type for JPEG images
  };
  console.log("file", file.originalname);
  const uploadCommand = new PutObjectCommand(input);

  s3Client
    .send(uploadCommand)
    .then((response) => {
      console.log("r", response);
      let imageId = response.$metadata.requestId;
      let awsImageUrl = `https://saitarealty.s3.us-east-2.amazonaws.com/${uuid}`;

      return res.send({ imageUrl: awsImageUrl });
    })
    .catch((error) => {
      console.error("Error uploading file:", error);
      return res.status(500).json({ error: "Error uploading file" });
    });
};

const getData = async (req, res) => {
  try {
    const BlogData = await BlogModel.find();
    res.status(200).send({
      status: true,
      msg: "BlogData retrieved succesfully",
      data: BlogData,
    });
  } catch (err) {
    return res
      .status(500)
      .send({ status: false, msg: "server error", error: err.message });
  }
};

const getById = async (req, res) => {
  const blogId = req.params.blogId;

  const BlogData = await BlogModel.findOne({
    id: blogId,
    isDeleted: false,
  });
  return res
    .status(200)
    .send({ status: true, msg: "Data fetch succesfully", data: BlogData });
};

const updateData = async (req, res) => {
  try {
    const { Active } = req.body;

    let blogId = req.params.blogId;

    const existingUnit = await BlogModel.findOne({
      Active,
      id: { $ne: blogId },
    });
    console.log("existingUnit",blogId)
    let updateBody = await BlogModel.findOneAndUpdate(
      { id: blogId },
      {
        $set: {
          Active: Active,
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

const Deletedata = async (req, res) => {
  try {
    const result = await BlogModel.deleteMany({});
    res.send(`Deleted ${result.deletedCount} BlogData`);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ status: false, msg: "server error", error: err.message });
  }
};


const DeleteById = async (req, res) => {
  try {
    let blogId = req.params.blogId;

   
    const deletionResult = await BlogModel.deleteOne({ id: blogId });

    if (deletionResult.deletedCount === 0) {
      return res.status(404).send({ status: false, message: "Page not found" });
    }

    return res.status(200).send({ status: true, message: "Data deleted successfully." });
  } catch (err) {
    return res.status(500).send({ status: false, message: "Server error", error: err.message });
  }
};

module.exports = {
  BlogData,
  getData,
  getById,
  updateData,
  Deletedata,
  DeleteById,
  saveImage,
};
