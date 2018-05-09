const express    = require("express");
const router     = express.Router();
const Comment       = require("../models/comment");

const { createComment, getComment, updateComment, deleteComment } = require("../handlers/blogs");

router.route("/").post(createBlog)

router
  .route("/:comment")
  .get(getComment)
  .put(updateComment)
  .delete(deleteComment);
module.exports = router;