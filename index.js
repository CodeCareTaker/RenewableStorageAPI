require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const errorHandler = require("./handlers/errorHandler");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");
const blogRoutes = require("./routes/blogs");
const commentRoutes = require("./routes/comments");

const PORT = 8081;

app.use(cors());
app.use(bodyParser.json());


//all routes here
app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/blogs/:id/comments", commentRoutes);

app.get("/api/blogs", async function(req, res, next) {
  try {
  	let blogs = await db.Blog.find()
  	.sort({ createdAt: -1 })
  	.populate("comment");
  	return res.status(200).json(blogs);
  } catch (err) {
  	return next(err);
  }
});

//404 handler
app.use(function(req, res, next) {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use(errorHandler);

app.listen(PORT, function(){
  console.log(`Server is starting on port: ${PORT}`)
})