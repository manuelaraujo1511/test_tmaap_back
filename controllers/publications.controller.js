const db = require("../models");
const Role = db.roles;
const Users = db.users;
const State = db.state_publi;
const Comment = db.comments;
const Publications = db.publications;
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
  State.findOne({
    where: {state: req.body.state}
  }).then(state => {
    if (state == null){
      return res.status(500).send({ message: "State don't exist" });
    }

    // Create a User
    const publi = {
      content: req.body.content,
      createBy: req.body.createBy,
      updateBy: req.body.updateBy,
      id_state: state.id,
      
    };

    // Save Tutorial in the database
    Publications.create(publi)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Publications."
        });
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Publications."
      });
    });
};

exports.findAll = (req, res) => {

  Publications.findAll({
    include: [
      {model:Users, as: "created_by"},
      {model:Users, as: "updated_by"},
      {model:State, as: "state"},
      {model:Comment, as: 'comments'}
    ],
  }).then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving Publications."
    });
  });
  
};

exports.findAllApproved = (req, res) => {

  Publications.findAll({
    include: [
      {model:Users, as: "created_by"},
      {model:Users, as: "updated_by"},
      {model:State, as: "state",
      where: {state: "approved"}},
      {model:Comment, as: 'comments'}
    ],
  }).then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving Publications."
    });
  });
  
};

// Find a single User with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Publications.findByPk(
    id,
    {
      include: [
        {model:Users, as: "created_by"},
        {model:Users, as: "updated_by"},
        {model:State, as: "state"},
        {model:Comment, as: 'comments'}
      ],
    }
  ).then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message: "Error retrieving Publications with id=" + id
    });
  });
};

// Update a User by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  State.findOne({
    where: {state: req.body.state}
  }).then(state => {
    if (state == null){
      return res.status(500).send({ message: "State don't exist" });
    }
    req.body['id_state'] = state.id
    Publications.update(req.body, {
      where: { id: id }
    }).then(num => {
      console.log("num")
      console.log(num)
      if (num == 1) {
        res.send({
          message: "Publications was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Publications with id=${id}.`
        });
      }
    }).catch(err => {
      res.status(500).send({
        message: "Error updating User with id=" + id
      });
    });
  }).catch(err => {
    res.status(500).send({
      message: "Error get State "
    });
  });
  
};


exports.createState =(req, res) => {

  // Create a User
  const state = {
    role: req.body.role,
    
  };

  // Save Tutorial in the database
  State.create(state)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Publications."
      });
    });

};