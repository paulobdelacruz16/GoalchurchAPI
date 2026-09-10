const express = require('express');
const mongoose = require('mongoose');
const winston = require('winston');
const bodyParser = require("body-parser");
const { routes } = require("./routes");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 3001;
const cors = require('cors');

const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

const connectToDatabase = () => {
  if (!process.env.MONGO_URL) {
    return Promise.reject(new Error('MONGO_URL is not configured'));
  }

  if (global.mongoConnection) {
    return global.mongoConnection;
  }

  global.mongoConnection = mongoose.connect(process.env.MONGO_URL)
    .then(() => {
      logger.info("connected to mongodb atlas");
    })
    .catch((error) => {
      global.mongoConnection = null;
      logger.error(error.message);
      throw error;
    });

  return global.mongoConnection;
};

// Body parser setup
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Logger setup
const logger = winston.createLogger({
  level: "info",
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize({ all: true })
      )
    })
  ]
});

connectToDatabase().catch(() => {});

// Serving static files
app.use(express.static(require("path").join(__dirname, "public")));

routes(app);

app.get("/", (req, res) =>
  res.send(`Node and express server is running on port ${PORT}`)
);

if (require.main === module) {
  app.listen(PORT, () => {
    logger.info(`Your server is running on port ${PORT}`);
  });
}

module.exports = app;
