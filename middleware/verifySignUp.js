const db = require("../models");
const Role = db.roles;
const User = db.users;
const Op = db.Sequelize.Op;

checkDuplicateUsernameOrEmail = (req, res, next) => {
  User.findOne({
    where: {
      
      [Op.or]: [{ username: req.body.username }, { email: req.body.email }]
    }
  }).then(user => {
    if (user) {
      res.status(400).send({
        message: "Failed! Username or Email is already in use!"
      });
      return;
    }
    next();
  });
};


const verifySignUp = {
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
};

module.exports = verifySignUp;