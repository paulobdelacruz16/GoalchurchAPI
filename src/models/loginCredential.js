const mongoose = require("mongoose");
const yup = require("yup");

const loginCredentialSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  password: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
});

const validateloginCredential = (item) => {
  const schema = yup.object().shape({
    username: yup.string().required().min(3).max(50),
    password: yup.string().required().min(3).max(50)
  });

  return schema
    .validate(item)
    .then((item) => item)
    .catch((error) => {
        console.log(error)
        return {message:error.message};
    });
};

exports.loginCredentialModel = new mongoose.model("loginCredential", loginCredentialSchema);
exports.validateloginCredential = validateloginCredential;
