const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const blogRoutes = require("./routes/blogs");
const commentRoutes = require("./routes/comments");
const userRoutes = require("./routes/users");

app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(cors());
app.use("/api/blogs", blogRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/users", userRoutes);

//PASSPORT CONFIGURATION
app.use(require("express-session")({
  secret:"What's going on?",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.user(function(req, res, next){
  res.locals.currentUser = req.user;
  next();
});

//404 handler
app.use(function(req, res, next) {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next {
  res.status(err.status || 500);
  res.send({
  	message: err.message,
  	error: err
  });
});