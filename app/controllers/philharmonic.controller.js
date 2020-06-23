const db = require("../models");
const Philharmonic = db.philharmonics;
const Op = db.Sequelize.Op;

// Create and Save a new students
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const philharmonic = {
    name: req.body.name,
    type: req.body.type,
    address: req.body.address,
    characteristics: req.body.characteristics
  };

  // Save students in the database
  Philharmonic.create(philharmonic)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the philharmonic."
      });
    });
};

// Retrieve all studentss from the database.
exports.findAll = (req, res) => {
  const searchWord = req.query.searchWord;
  var condition = searchWord ? { 
    [Op.or]: [
    {name: { [Op.like]: '%' + searchWord + '%'} },
    {type: { [Op.like]: '%' + searchWord + '%' } },
    {address: { [Op.like]: '%' + searchWord + '%'} },
    {characteristics: { [Op.like]: '%' + searchWord + '%'} }
    ]
  } : null;


  Philharmonic.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Philharmonics."
      });
    });
};

// Find a single students with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  console.log(id);
  Philharmonic.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Philharmonic with id=" + id
      });
    });
};

// Update a students by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  console.log(id);

  Philharmonic.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Philharmonic was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Philharmonic with id=${id}. Maybe cafedras was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Philharmonic with id=" + id
      });
    });
};

// Delete a students with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  console.log(id);
  Philharmonic.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Philharmonic was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Philharmonic with id=${id}. Maybe Philharmonic was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Philharmonic with id=" + id
      });
    });
};

// Delete all studentss from the database.
exports.deleteAll = (req, res) => {
  Philharmonic.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Philharmonics were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Philharmonics"
      });
    });
};

// find all published students
exports.findAllPublished = (req, res) => {
  Philharmonic.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Philharmonics."
      });
    });
};
