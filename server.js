const express = require("express");
const cors = require("cors");

const app = express();
const db = require("./models");

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
app.set('view engine', 'ejs');
app.use('views', express.static('views'))

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Hello World" });
});
require('./routers/user.router.js')(app);

db.sequelize.sync();

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});