module.exports = (sequelize, Sequelize) => {
  const { DataTypes } = require("sequelize");
  const UserRole  = sequelize.define('role',   
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    role:{type:Sequelize.STRING}
    
  }
  );
  return UserRole;
}
