import express from "express";
import mongoose from "mongoose";
import winston from "winston";
require("dotenv").config();
// import routes from "./src/routes/books";

import bodyParser from "body-parser";

import routes from "./src/routes/books";

const app = express();
const PORT = process.env.PORT || 3000;

//bodyparser setup
app.use(bodyParser.json());
// app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// routes(app);

//routes
// app.use('/', routes);

const logger = winston.createLogger({
  level: "info",
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize({
          all: true,
        })
      )
    }),
    new winston.transports.File({filename: 'error.log', level: 'error'})
  ],
  exceptionHandlers: [
    new winston.transports.File({ filename: 'exceptions.log'})
  ]
});

// mongoose connection
mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true })
  .then(() => {
    logger.info("connected to mongodb atlas")
  })
  .catch((error) => {
    logger.log("error", error.message)
  });

//bodyparser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// serving static files
app.use(express.static("public"));

routes(app);

app.get("/", (req, res) =>
  res.send(`Node and express server is running on port ${PORT}`)
);

app.listen(PORT, () => {
  logger.info("Your server is running on port ${PORT}")
});
