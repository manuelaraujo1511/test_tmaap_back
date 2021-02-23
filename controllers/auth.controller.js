const db = require("../models");
const config = require("../config/auth.config");

const firebase = require("firebase");
const User = db.users;
const Role = db.roles;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  if (req.body.role) {
    Role.findOne({
      where: {role: req.body.role}
    }).then(roles => {
      // Save User to Database
      if (roles == null){
        return res.status(500).send({ message: "Role don't exist" });
      }
      User.create({
        username: req.body.username,
        email: req.body.email,
        name: req.body.name,
        lastname: req.body.lastname,
        password: bcrypt.hashSync(req.body.password, 8),
        id_role: roles.id
      }).then(user => {
        // Resgister user in Firebase   
        firebase.auth().createUserWithEmailAndPassword(req.body.email, req.body.password)
        .then((userG) => {
          res.send({ message: "User was registered successfully!" });
        }).catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          res.status(500).send({ code: errorCode, message: errorMessage });
        });          
      }).catch(err => {
        res.status(500).send({ message: err.message });
      });
      
    }).catch(err => {
      res.status(500).send({ message: err.message });
    });
  } else {
    res.status(500).send({ message: "please select at role" });      
  }
  
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  }).then(user => {
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    var passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!"
      });
    }

    var token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400 // 24 hours
    });
    Role.findByPk(
      user.id_role
    ).then(role => {
      // Login in Firebase
      firebase.auth().signInWithEmailAndPassword(user.email, req.body.password)
      .then((userG) => {
        res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
          role: role.role,
          accessToken: token
        });
      }).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        res.status(500).send({ code: errorCode, message: errorMessage });
      });      
    })
  }).catch(err => {
    res.status(500).send({ message: err.message });
  });
};


exports.signinAny = (req, res) => {
  firebase.auth().signInAnonymously()
  .then(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        Role.findOne({
          where: {role: "anonymous"}
        }).then(role => {
          var token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400 // 24 hours
          });
          User.create({
            id: user.id,
            name: "anonymous",
            id_role: role.id
          }).then(user => {        
            res.status(200).send({
              id: user.id,
              username: user.username,
              email: user.email,
              role: role.role,
              accessToken: token
            })
          }).catch(err => {
            res.status(500).send({ message: err.message });
          });
          
        })
        
        // ...
      } else {
        res.status(500).send({ message: "User no loging" })
      }
    });
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    res.status(500).send({ code: errorCode, message: errorMessage });
  });
};

exports.logOut = (req, res) => {
  firebase.auth().signOut().then((data) => {
    res.status(200).send({message: "Logout user successfully"})
  }).catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    res.status(500).send({ code: errorCode, message: errorMessage });
  });
}
