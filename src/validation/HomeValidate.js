const yup = require("yup");
const validateHome = (item) => {
  const schema = yup.object().shape({
    section1: yup.object({
      card: yup.array(
        yup.object({
          title: yup.string().required(),
          image: yup.string().required(),
          url: yup.string().required(),
        })
      ),
    }),
    section2: yup.object({
      title: yup.string().required(),
      description: yup.string().required(),
    }),
    section3: yup.object({
      title: yup.string().required(),
      description: yup.string().required(),
      card: yup.array(
        yup.object({
          title: yup.string().required(),
          image: yup.string().required(),
          description: yup.string().required(),
          url: yup.string().required(),
        })
      ),
    }),
    section4: yup.object({
      title: yup.string().required(),
      description: yup.string().required(),
      card: yup.array(
        yup.object({
          title: yup.string().required(),
          author: yup.string().required(),
          image: yup.string().required(),
          url: yup.string().required(),
        })
      ),
    }),
    section5: yup.object({
      card: yup.array(
        yup.object({
          verse: yup.string().required(),
          description: yup.string().required(),
        })
      )
    }),
    section6: yup.object({
      title: yup.string().required(),
      description: yup.string().required(),
      card: yup.array(
        yup.object({
          title: yup.string().required(),
          description: yup.string().required(),
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
exports.validateHome = validateHome;
