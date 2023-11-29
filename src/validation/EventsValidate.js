const yup = require("yup");
const validateEvents = (item) => {
  const schema = yup.object().shape({
    section1: yup.object({
      title: yup.string().required(),
      description: yup.string().required(),
      card: yup.array(
        yup.object({
          title: yup.string().required(),
          description: yup.string().required(),
          image: yup.string().required(),
          url: yup.string().required(),
        })
      ),
    })
  });

  return schema
    .validate(item)
    .then((item) => item)
    .catch((error) => {
      console.log(error);
      return { message: error.message };
    });
};
exports.validateEvents = validateEvents;
