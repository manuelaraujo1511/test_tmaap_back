const users = require("../controllers/user.controller.js");
const { authJwt } = require("../middleware");

module.exports = app => {

  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Retrieve all Users
  app.get("/api/users", [authJwt.verifyToken], users.findAll);
  
   // Retrieve a single user with id and publications
  app.get("/api/users/publications/:id", [authJwt.verifyToken], users.findOneAndPublish);
  
  // Retrieve all users with id and publications
  app.get("/api/users/publications", [authJwt.verifyToken], users.findAllAndPublish);
  

  // Retrieve a single user with id
  app.get("/api/users/:id", users.findOne);

  // Update a user with id
  app.put("/api/users/:id", users.update);

  // Delete a user with id
  app.delete("/api/users/:id", users.delete);

  // Delete all users
  app.delete("/api/users", users.deleteAll);
};