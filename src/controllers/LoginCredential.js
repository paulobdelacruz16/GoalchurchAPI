const { loginCredentialModel, validateloginCredential } = require("../models/loginCredential");

const postloginCredential= async (req, res) => {
  console.log('postloginCredential', req.body);
    const error = await validateloginCredential(req.body);
    console.log('error123', error);
    if (error.message){
      res.status(400).send(error.message)
    } 

    console.log('go here3222', ); 
    const newloginCredentialModel = new loginCredentialModel({
      username: req.body.username,
      password: req.body.password
    });

    console.log('go here', newloginCredentialModel);
    newloginCredentialModel.save().then((err,data) => {
        if (err) {
            res.send(err);
        }
        res.send(data);
      })
      .catch((error) => {
        res.status(500).send("loginCredential was not stored in DB", error);
      });
};

const getloginCredential = (req,res) => {
    loginCredentialModel.find({}, (err, data) => {
        if (err) {
            res.send(err);
        }
        res.json(data);
    });
};

 const getloginCredentialWithID = (req, res) => {
  loginCredentialModel.findById(req.params.credentialId, (err, data) => {
      if (err) {
          res.send(err);
      }
      res.json(data);
  });
};

 const updateloginCredential = (req, res) => {
  loginCredentialModel.findOneAndUpdate({ _id: req.params.credentialId}, req.body, { new: true }, (err, data) => {
      if (err) {
          res.send(err);
      }
      res.json(data);
  });
};

  const deleteloginCredential = (req, res) => {
    loginCredentialModel.remove({ _id: req.params.credentialId }, (err) => {
      if (err) {
          res.send(err);
      }
      res.json({ message: 'Successfully deleted Data'});
  });
};

const findByloginCredential = (req,res) => {
    loginCredentialModel.find({username: req.body.username, password: req.body.password}, (err, data) => { 
        if (err) {
            res.send(err);
        }
        res.status(200).send({'message': data});

    });
};

module.exports = {postloginCredential, getloginCredential, updateloginCredential, getloginCredentialWithID, deleteloginCredential, findByloginCredential};

