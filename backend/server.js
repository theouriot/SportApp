require('dotenv').config({path:'./config/.env'})
require('./config/db')
const express = require("express")
const cors = require('cors')
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

/* Routes call */
const clientRoute = require("./routes/ClientRoute");
const coachRoute = require("./routes/CoachRoute");
const articleRoute = require("./routes/ArticleRoute");
const authentificationRoute = require("./routes/AuthentificationRoute");
const stepRoute = require("./routes/StepRoute")
const programRoute = require("./routes/ProgramRoute")
const programCatRoute = require("./routes/ProgramCatRoute")
const commentRoute = require("./routes/CommentRoute")
const levelRoute = require("./routes/LevelRoute")

/* Middelware call */
const clientAuthMiddelware = require("./middelware/clientAuthMiddelware")

/* Routes */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/coach", coachRoute)
app.use("/client", clientRoute)
app.use("/auth", authentificationRoute)
app.use("/article", articleRoute)
app.use("/program", programRoute)
app.use("/step", stepRoute)
app.use("/programCat", programCatRoute)
app.use("/comment", commentRoute)
app.use("/level", levelRoute)

/* Server */
app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${port}`);
})