const express    = require("express");
const router     = express.Router();
const Blog       = require("../models/blog");

const { createBlog, getBlog, updateBlog, deleteBlog } = require("../handlers/blogs")

router.route("/").post(createBlog)

router
  .route("/:blog")
  .get(getBlog)
  .put(updateBlog)
  .delete(deleteBlog);
module.exports = router;