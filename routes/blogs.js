var express    = require("express");
var router     = express.Router();
var Blog       = require("../models/blog");

//INDEX - show all blogs in descending(latest) order. Default option
router.get("/", function(req, res, next){
    //Get all blogs from DB
  Blog.find().sort({created: -1})
    .then(blogs => res.send(blogs))
    .catch(err => next(err));
});

//INDEX - show all blogs in ascending(oldest) order
router.get("Asc/", function(req, res, next){
  //Get all blogs from DB
  Blog.find().sort({created: 1})
    .then(blogs => res.send(blogs))
    .catch(err => next(err));
});

//INDEX - Sort all blogs by A-Z
router.get("Alpha/", function(req, res, next){
  //Get all blogs from DB
  Blog.find().sort({title: 1})
    .then(blogs => res.send(blogs))
    .catch(err => next(err));
});

//INDEX - Sort blogs by Z-A
router.get("AlphaDesc/", function(req, res, next){
  //Get all blogs from DB
  Blog.find().sort({title: -1})
    .then(blogs => res.send(blogs))
    .catch(err => next(err));
});

//CREATE - Add new blog to database
router.post("/", function(req, res, next){
    // get data from form and add to blogs array
    var title = req.body.title;
    var image = req.body.image;
    var content  = req.body.content;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newBlog = {title: title, image: image, content: content, author: author};
    // Create a new blog and save to DB
    Blog.create(newBlog)
      .then(newBlog => res.status(201),send(newBlog))
      .catch(err => next(err));
});

//SHOW - Show a blog entry
router.get("/:id", function(req, res, next) {
  //find the blog with provided ID
  Blog.findById(req.params.id).populate("comments")
    .then(blog => res.send(blog))
    .catch(err => next(err));
});

//Delete a blog entry
router.delete("/:id", function(req, res, next) {
  //remove blog entry from the website
  Blog.findByIdAndRemove(req.params.id)
    .then(blog => res.send(blog))
    .catch(err => next(err));
});

module.exports = router;