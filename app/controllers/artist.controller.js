const db = require("../models");
const Artist = db.artists;
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

  const artist = {
    full_name: req.body.full_name,
    age: req.body.age,
    genre: req.body.genre,
    impresario: req.body.impresario
  };

  // Save students in the database
  Artist.create(artist)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the artist."
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
    {genre: { [Op.like]: '%' + searchWord + '%'} },
    {impresario: { [Op.like]: '%' + searchWord + '%' } }
  ]
  } : null;


  Artist.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving artists."
      });
    });
};

// Find a single students with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  console.log(id);
  Artist.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Artist with id=" + id
      });
    });
};

// Update a students by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  console.log(id);

  Artist.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Artist was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Artist with id=${id}. Maybe Artist was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Artist with id=" + id
      });
    });
};

// Delete a students with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  console.log(id);
  Artist.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Artist was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Artist with id=${id}. Maybe Artist was not found!`
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
  Artist.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Artist were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Artists"
      });
    });
};

// find all published students
exports.findAllPublished = (req, res) => {
  Artist.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Artists."
      });
    });
};
