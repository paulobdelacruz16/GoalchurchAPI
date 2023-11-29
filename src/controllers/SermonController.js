const { SermonModel } = require("../models/sermonContent");
const { validateSermon } = require("../validation/SermonValidate")

const postSermon = async (req, res) => {
  const error = await validateSermon(req.body);
  if (error.message){
    res.status(400).send(error.message)
  } 
  const sermonModel = new SermonModel({
    section1: req.body.section1
  });
  sermonModel.save().then((err,data) => {
      if (err) {
          res.send(err);
      }
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send({"status": error});
    });
};

const getSermon = (req,res) => {
  SermonModel.find({}, (err, data) => {
        if (err) {
            res.send(err);
        }
        res.json(data[0]);
    }).sort({ _id: 'desc' }) ;
};

const deleteSermonWithID = (req, res) => {
  SermonModel.remove({ _id: req.params.id }, (err) => {
    if (err) {
        res.send(err);
    }
    res.json({ message: 'Successfully deleted Data'});
});
};

module.exports = {getSermon, postSermon, deleteSermonWithID};


