const { HomeModel} = require("../models/homeContent");
const { Section1Model } = require("../models/section1");
const { Section2Model } = require("../models/section1");

// validateHome
const { validateHome } = require("../validation/HomeValidate")



const postHome = async (req, res) => {
  const error = await validateHome(req.body);
  if (error.message){
    res.status(400).send(error.message)
  } 

  const homeModel = new HomeModel({
    section1: req.body.section1,
    section2: req.body.section2,
    section3: req.body.section3,
    section4: req.body.section4,
    section5: req.body.section5,
    section6: req.body.section6
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
        res.json(data[0]);
    }).sort({ _id: 'desc' }) ;
};

 const getHomeWithID = (req, res) => {
  HomeModel.findById(req.params.id, (err, data) => {
      if (err) {
          res.send(err);
      }
      res.json(data);
  });
};

const deleteHomeWithID = (req, res) => {
  HomeModel.remove({ _id: req.params.id }, (err) => {
    if (err) {
        res.send(err);
    }
    res.json({ message: 'Successfully deleted Data'});
});
};

module.exports = {getHome, getHomeWithID, postHome, updateHome, deleteHomeWithID};


