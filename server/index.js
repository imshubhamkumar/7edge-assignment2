const express = require("express");
const mongoose = require("mongoose");


const cors = require("cors");
const app = express();
const bcrypt = require("bcrypt-node");
const passport = require("passport");
require("./passport");
const Users = require("./Model/user.module");
const AppRoutes = require('./Routes/app.routes');
const session = require('express-session');


app.use(
  cors({
    origin: ['http://localhost:4200','http://127.0.0.1:4200'],
    credentials: true
  })
);


mongoose
  .connect(
    "mongodb+srv://cluster0-ydusu.mongodb.net/test?retryWrites=true&w=majority",
    {
      dbName: "user",
      user: "myadmin",
      pass: "P@$$w0rd",
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .then(() => {
    console.log("The mongoose database is connected");
  });
  const MongoStore = require('connect-mongo')(session);
  app.use(session({
    name: "myname.sid",
    resave:false,
    saveUninitialized:false,
    secret:'secret',
    cookie:{
      maxAge:36000000,
      httpOnly:false,
      secure:false
    },
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  }));

  app.use(passport.initialize());
  app.use(passport.session());
  app.use(express.json());
  app.use("/users", AppRoutes);




//passportConfig(passport, email => Users.find(user => user.email === email));


app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(8000, () => {
  console.log("Example app listening on port 8000!");
});
