const db = require("../models");
const Users = db.users;
const Publications = db.publications;
const Comments = db.comments;
const Op = db.Sequelize.Op;
// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body.content) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a User
  const comment = {
    content: req.body.content,
    id_publication: req.body.id_publication,
    createBy: req.body.createBy
    
  };

  // Save Tutorial in the database
  Comments.create(comment)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Comments."
      });
    });
};

exports.findAll = (req, res) => {

  Comments.findAll({
    include: [Users, Publications]
  }).then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving Comments."
    });
  });
  
};

// Find a single User with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Comments.findByPk(
    id,
    {
      include: [Users, Publications]
    }
  ).then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message: "Error retrieving Publications with id=" + id
    });
  });
};

