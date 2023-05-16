const { Section2Model, validateSection2 } = require("../models/section2");

const postSection2 = async (req, res) => {
    const error = await validateSection2(req.body);
    if (error.message) res.status(400).send(error.message)
    const section2Model = new Section2Model({
      name: req.body.name,
      description: req.body.description,
      image: req.body.image,
      url: req.body.url,
    });

    section2Model.save().then((err,data) => {
        if (err) {
            res.send(err);
        }
        res.send(data);
      })
      .catch((error) => {
        res.status(500).send("Section1 was not stored in DB", error);
      });
};

const getSection2 = (req,res) => {
    Section2Model.find({}, (err, data) => {
        if (err) {
            res.send(err);
        }
        res.json(data);
    });
};

 const getSection2WithID = (req, res) => {
  Section2Model.findById(req.params.sectionId, (err, data) => {
      if (err) {
          res.send(err);
      }
      res.json(data);
  });
};

 const updateSection2 = (req, res) => {
  Section2Model.findOneAndUpdate({ _id: req.params.sectionId}, req.body, { new: true }, (err, data) => {
      if (err) {
          res.send(err);
      }
      res.json(data);
  });
};

  const deleteSection2 = (req, res) => {
    Section2Model.remove({ _id: req.params.sectionId }, (err) => {
      if (err) {
          res.send(err);
      }
      res.json({ message: 'Successfully deleted Data'});
  });
};

module.exports = {postSection2, getSection2, updateSection2, getSection2WithID, deleteSection2};

