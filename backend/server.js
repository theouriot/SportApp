require('dotenv').config({path:'./config/.env'})
require('./config/db')
const express = require("express")
const cors = require('cors')
const app = express();
const port = process.env.PORT || 3333;

app.use(cors());

/* Routes call*/
const clientRoute = require("./routes/ClientRoute");
const coachRoute = require("./routes/CoachRoute");
const articleRoute = require("./routes/ArticleRoute");
const authentificationRoute = require("./routes/AuthentificationRoute");
const stepRoute = require("./routes/StepRoute")
const programRoute = require("./routes/ProgramRoute")
const programCatRoute = require("./routes/ProgramCatRoute")
const commentRoute = require("./routes/CommentRoute")

/* Routes */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/coach", coachRoute)
app.use("/client", clientRoute)
app.use("/signup", authentificationRoute)
app.use("/article", articleRoute)
app.use("/program", programRoute)
app.use("/step", stepRoute)
app.use("/programCat", programCatRoute)
app.use("/comment", commentRoute)

/* Server */
app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${port}`);
})