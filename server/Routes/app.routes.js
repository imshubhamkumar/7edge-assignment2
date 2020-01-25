const express = require("express");
const passport = require("passport");
const router = express.Router();
const Users = require("../Model/user.module");

router.post("/login", function(req, res, next) {
  passport.authenticate("local",(err, user, info)=> {
    if (err) { return res.status(501).json(err); }
    if (!user) { return res.status(501).json(info); }
    req.logIn(user, function(err) {
      if (err) { return res.status(501).json(err); }
      return res.status(200).json({message:'Login Success'});
    });
  })(req, res, next);
});

router.get("/all", async function(req, res, next) {
  try {
    const user = await Users.find();
    res.send(user);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
