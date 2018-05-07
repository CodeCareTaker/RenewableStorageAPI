const db = require("../models");

exports.createBlog = async function(req, res, next) {
  try {
    let blog = await db.Blog.create({
      title: req.body.title,
      blogImage: req.body.blogImage,
	  content: req.body.content,
	  user: req.params.id
    });
    let foundUser = await db.User.findById(req.params.id);
    foundUser.blogs.push(blog.id);
    await foundUser.save()
    let foundBlog = db.Blog.findById(blog._id).populate("user", {
      username: true
    });
    return res.status(200).json(foundBlog);
  } catch (err) {
  	return next(err);
  }
};

exports.getBlog = async function(req, res, next) {
  try {
  	let blog = await db.Blog.find(req,params.blog_id);
  	return res.status(200).json(blog);
  } catch (err) {
  	return next(err);
  }
}

exports.updateBlog = async function(req, res, next) {
  try {
  	let foundBlog = await db.Blog.findByIdAndUpdate(req.params.blog_id, req.body.blog);
  	return res.status(200).json(foundBlog);
  } catch (err) {
  	return next(err);
  }
};

exports.deleteBlog = async function(req, res, next) {
  try {
  	let foundBlog = await  db.Blog.findById(req.params.id);
  	await foundBlog.remove();
  	return res.status(200).json(foundBlog);
  } catch (err) {
  	return next(err);
  }
};