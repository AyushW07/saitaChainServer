const express = require("express");
const bodyParser = require("body-parser");
const route = require("./Route/route");
const { default: mongoose } = require("mongoose");
const { Route } = require("express");
const cors = require("cors");
const app = express();
const multer = require("multer");
const helmet = require("helmet");
app.use(multer().any());
// Enable All CORS Requests for development use
app.use(cors());
app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      // Add other directives as needed
    },
  })
);

// Referrer Policy
app.use(helmet.referrerPolicy({ policy: "no-referrer" }));

// Setting Strict-Transport-Security header
app.use(helmet.hsts({
  maxAge: 31536000, // 1 year in seconds
  includeSubDomains: true, // Apply HSTS policy to all subdomains
  preload: true
}));

app.use(helmet.frameguard({
  action: 'sameorigin'
}));

app.use((req, res, next) => {
  res.setHeader('Permissions-Policy', 'geolocation=(self), microphone=()');
  next();
});

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

mongoose
  .connect(
    "mongodb+srv://vxr73978:H60fu05Yl1so2OiS@cluster0.edp22fy.mongodb.net/Saitachain",
    {
      useNewUrlParser: true,
    }
  )
  .then(() => console.log("MongoDb is connected"))
  .catch((err) => console.log(err));

app.use("/", route);

app.listen(process.env.PORT || 3000, function () {
  console.log("Express app running on port " + (process.env.PORT || 3000));
});
