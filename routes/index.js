var express  = require("express"),
    router   = express.Router(),
    passport = require("passport"),
    User     = require("../models/user");


// ===================
// AUTH ROUTES
// ===================

//handling user sign up
router.post("/register", function(req, res) {
    req.body.username;
    req.body.password;
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password)
      .then(todo => res.status(201).send(todo))
      .catch(err => next(err));
});

module.exports = router;