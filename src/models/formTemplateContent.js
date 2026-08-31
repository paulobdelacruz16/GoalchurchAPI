const mongoose = require("mongoose");
const anySchema = new mongoose.Schema({}, { strict: false });
exports.formTemplateContentModel = new mongoose.model("formtemplate", anySchema);
