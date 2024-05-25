const yup = require("yup");
const validatePageContent = (item) => {
  const schema = yup.object().shape({
    section1: yup.object({
      page_name: yup.string().required(),
      title: yup.string().required(),
      paragraph: yup.string().required(),
      image: yup.string().required()
    }),
  });

  return schema
    .validate(item)
    .then((item) => item)
    .catch((error) => {
      console.log(error);
      return { message: error.message };
    });
};

exports.validatePageContent = validatePageContent;
