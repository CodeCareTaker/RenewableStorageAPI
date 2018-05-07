const db = require("../models");

exports.createComment = async function(req, res, next) {
  try {
    let comment = await db.Comment.create({
      text: req.body.text,
      blog: req.blog._id,
      user: req.user._id
    });
    let foundBlog = await db.Blog.findById
    foundBlog.comments.push(comment.id);
    await foundBlog.save();

    let foundUser = await db.User.findById(req.params.id);
    foundUser.comments.push(message.id);
    await foundUser.save();
    let foundUserComment = db.Comment.findById(comment._id).populate("user", {
      username: true
    });

    return res.status(200).json(foundComment);
  }
}

exports.getComment = async function(req, res, next) {
  try {
  	let comment = await db.Comment.find(req.params.id);
  	return res.status(200).json(comment);
  } catch (err) {
  	return next(err);
  }
}

exports.deleteComment = async function(req, res, next) {
  try{
    let foundComment = await db.Comment.findById(req.params.comment_id);
    await foundComment.remove();
    return res.status(200).json(foundComment);
  } catch (err) {
  	return next(err);
  }

}