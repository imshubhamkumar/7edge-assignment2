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

router.post("/addUser", (req, res, next) => {
  const user = new Users({
    name: req.body.name,
    email: req.body.email,
    pass: req.body.pass,
    eid: req.body.eid,
    dob: req.body.dob,
  });

  user
    .save()
    .then(result => {
      console.log(result);
      res.send(result);
    })
    .catch(err => {
      console.log(err.message);
    });
});

router.get('/user',isValidUser,function(req,res,next){
  return res.status(200).json(req.user);
});

router.get('/logout',isValidUser, function(req,res,next){
  req.logout();
  return res.status(200).json({message:'Logout Success'});
})

function isValidUser(req,res,next){
  if(req.isAuthenticated()) next();
  else return res.status(401).json({message:'Unauthorized Request'});
}

router.get("/all", async function(req, res, next) {
  try {
    const user = await Users.find();
    res.send(user);
  } catch (err) {
    console.log(err);
  }
});

router.get("/:id", async function(req,res,next) {
  const id = req.params.id;
  try {
    const user = await Users.findById(id);
    res.send(user);
    
  } catch (error) {
    console.log(error.message);
  }
})

router.get("/child/:mid", async function(req,res,next) {
  const mid = req.params.mid;
  try {
    const user = await Users.find({eid: mid},{});
    res.send(user);
    
  } catch (error) {
    console.log(error.message);
  }
})


module.exports = router;
