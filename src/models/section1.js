const mongoose = require("mongoose");
const yup = require("yup");

const Section1Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  description: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  image: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});

const validateSection1 = (item) => {
  const schema = yup.object().shape({
    name: yup.string().required().min(3).max(50),
    description: yup.string().required().min(3).max(40),
    image: yup.string().required(),
    url: yup.string().required()
  });

  return schema
    .validate(item)
    .then((item) => item)
    .catch((error) => {
        console.log(error)
        return {message:error.message};
    });
};

exports.Section1Model = new mongoose.model("Section1", Section1Schema);
exports.validateSection1 = validateSection1
