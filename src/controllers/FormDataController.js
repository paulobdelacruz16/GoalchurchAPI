const {
formDataContentModel: formDataContentModel,
} = require("../models/formDataContent");

const postFormData = async (req, res) => {
  const selectedModel = new formDataContentModel(req.body);
  selectedModel.save().then((err, data) => {
      if (err) {
        res.send(err);
      }
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send({ status: error });
    });
};

const getAllFormData = (req, res) => {
  formDataContentModel.find({}, (err, data) => {
    if (err) {
      res.send(err);
    }
    res.json(data);
  }).sort({ _id: "desc" });
};

const getAllUniqueformData = (req, res) => {
  formDataContentModel.find().distinct('section1.page_name', function(err, data) {
    if (err) {
      res.send(err);
    }
    console.log('data', data);
    res.json(data);
    // ids is an array of all ObjectIds
});
};

const deleteFormDataWithID = (req, res) => {
  formDataContentModel.remove({ _id: req.params.id }, (err) => {
    if (err) {
      res.send(err);
    }
    res.json({ message: "Successfully deleted Data" });
  });
};


const getFormDataById = (req,res) => {
  formDataContentModel.find({'_id': req.params.id}, (err, data) => {
        if (err) {
            res.send(err);
        }
        res.json(data[0]);
    }).sort({ _id: 'desc' }) ;
};

const updateFormData = (req, res) => {
  const filter = { '_id': req.params.id};
  const body =  req.body;
  formDataContentModel.findOneAndUpdate(filter, body, { new: true }, (err, data) => {
      if (err) {
          res.send(err);
      }
      res.json(data);
  });
};

module.exports = { postFormData, getAllFormData, deleteFormDataWithID, getFormDataById, updateFormData, getAllUniqueformData };

