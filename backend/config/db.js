const mongoose = require("mongoose");

mongoose
    .connect("mongodb+srv://" + process.env.DB_LOGIN_PASSWORD + "@cluster0.683xq.mongodb.net/sportapp")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Failed to connect to MongoDB", err));
