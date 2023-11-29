const { EventModel } = require("../models/eventContent");
const { validateEvents } = require("../validation/EventsValidate")

const postEvent = async (req, res) => {
  const error = await validateEvents(req.body);
  if (error.message){
    res.status(400).send(error.message)
  } 
  const selectedModel = new EventModel({
    section1: req.body.section1
  });
  selectedModel.save().then((err,data) => {
      if (err) {
          res.send(err);
      }
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send({"status": error});
    });
};

const getEvent = (req,res) => {
  EventModel.find({}, (err, data) => {
        if (err) {
            res.send(err);
        }
        res.json(data[0]);
    }).sort({ _id: 'desc' }) ;
};

const deleteEventWithID = (req, res) => {
  EventModel.remove({ _id: req.params.id }, (err) => {
    if (err) {
        res.send(err);
    }
    res.json({ message: 'Successfully deleted Data'});
});
};

module.exports = {getEvent, postEvent, deleteEventWithID};


