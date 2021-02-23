module.exports = (sequelize, Sequelize) => {
  const { DataTypes } = require("sequelize");
  const SatatePubli = sequelize.define("state_publication", {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    state: {
      type: Sequelize.STRING
    }
  });

  return SatatePubli;
};