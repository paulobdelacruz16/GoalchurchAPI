const mongoose = require("mongoose");
const anySchema = new mongoose.Schema({}, { strict: false });
exports.formDataContentModel = new mongoose.model("formdata", anySchema);
