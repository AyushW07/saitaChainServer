const express = require("express");
const bodyParser = require("body-parser");
const route = require("./Route/route");
const { default: mongoose } = require("mongoose");
const { Route } = require("express");
const cors = require("cors");
const app = express();
const fs = require('fs');
const multer = require("multer");
const { logRequest, logErrors, logger } = require('./middleware/loggerss');
const cookieSession = require("cookie-session");
app.use(multer().any());
// Enable All CORS Requests for development use
console.log("p") // testing
app.use(
  cors({
    origin: [
      "https://saitachain.com",
      "https://saitachain.com:3000",
      "https://saitachain.com:444",
      // "http://localhost:3000",
      // "http://localhost:5173"


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
app.use(logRequest);
app.use("/", route);
mongoose
  .connect(
    process.env.MONGO_URL,
    {
      useNewUrlParser: true,
    }
  )
  .then(() => logger.info("Connected to MongoDB"))
  .catch((err) => logger.error("MongoDB connection error", err));

app.use(logErrors);
app.get('/checklogs', (req, res) => {
  fs.readFile("combined.log", 'utf8', (err, data) => {
    if (err) {
      console.error("Error reading the log file:", err);
      return res.status(500).send({ message: "Error reading the log file" });
    }

    // Split the file content into lines
    const logEntries = data.split('\n').filter(line => line.trim() !== '');
    const formattedLogs = []; // Array to store formatted logs

    // Process each log entry
    logEntries.forEach(entry => {
      if (entry) {
        try {
          const log = JSON.parse(entry);
          // Filter and process only error logs
          if (log.level === 'error') {
            formattedLogs.push(formatLogEntry(log));
          }
        } catch (parseErr) {
          console.error("Error parsing log entry:", parseErr);
        }
      }
    });

    if (formattedLogs.length > 0) {
      res.send({ logs: formattedLogs });
    } else {
      res.send({ message: "No error logs found." });
    }
  });

  /**
   * Formats a log entry into a human-readable string.
   * @param {Object} log The log entry object.
   * @returns {string} The formatted log entry.
   */
  function formatLogEntry(log) {
    let formattedEntry = `[${log.timestamp}] ${log.level.toUpperCase()}: ${log.message}`;
    if (log.url) {
      formattedEntry += ` - ${log.method} ${log.url}`;
    }
    if (log.body && Object.keys(log.body).length > 0) {
      formattedEntry += ` - Body: ${JSON.stringify(log.body)}`;
    }
    if (log.params && Object.keys(log.params).length > 0) {
      formattedEntry += ` - Params: ${JSON.stringify(log.params)}`;
    }
    return formattedEntry;
  }
});

app.listen(process.env.PORT || 3000, function () {
  console.log("Express app running on port " + (process.env.PORT || 3000));
});
