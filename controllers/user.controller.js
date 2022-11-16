const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;
var bcrypt = require("bcryptjs");

exports.create = (req, res) => {
    res.render('create', {error: ''});
}

exports.home = (req, res) => {
    res.render('index')
}

exports.findAll = (req, res) => {
    const fname = req.query.fname;
    var check = fname ? { fname: { [Op.like]: `%${fname}%` } } : null;

    User.findAll({ where: check })
        .then(data => {
            console.log(data);
            res.render('list', {users: data || []});
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        });
};

exports.createUser = (req, res) => {
    if (!req.body.mobile) {
        res.render('create', {error: "Content can not be empty!"})
        return;
    }
    const user = {
        fname: req.body.fname,
        lname: req.body.lname,
        mobile: req.body.mobile,
        user_name: req.body.user_name,
        password: bcrypt.hashSync(req.body.password, 8)

    };
    User.create(user)
        .then(data => {
            res.render('index')
        })
        .catch(err => {
            res.render('create', {error: err.message || "Error!"})
        });
};
