const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const firebase = require("firebase");
const firebaseConfig = {
  apiKey: "AIzaSyABee_dCZOm7wVLH-1tGlfCLV8PxYfxdKE",
  authDomain: "firm-buffer-305323.firebaseapp.com",
  projectId: "firm-buffer-305323",
  storageBucket: "firm-buffer-305323.appspot.com",
  messagingSenderId: "929124739778",
  appId: "1:929124739778:web:5ae319ad4788f2120d295b",
  measurementId: "G-EHJ2YWJC9X"
};
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  // host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  },
  dialectOptions:{
    socketPath: `/cloudsql/${dbConfig.dialectOptions.CLOUD_SQL_CONNECTION_NAME}`
    }
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./user.model.js")(sequelize, Sequelize);
db.roles = require("./role.model.js")(sequelize, Sequelize);
db.publications = require("./publication.model.js")(sequelize, Sequelize);
db.state_publi = require("./state_publi.model.js")(sequelize, Sequelize);

db.comments = require("./comments.model.js")(sequelize, Sequelize);

// Relationships

// TBL Users
db.users.belongsTo(db.roles, {foreignKey: 'id_role'});
db.users.hasMany(db.publications, {foreignKey: 'createBy', as: 'publications'});

// TBL Publications
db.publications.belongsTo(db.users, {foreignKey: 'createBy', as: "created_by"});
db.publications.belongsTo(db.users, {foreignKey: 'updateBy', as: "updated_by"});
db.publications.belongsTo(db.state_publi, {foreignKey: 'id_state',  as: "state"});
db.publications.hasMany(db.comments, {foreignKey: 'id_publication', as: 'comments'});

// TBL Comments
db.comments.belongsTo(db.publications, {foreignKey: 'id_publication'});
db.comments.belongsTo(db.users, {foreignKey: 'createBy'});
firebase.initializeApp(firebaseConfig);
// Exports
module.exports = db;