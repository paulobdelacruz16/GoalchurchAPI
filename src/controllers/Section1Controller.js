const { Section1Model, validateSection1 } = require("../models/section1");

const postSection1 = async (req, res) => {
    const error = await validateSection1(req.body);
    if (error.message) res.status(400).send(error.message)
    const section1Model = new Section1Model({
      name: req.body.name,
      description: req.body.description,
      image: req.body.image,
      url: req.body.url,
    });

    section1Model.save().then((err,data) => {
        if (err) {
            res.send(err);
        }
        res.send(data);
      })
      .catch((error) => {
        res.status(500).send("Section1 was not stored in DB", error);
      });
};

const getSection1 = (req,res) => {
    Section1Model.find({}, (err, data) => {
        if (err) {
            res.send(err);
        }
        res.json(data);
    });
};

module.exports = {postSection1, getSection1};

