const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const yup = require("yup");

const HomeSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3, maxlength: 50 },
  section1: [{ type: Schema.Types.ObjectId, ref: "section1" }],
  section2: [{ type: Schema.Types.ObjectId, ref: "section2" }],
});


const validateHome = (item) => {
  const schema = yup.object().shape({
    name: yup.string().required().min(3).max(50),
    section1: yup.array(),
    section2: yup.array()
  });

  return schema
    .validate(item)
    .then((item) => item)
    .catch((error) => {
        console.log(error)
        return {message:error.message};
    });
};
exports.HomeModel = new mongoose.model("Home", HomeSchema);
exports.validateHome = validateHome;