import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import routes from "./src/routes/crmRoutes";
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// mongoose connection
mongoose.Promise = global.Promise;
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
