const mongoose = require("mongoose");
const connect = async () => {
  mongoose
    .connect("mongodb://localhost:27017/job-portal")
    .then(() => {
      console.log("Database connected");
    })
    .catch((err) => {
      console.log(err);
    });
};
module.exports = connect;
