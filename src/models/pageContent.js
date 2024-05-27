const mongoose = require("mongoose");
const anySchema = new mongoose.Schema({}, { strict: false });
exports.PageContentModel = new mongoose.model("PageContent", anySchema);
