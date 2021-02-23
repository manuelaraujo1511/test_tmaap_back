const comment_ctrl = require("../controllers/comments.controller.js");
const { authJwt } = require("../middleware");

module.exports = app => {

  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Retrieve all Comments
  app.get("/api/comments", [authJwt.verifyToken], comment_ctrl.findAll);
  
  // Retrieve Create  Comments
  app.post("/api/comments", [authJwt.verifyToken], comment_ctrl.create);

  // Retrieve a single Comments with id
  app.get("/api/comments/:id", [authJwt.verifyToken], comment_ctrl.findOne);

};