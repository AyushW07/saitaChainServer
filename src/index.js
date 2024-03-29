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
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const multer = require("multer");

// Use multer for parsing multipart/form-data
app.use(multer().any());

// Enable CORS with custom configuration
const corsOptions = {
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization", "Origin", "Cookie"],
};
app.use(cors(corsOptions));

// Use bodyParser for parsing application/json and application/x-www-form-urlencoded
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://vxr73978:H60fu05Yl1so2OiS@cluster0.edp22fy.mongodb.net/Saitachain",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)
  .then(() => console.log("MongoDB is connected"))
  .catch((err) => console.log(err));

// Explicitly set security headers
app.use((req, res, next) => {
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  res.setHeader('Content-Security-Policy', "default-src 'self';");
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'no-referrer');
  res.setHeader('Permissions-Policy', 'geolocation=(), microphone=()');
  next();
});

// Use routes
app.use("/", route);

// Listen on the specified port
app.listen(process.env.PORT || 3000, function () {
  console.log("Express app running on port " + (process.env.PORT || 3000));
});
