const express = require('express');
const mongoose = require('mongoose');
const winston = require('winston');
const bodyParser = require("body-parser");
const { routes } = require("./routes");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 3001;
const cors = require('cors');

// Body parser setup
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Routes
routes(app);

// Logger setup
const logger = winston.createLogger({
  level: "info",
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize({ all: true })
      )
    }),
    new winston.transports.File({ filename: 'error.log', level: 'error' })
  ],
  exceptionHandlers: [
    new winston.transports.File({ filename: 'exceptions.log' })
  ]
});

// Mongoose connection (fixed)
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    logger.info("connected to mongodb atlas");
  })
  .catch((error) => {
    logger.error(error.message);
  });

// Serving static files
app.use(express.static("public"));

// Routes again (if needed for static endpoints)
routes(app);

app.get("/", (req, res) =>
  res.send(`Node and express server is running on port ${PORT}`)
);

app.listen(PORT, () => {
  logger.info(`Your server is running on port ${PORT}`);
});
