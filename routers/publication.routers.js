const publi_ctrl = require("../controllers/publications.controller.js");
const { authJwt } = require("../middleware");

module.exports = app => {

  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Retrieve all Publication
  app.get("/api/publications", [authJwt.verifyToken], publi_ctrl.findAll);

  // Retrieve all Publication Opreoved
  app.get("/api/publications-approved", [authJwt.verifyToken], publi_ctrl.findAllApproved);
  
  // Retrieve Create  Publication
  app.post("/api/publications", [authJwt.verifyToken], publi_ctrl.create);

  // Retrieve a single Publication with id
  app.get("/api/publications/:id", [authJwt.verifyToken], publi_ctrl.findOne);

  // Update a Publication with id
  app.put("/api/publications/:id", [authJwt.verifyToken], publi_ctrl.update);

  // // Delete a Publication with id
  // app.delete("/api/publications/:id", [authJwt.verifyToken], publi_ctrl.delete);
  
  app.post("/api/state", publi_ctrl.createState);

};