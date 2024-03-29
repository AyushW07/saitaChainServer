// const express = require("express");
// const bodyParser = require("body-parser");
// const route = require("./Route/route");
// const { default: mongoose } = require("mongoose");
// const { Route } = require("express");
// const cors = require("cors");
// const app = express();
// const multer = require("multer");
// app.use(multer().any());
// // Enable All CORS Requests for development use
// app.use(cors());
// app.use(bodyParser.json({ limit: "50mb" }));
// app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// mongoose
//   .connect(
//     "mongodb+srv://vxr73978:H60fu05Yl1so2OiS@cluster0.edp22fy.mongodb.net/Saitachain",
//     {
//       useNewUrlParser: true,
//     }
//   )
//   .then(() => console.log("MongoDb is connected"))
//   .catch((err) => console.log(err));

// app.use("/", route);

// app.listen(process.env.PORT || 3000, function () {
//   console.log("Express app running on port " + (process.env.PORT || 3000));
// });



const express = require("express");
const bodyParser = require("body-parser");
const route = require("./Route/route");
const mongoose = require("mongoose"); // Removed destructuring from import
const cors = require("cors");
const app = express();
const multer = require("multer");

app.use(multer().any());

// Custom CORS configuration
const corsOptions = {
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204, // Usually, 204 is used for preflight response
  credentials: true, // This allows cookies and other credentials to be sent in cross-origin requests
  allowedHeaders: ["Content-Type", "Authorization", "Origin", "Cookie"],
};

app.use(cors(corsOptions)); // Use the custom CORS options

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

mongoose.connect(
  "mongodb+srv://vxr73978:H60fu05Yl1so2OiS@cluster0.edp22fy.mongodb.net/Saitachain",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)
  .then(() => console.log("MongoDB is connected"))
  .catch((err) => console.log(err));

app.use("/", route);

app.listen(process.env.PORT || 3000, function () {
  console.log("Express app running on port " + (process.env.PORT || 3000));
});
