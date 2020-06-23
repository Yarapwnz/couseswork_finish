module.exports = app => {
  const philharmonics = require("../controllers/philharmonic.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", philharmonics.create);

  // Retrieve all Tutorials
  router.get("/", philharmonics.findAll);

  // Retrieve all published Tutorials
  router.get("/published", philharmonics.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/:id", philharmonics.findOne);

  // Update a Tutorial with id
  router.put("/:id", philharmonics.update);

  // Delete a Tutorial with id
  router.delete("/:id", philharmonics.delete);

  // Create a new Tutorial
  router.delete("/", philharmonics.deleteAll);

  app.use('/philharmonics', router);
};
