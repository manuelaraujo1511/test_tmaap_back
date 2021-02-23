const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// const db = require("./models");
// db.sequelize.sync();

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Test TMaap application." });
});

require("./routers/user.routers")(app);
require("./routers/auth.routers")(app);
require("./routers/publication.routers")(app);
require("./routers/comment.routers")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});