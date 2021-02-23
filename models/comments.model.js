module.exports = (sequelize, Sequelize) => {
  const { DataTypes } = require("sequelize");
  const Comments = sequelize.define("comment", {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    content: {
      type: Sequelize.TEXT
    },
    id_publication: {
      type: DataTypes.UUID,
    },
    createBy: {
      type: DataTypes.UUID,
    }
  });

  return Comments;
};