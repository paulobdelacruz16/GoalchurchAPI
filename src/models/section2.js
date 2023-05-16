const mongoose = require("mongoose");
const yup = require("yup");

const Section2Schema = new mongoose.Schema({
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

const validateSection2 = (item) => {
  const schema = yup.object().shape({
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

exports.Section2Model = new mongoose.model("Section2", Section2Schema);
exports.validateSection2 = validateSection2
