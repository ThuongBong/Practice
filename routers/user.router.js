const users = require("../controllers/user.controller");

module.exports = app => {
    const users = require("../controllers/user.controller");

    var router = require("express").Router();

    router.post("/createUser", users.createUser);

    router.get("/", users.home);

    router.get('/create', users.create);

    router.get('/list', users.findAll)

    app.use('/api/users', router);
}