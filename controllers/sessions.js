const express = require("express");
const User = require("../models/users");
const router = express.Router();
const bcrypt = require("bcrypt");

router.post("/", (req, res) => {
  User.findOne({ name: req.body.username }, (err, foundUser) => {
    if (err) {
      console.log(err);
      res.send("Oopps our database is having some connection issues.");
    } else if (!foundUser) {
      res.send("<a href='/'>No such user found!</a>");
    } else {
      if (bcrypt.compareSync(req.body.password, foundUser.password)) {
        req.session.currentUser = foundUser;
        res.redirect("/");
      } else {
        res.send("<a href='/'>Passwords do not match!</a>");
      }
    }
  });
});

router.delete("/", (req, res) => {
    req.session.destroy(() => {
      res.redirect("/");
    });
  });

module.exports = router;

//Not sure how to connect sessions.js to /login. Do the names need to be the same or can I just point the frontend React URL to this api/sessions?