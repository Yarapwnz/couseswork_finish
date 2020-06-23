const db = require("../models");
const Event = db.events;
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

  const event = {
    name: req.body.name,
    date: req.body.date,
    philharmonic: req.body.philharmonic,
    artist: req.body.artist,
    impresario: req.body.impresario
  };

  // Save students in the database
  Event.create(event)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the event."
      });
    });
};

// Retrieve all studentss from the database.
exports.findAll = (req, res) => {
  const searchWord = req.query.searchWord;
  var condition = searchWord ? {
    [Op.or]: [
    {name: { [Op.like]: '%' + searchWord + '%'} },
    {date: { [Op.like]: '%' + searchWord + '%' } },
    {philharmonic: { [Op.like]: '%' + searchWord + '%'} },
    {artist: { [Op.like]: '%' + searchWord + '%' } },
    {impresario: { [Op.like]: '%' + searchWord + '%' } }
  ]
  } : null;


  Event.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving events."
      });
    });
};

// Find a single students with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  console.log(id);
  Event.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Event with id=" + id
      });
    });
};

// Update a students by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  console.log(id);

  Event.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Event was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Event with id=${id}. Maybe Event was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Event with id=" + id
      });
    });
};

// Delete a students with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  console.log(id);
  Event.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Event was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Event with id=${id}. Maybe Event was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Event with id=" + id
      });
    });
};

// Delete all studentss from the database.
exports.deleteAll = (req, res) => {
  Event.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Event were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Events"
      });
    });
};

// find all published students
exports.findAllPublished = (req, res) => {
  Event.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Events."
      });
    });
};
