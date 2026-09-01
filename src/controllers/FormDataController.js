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
  formDataContentModel.find().distinct('section1.page_name', function (err, data) {
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


const getFormDataById = (req, res) => {
  formDataContentModel.find({ '_id': req.params.id }, (err, data) => {
    if (err) {
      res.send(err);
    }
    res.json(data[0]);
  }).sort({ _id: 'desc' });
};

const updateFormData = (req, res) => {
  const filter = { '_id': req.params.id };
  const body = req.body;
  formDataContentModel.findOneAndUpdate(filter, body, { new: true }, (err, data) => {
    if (err) {
      res.send(err);
    }
    res.json(data);
  });
};


const getAllFormLatestDataByformId = async (req, res) => {
  try {
    const data = await formDataContentModel.aggregate([
      { $sort: { submittedAt: -1 } }, // sort newest first
      {
        $group: {
          _id: "$formId",              // group by formId
          doc: { $first: "$$ROOT" }    // take the latest document
        }
      },
      { $replaceRoot: { newRoot: "$doc" } }, // flatten result
      { $sort: { submittedAt: -1 } }         // final sort of unique docs
    ]);

    res.json(data);
  } catch (err) {
    res.status(500).send(err);
  }
};


const getAllFormDatabyformId = async (req, res) => {
  try {
    const { formId } = req.params; // or req.query depending on your route
    const data = await formDataContentModel
      .find({ formId })              // filter by formId
      .sort({ submittedAt: -1 });    // order by submittedAt (newest first)

    res.json(data);
  } catch (err) {
    res.status(500).send(err);
  }
};





module.exports = { postFormData, getAllFormData, deleteFormDataWithID, getFormDataById, updateFormData, getAllUniqueformData, getAllFormLatestDataByformId, getAllFormDatabyformId };

