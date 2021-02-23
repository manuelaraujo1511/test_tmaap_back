module.exports = (sequelize, Sequelize) => {
  const { DataTypes } = require("sequelize");
  const Users = sequelize.define("user", {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    username: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    name: {
      type: Sequelize.STRING
    },
    lastname: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    id_role: {
      type: DataTypes.UUID,
    }
  });
  return Users;
};