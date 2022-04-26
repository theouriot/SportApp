require('dotenv').config({path:'./config/.env'})
require('./config/db')
const express = require("express")
const cors = require('cors')
const app = express();
const port = process.env.PORT || 3333;

app.use(cors());

/* Routes call*/

const clientRoute = require("./routes/ClientRoute");
const articleRoute = require("./routes/ArticleRoute");
const authentificationRoute = require("./routes/AuthentificationRoute");

/* Routes */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/article", articleRoute)
app.use("/signin", authentificationRoute)
app.use("/client", clientRoute)

/* Server */
app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${port}`);
})