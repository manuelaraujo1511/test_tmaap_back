const { verifySignUp } = require("../middleware");
const auth_ctrl = require("../controllers/auth.controller");


module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail
    ],
    auth_ctrl.signup
  );

  app.post("/api/auth/signin", auth_ctrl.signin);
  
  app.post("/api/auth/signin-any", auth_ctrl.signinAny);
  app.post("/api/auth/logout", auth_ctrl.logOut);
};