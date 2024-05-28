const {
PageContentModel
} = require("../models/pageContent");
const postDynamicPage = async (req, res) => {
  const selectedModel = new PageContentModel(req.body);
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

const getDynamicpage = (req, res) => {
  PageContentModel.find({}, (err, data) => {
    if (err) {
      res.send(err);
    }
    res.json(data);
  }).sort({ _id: "desc" });
};

const getAllUniquePageName = (req, res) => {
  PageContentModel.find().distinct('section1.page_name', function(err, data) {
    if (err) {
      res.send(err);
    }
    console.log('data', data);
    res.json(data);
    // ids is an array of all ObjectIds
});
};

const deleteDynamicpageWithID = (req, res) => {
  PageContentModel.remove({ _id: req.params.id }, (err) => {
    if (err) {
      res.send(err);
    }
    res.json({ message: "Successfully deleted Data" });
  });
};

const getByPageName = (req,res) => {
  PageContentModel.find({'section1.page_name': req.params.id}, (err, data) => {
        if (err) {
            res.send(err);
        }
        res.json(data[0]);
    }).sort({ _id: 'desc' }) ;
};

const updateDynamicPage = (req, res) => {
  const filter = { 'section1.page_name': req.params.id};
  const body =  req.body;
  PageContentModel.findOneAndUpdate(filter, body, { new: true }, (err, data) => {
      if (err) {
          res.send(err);
      }
      res.json(data);
  });
};

module.exports = { postDynamicPage,getDynamicpage,deleteDynamicpageWithID,getByPageName, updateDynamicPage,getAllUniquePageName};

