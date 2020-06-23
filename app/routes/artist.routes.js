module.exports = app => {
  const artists = require("../controllers/artist.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", artists.create);

  // Retrieve all Tutorials
  router.get("/", artists.findAll);

  // Retrieve all published Tutorials
  router.get("/published", artists.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/:id", artists.findOne);

  // Update a Tutorial with id
  router.put("/:id", artists.update);

  // Delete a Tutorial with id
  router.delete("/:id", artists.delete);

  // Create a new Tutorial
  router.delete("/", artists.deleteAll);

  app.use('/artists', router);
};
