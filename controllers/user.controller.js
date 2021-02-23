const db = require("../models");
const roleModel = db.roles;
const Users = db.users;
const Publications = db.publications;
const State = db.state_publi;
const Op = db.Sequelize.Op;

// Retrieve all Users from the database.
exports.findAll = (req, res) => {

  Users.findAll({
    include: roleModel
  }).then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving users."
    });
  });
  
};

// Find a single User with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Users.findByPk(
    id,
    {
      include: roleModel
    }
  ).then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message: "Error retrieving User with id=" + id,
      error: err
    });
  });
};

// Find a single User with an id and publications
exports.findOneAndPublish = (req, res) => {
  const id = req.params.id;
  Users.findByPk(
    id,
    {
      include: [
        {
          model:Publications,
          as: "publications",
          include : [
            {model:State, as: "state"},
            {model:Users, as: "updated_by"},
          ]
        },
        {model:roleModel}
      ],
    }
  ).then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message: "Error retrieving User with id=" + id
    });
  });
};

// Find all User with an id and publications
exports.findAllAndPublish = (req, res) => {
  const id = req.params.id;
  Users.findAll(
    {
      include: [
        {
          model:Publications,
          as: "publications",
          include : [
            {
              model:State,
              as: "state",
              where : {state: "pending"}
            },
            {model:Users, as: "updated_by"},
          ]
        },
        {model:roleModel}
      ],
    }
  ).then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message: "Error retrieving User with id=" + id
    });
  });
};

// Update a User by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Users.update(req.body, {
    where: { id: id }
  })
  .then(num => {
    if (num == 1) {
      res.send({
        message: "User was updated successfully."
      });
    } else {
      res.send({
        message: `Cannot update User with id=${id}. Maybe Tutorial was not found or req.body is empty!`
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Error updating User with id=" + id
    });
  });
  
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Users.destroy({
    where: { id: id }
  }).then(num => {
    if (num == 1) {
      res.send({
        message: "User was deleted successfully!"
      });
    } else {
      res.send({
        message: `Cannot delete User with id=${id}. Maybe Tutorial was not found!`
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Could not delete User with id=" + id
    });
  });
  
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
  Users.destroy({
    where: {},
    truncate: false
  }).then(nums => {
    res.send({ message: `${nums} Users were deleted successfully!` });
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while removing all tutorials."
    });
  });
  
};
