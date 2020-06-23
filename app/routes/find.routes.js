module.exports = app => {
  const finds = require("../controllers/find.search.controller.js");

  var router = require("express").Router();

  router.get("/", finds.findAll);


  app.use('/find', router);
};
