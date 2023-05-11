require("dotenv").config();

const dev = {
  app: {
    port: process.env.PORT || 6201,
  },
  db: {
    url: process.env.DB_URL || "mongodb://localhost:27017/teamCreator",
  },
};
module.exports = dev;
