module.exports = {
  HOST: "35.239.174.115",
  USER: "maraujo",
  PASSWORD: "19200130",
  DB: "blog_db",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  dialectOptions:{
    CLOUD_SQL_CONNECTION_NAME:"firm-buffer-305323:us-central1:blog",
  }
};