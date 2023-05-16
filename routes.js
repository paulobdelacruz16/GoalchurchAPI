const { getSection1, postSection1,getSection1WithID,updateSection1,deleteSection1  } = require("./src/controllers/Section1Controller");
const { getSection2, postSection2,getSection2WithID,updateSection2,deleteSection2  } = require("./src/controllers/Section2Controller");

const { postloginCredential, getloginCredential, updateloginCredential, getloginCredentialWithID, deleteloginCredential, findByloginCredential  } = require("./src/controllers/LoginCredential");

const { getHome,getHomeWithID,postHome,updateHome  } = require("./src/controllers/HomeController");

const routes = (app) => {
  app.route('/api/section1')
  .get((req,res, next) => {
      console.log(`Request from: ${req.originalUrl}`)
      console.log(`Request type: ${req.method}`)
      next();  
  }, getSection1)
  .post(postSection1);

  app.route('/api/section1/:sectionId')
  .get((req,res, next) => {
      console.log(`Request from: ${req.originalUrl}`)
      console.log(`Request type: ${req.method}`)
      next();  
  }, getSection1WithID)
  .put(updateSection1)
  .delete(deleteSection1);

  app.route('/api/loginCredential')
  .get((req,res, next) => {
      console.log(`Request from: ${req.originalUrl}`)
      console.log(`Request type: ${req.method}`)
      next();  
  }, getloginCredential)
  .post(postloginCredential);

  app.route('/api/findByloginCredential').post(findByloginCredential);

  app.route('/api/loginCredential/:credentialId')
  .get((req,res, next) => {
      console.log(`Request from: ${req.originalUrl}`)
      console.log(`Request type: ${req.method}`)
      next();  
  }, getloginCredentialWithID)
  .put(updateloginCredential)
  .delete(deleteloginCredential);


  app.route('/api/section2')
  .get((req,res, next) => {
      console.log(`Request from: ${req.originalUrl}`)
      console.log(`Request type: ${req.method}`)
      next();  
  }, getSection2)
  .post(postSection2);

  app.route('/api/section2/:sectionId')
  .get((req,res, next) => {
      console.log(`Request from: ${req.originalUrl}`)
      console.log(`Request type: ${req.method}`)
      next();  
  }, getSection2WithID)
  .put(updateSection2)
  .delete(deleteSection2);

  app.route('/api/home')
  .get((req,res, next) => {
      console.log(`Request from: ${req.originalUrl}`)
      console.log(`Request type: ${req.method}`)
      next();  
  }, getHome)
  .post(postHome);

  app.route('/api/home/:id')
  .get((req,res, next) => {
      console.log(`Request from: ${req.originalUrl}`)
      console.log(`Request type: ${req.method}`)
      next();  
  }, getHomeWithID)
  .put(updateHome)
}

module.exports = {routes};