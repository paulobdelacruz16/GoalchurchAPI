const mongoose = require("mongoose");


const section1 = new mongoose.Schema({
  page_name: {
    type: String,
    required: true,
    minlength: 3,
  },
  title: {
    type: String,
    required: true,
    minlength: 3,
  },
  paragraph: {
    type: String,
    required: true,
    minlength: 3,
  },
  image: {
    type: String,
    required: true,
    minlength: 3,
  },
});

const mainSchema = new mongoose.Schema({
  section1: section1
});

exports.PageContentModel = new mongoose.model("PageContent", mainSchema);
