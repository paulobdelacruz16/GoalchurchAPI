const {
PageContentModel
} = require("../models/pageContent");
const { validatePageContent  } = require("../validation/PageContentValidate");
const postDynamicPage = async (req, res) => {
  console.log("req.body", req.body);
  const error = await validatePageContent(req.body);
  if (error.message){
    res.status(400).send(error.message)
  }

  const selectedModel = new PageContentModel({
    section1: req.body.section1
  });

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

module.exports = { postDynamicPage,getDynamicpage,deleteDynamicpageWithID,getByPageName, updateDynamicPage};

