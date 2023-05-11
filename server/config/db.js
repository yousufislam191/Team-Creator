const mongoose = require("mongoose");
const config = require("./config");

const dbURL = config.db.url;

mongoose
  .connect(dbURL)
  .then(() => {
    console.log("mongodb atles is connected of Team Creator");
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
