const { getSection1, postSection1,getSection1WithID,updateSection1,deleteSection1  } = require("./src/controllers/Section1Controller");

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
}

module.exports = {routes};