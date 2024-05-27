const mongoose = require("mongoose");
// const Section3Schema = new mongoose.Schema({});
var thingSchema = new mongoose.Schema({}, { strict: false });
exports.Section3Model = new mongoose.model("Section3", thingSchema);
