const mongoose = require("mongoose");

const cardSermon = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 3,
  },
  description: {
    type: String,
    required: true,
    minlength: 3,
  },
  image: {
    type: String,
    required: true,
    minlength: 3,
  },
  url: {
    type: String,
    required: true,
  },
});

const section1 = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 3,
  },
  description: {
    type: String,
    required: true,
    minlength: 3,
  },
  card: [cardSermon],
});


const mainSchema = new mongoose.Schema({
  section1: section1
});

exports.EventModel = new mongoose.model("Events", mainSchema);
