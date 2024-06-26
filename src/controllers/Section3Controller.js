const { Section3Model } = require("../models/section3");

const postSection3 = async (req, res) => {
  console.log('req.body', req.body);
    const section3Model = new Section3Model(req.body);
    section3Model.save().then((err,data) => {
        if (err) {
          console.log('err', err);
            res.send(err);
        }
        res.send(data);
      })
      .catch((error) => {
        res.status(500).send({error: `Section1 was not stored in DB" ${error}` });
      });
};

const getSection3 = (req,res) => {
    Section3Model.find({}, (err, data) => {
        if (err) {
            res.send(err);
        }
        res.json(data);
    });
};

 const getSection3WithID = (req, res) => {
  Section3Model.findById(req.params.sectionId, (err, data) => {
      if (err) {
          res.send(err);
      }
      res.json(data);
  });
};

 const updateSection3 = (req, res) => {
  Section3Model.findOneAndUpdate({ _id: req.params.sectionId}, req.body, { new: true }, (err, data) => {
      if (err) {
          res.send(err);
      }
      res.json(data);
  });
};

  const deleteSection3 = (req, res) => {
    Section3Model.remove({ _id: req.params.id }, (err) => {
      if (err) {
          res.send(err);
      }
      res.json({ message: 'Successfully deleted Data'});
  });
};

module.exports = {postSection3, getSection3, updateSection3, getSection3WithID, deleteSection3};

