const {
  formTemplateContentModel: formTemplateContentModel,
} = require("../models/formTemplateContent");

const postFormTemplate = async (req, res) => {
  try {
    const selectedModel = new formTemplateContentModel(req.body);
    const data = await selectedModel.save();
    res.send(data);
  } catch (err) {
    res.status(500).send(err);
  }
};

const getAllFormTemplate = async (req, res) => {
  try {
    const data = await formTemplateContentModel.find({}).sort({ _id: "desc" });
    res.json(data);
  } catch (err) {
    res.status(500).send(err);
  }
};

const deleteFormTemplateWithID = async (req, res) => {
  try {
    await formTemplateContentModel.deleteOne({ _id: req.params.id });
    res.json({ message: "Successfully deleted Form Template" });
  } catch (err) {
    res.status(500).send(err);
  }
};

const getFormTemplateById = async (req, res) => {
  try {
    const data = await formTemplateContentModel
      .find({ _id: req.params.id })
      .sort({ _id: "desc" });

    if (!data || data.length === 0) {
      return res.status(404).json({ message: "No template found" });
    }

    res.json(data[0]);
  } catch (err) {
    res.status(500).send(err);
  }
};

const updateFormTemplate = async (req, res) => {
  try {
    const filter = { _id: req.params.id };
    const body = req.body;
    const data = await formTemplateContentModel.findOneAndUpdate(filter, body, { new: true });
    res.json(data);
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = {
  postFormTemplate,
  getAllFormTemplate,
  deleteFormTemplateWithID,
  getFormTemplateById,
  updateFormTemplate,
};
