const { HomeModel, validateHome } = require("../models/homeContent");
const { Section1Model } = require("../models/section1");
const { Section2Model } = require("../models/section1");



const postHome = async (req, res) => {
  console.log('success' ,1234);
  const error = await validateHome(req.body);
  console.log('error123', error);
  if (error.message){
    res.status(400).send(error.message)
  } 

  const homeModel = new HomeModel({
    name: req.body.name,
    section1: [],
    section2: []
  });

  homeModel.save().then((err,data) => {
      if (err) {
          res.send(err);
      }
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send({"status": error});
    });
};

const updateHome = async (req, res) => {
  Section1Model.findOneAndUpdate({ _id: req.params.sectionId}, req.body, { new: true }, (err, data) => {
    if (err) {
        res.send(err);
    }
    res.json(data);
});
    HomeModel.findOneAndUpdate({ _id: req.params.id}, req.body, { new: true }, (err, data) => {
        if (err) {
            res.send(err);
        }
        res.json(data);
    });
};



const getHome = (req,res) => {
  HomeModel.find({}, (err, data) => {
        if (err) {
            res.send(err);
        }
        res.json(data);
    });
};

 const getHomeWithID = (req, res) => {
  HomeModel.findById(req.params.id, (err, data) => {
      if (err) {
          res.send(err);
      }
      res.json(data);
  });
};

module.exports = {getHome, getHomeWithID, postHome, updateHome};


