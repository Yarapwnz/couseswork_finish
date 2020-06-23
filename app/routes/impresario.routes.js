module.exports = app => {
  const impresarios = require("../controllers/impresario.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", impresarios.create);

  // Retrieve all Tutorials
  router.get("/", impresarios.findAll);

  // Retrieve all published Tutorials
  router.get("/published", impresarios.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/:id", impresarios.findOne);

  // Update a Tutorial with id
  router.put("/:id", impresarios.update);

  // Delete a Tutorial with id
  router.delete("/:id", impresarios.delete);

  // Create a new Tutorial
  router.delete("/", impresarios.deleteAll);

  app.use('/impresarios', router);
};
