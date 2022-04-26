const mongoose = require("mongoose");

mongoose
    .connect("mongodb+srv://theo:azerty@cluster0.683xq.mongodb.net/sportapp")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Failed to connect to MongoDB", err));
