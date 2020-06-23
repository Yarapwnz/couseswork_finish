const db = require("../models");
const Impresario = db.impresarios;
const Op = db.Sequelize.Op;

// Create and Save a new students
exports.create = (req, res) => {
  // Validate request
  if (!req.body.full_name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const impresario = {
    full_name: req.body.full_name,
    age: req.body.age,
    genre: req.body.genre
  };

  // Save students in the database
  Impresario.create(impresario)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the impresario."
      });
    });
};

// Retrieve all studentss from the database.
exports.findAll = (req, res) => {
  const searchWord = req.query.searchWord;
  var condition = searchWord ? { 
    [Op.or]: [
    {full_name: { [Op.like]: '%' + searchWord + '%'} },
    {age: { [Op.like]: '%' + searchWord + '%' } },
    {genre: { [Op.like]: '%' + searchWord + '%'} }
  ]
  } : null;


  Impresario.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving impresarios."
      });
    });
};

// Find a single students with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  console.log(id);
  Impresario.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Impresario with id=" + id
      });
    });
};

// Update a students by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  console.log(id);

  Impresario.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Impresario was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Impresario with id=${id}. Maybe Impresario was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Impresario with id=" + id
      });
    });
};

// Delete a students with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  console.log(id);
  Impresario.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Impresario was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Impresario with id=${id}. Maybe Impresario was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Impresario with id=" + id
      });
    });
};

// Delete all studentss from the database.
exports.deleteAll = (req, res) => {
  Impresario.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Impresario were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Impresarios"
      });
    });
};

// find all published students
exports.findAllPublished = (req, res) => {
  Impresario.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Impresarios."
      });
    });
};
