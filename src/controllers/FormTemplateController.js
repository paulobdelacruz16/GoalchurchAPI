const {
  formTemplateContentModel: formTemplateContentModel,
} = require("../models/formTemplateContent");

const postFormTemplate = async (req, res) => {
  const selectedModel = new formTemplateContentModel(req.body);
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

const getAllFormTemplate = (req, res) => {
  formTemplateContentModel.find({}, (err, data) => {
    if (err) {
      res.send(err);
    }
    res.json(data);
  }).sort({ _id: "desc" });
};

const deleteFormTemplateWithID = (req, res) => {
  formTemplateContentModel.remove({ _id: req.params.id }, (err) => {
    if (err) {
      res.send(err);
    }
    res.json({ message: "Successfully deleted Form Template" });
  });
};


const getFormTemplateById = (req, res) => {
  formTemplateContentModel.find({ '_id': req.params.id }, (err, data) => {
    if (err) {
      res.send(err);
    }
    res.json(data[0]);
  }).sort({ _id: 'desc' });
};

const updateFormTemplate = (req, res) => {
  const filter = { '_id': req.params.id };
  const body = req.body;
  formTemplateContentModel.findOneAndUpdate(filter, body, { new: true }, (err, data) => {
    if (err) {
      res.send(err);
    }
    res.json(data);
  });
};


  

module.exports = { postFormTemplate, getAllFormTemplate, deleteFormTemplateWithID, getFormTemplateById, updateFormTemplate };

