const express = require("express");
const bodyParser = require("body-parser");
const route = require("./Route/route");
const { default: mongoose } = require("mongoose");
const { Route } = require("express");
const cors = require("cors");
const app = express();
const multer = require("multer");
const cookieSession = require("cookie-session");
app.use(multer().any());
// Enable All CORS Requests for development use
app.use(
  cors({
    origin: [
      "https://saitachain.com",
      "https://saitachain.com:3000",
      "https://saitachain.com:444",



    ],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 200,
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization", "Origin", "Cookie"],
  })
);
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(
  cookieSession({
    signed: false,

    secure: true,


    sameSite: "none",
  })
);
mongoose
  .connect(
    process.env.MONGO_URL,
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
