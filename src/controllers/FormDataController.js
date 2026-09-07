const {
  formDataContentModel: formDataContentModel,
} = require("../models/formDataContent");

const postFormData = async (req, res) => {
  try {
    const selectedModel = new formDataContentModel(req.body);
    const data = await selectedModel.save();
    res.send(data);
  } catch (err) {
    res.status(500).send(err);
  }
};

const getAllFormData = async (req, res) => {
  try {
    const data = await formDataContentModel.find({}).sort({ _id: "desc" });
    res.json(data);
  } catch (err) {
    res.status(500).send(err);
  }
};

const getAllUniqueformData = async (req, res) => {
  try {
    const data = await formDataContentModel.find().distinct("section1.page_name");
    console.log("data", data);
    res.json(data);
  } catch (err) {
    res.status(500).send(err);
  }
};

const deleteFormDataWithID = async (req, res) => {
  try {
    await formDataContentModel.deleteOne({ _id: req.params.id });
    res.json({ message: "Successfully deleted Data" });
  } catch (err) {
    res.status(500).send(err);
  }
};

const getFormDataById = async (req, res) => {
  try {
    const data = await formDataContentModel
      .find({ _id: req.params.id })
      .sort({ submittedAt: -1 });

    if (!data || data.length === 0) {
      return res.status(404).json({ message: "No data found" });
    }

    res.json(data[0]);
  } catch (err) {
    res.status(500).send(err);
  }
};

const updateFormData = async (req, res) => {
  try {
    const filter = { _id: req.params.id };
    const body = req.body;
    const data = await formDataContentModel.findOneAndUpdate(filter, body, { new: true });
    res.json(data);
  } catch (err) {
    res.status(500).send(err);
  }
};

const getGroupByFormIdLatestData = async (req, res) => {
  try {
    const data = await formDataContentModel.aggregate([
      { $sort: { submittedAt: -1 } },
      {
        $group: {
          _id: "$formId",
          doc: { $first: "$$ROOT" },
        },
      },
      { $replaceRoot: { newRoot: "$doc" } },
      { $sort: { submittedAt: -1 } },
    ]);
    res.json(data);
  } catch (err) {
    res.status(500).send(err);
  }
};

const getAllFormDatabyformId = async (req, res) => {
  try {
    const { formId } = req.params;
    const data = await formDataContentModel.find({ formId }).sort({ submittedAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).send(err);
  }
};

const getLatestFormDataById = async (req, res) => {
  try {
    const data = await formDataContentModel
      .findOne({ formName: req.params.formName })
      .sort({ submittedAt: -1 });

    if (!data) {
      return res.status(404).json({ message: "No data found" });
    }

    res.json(data);
  } catch (err) {
    res.status(500).send(err);
  }
};

const deleteFormDataWithFormName = async (req, res) => {
  try {
    await formDataContentModel.deleteMany({ formName: req.params.formname });
    res.json({ message: "Successfully deleted Data" });
  } catch (err) {
    res.status(500).send(err);
  }
};

const getAllFormDatabyformName = async (req, res) => {
  try {
    console.log("Fetching form data with formname:", req.params.formname);
    const data = await formDataContentModel.find({ formName: req.params.formname });
    res.json(data);
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = {
  postFormData,
  getAllFormData,
  deleteFormDataWithID,
  getFormDataById,
  updateFormData,
  getAllUniqueformData,
  getGroupByFormIdLatestData,
  getAllFormDatabyformId,
  getLatestFormDataById,
  deleteFormDataWithFormName,
  getAllFormDatabyformName,
};
