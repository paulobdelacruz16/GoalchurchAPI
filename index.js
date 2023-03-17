import express from "express";
import mongoose from "mongoose";
require('dotenv').config();
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


// mongoose connection
mongoose.connect(process.env.MONGO_URL,{ useNewUrlParser: true}).then(() => {
    console.log("connected to mongodb atlas");
}).catch(error => {
    console.log('Mongoose Connection fail', error)
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

app.listen(PORT, () => console.log(`Your server is running on port ${PORT}`));
