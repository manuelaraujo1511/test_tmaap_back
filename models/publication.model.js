module.exports = (sequelize, Sequelize) => {
  const { DataTypes } = require("sequelize");
  const Publications = sequelize.define("publication", {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    content: {
      type: Sequelize.TEXT
    },
    createBy: {
      type: DataTypes.UUID,
    },
    updateBy: {
      type: DataTypes.UUID,
    },
    id_state: {
      type: DataTypes.UUID,
    }
  });

  return Publications;
};