const mongoose = require("mongoose");
const yup = require("yup");

const cardSchema = new mongoose.Schema({
  title: {
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

const Section3Schema = new mongoose.Schema({
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
  card: [cardSchema],
});

const validateSection3 = (item) => {
  const schema = yup.object().shape({
    title: yup.string().required().min(3).max(40),
    description: yup.string().required(),
    card: yup.array(
      yup.object({
      title: yup.string().required(),
      image: yup.string().required(),
      url: yup.string().required(),
    }),
    )
  });

  return schema
    .validate(item)
    .then((item) => item)
    .catch((error) => {
      console.log(error);
      return { message: error.message };
    });
};

exports.Section3Model = new mongoose.model("Section3", Section3Schema);
exports.validateSection3 = validateSection3;
