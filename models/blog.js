const mongoose = require("mongoose");
const User = require("./user");
const Comment = require("./comment");

//SCHEMA SETUP
const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, maxLength: 60 },
    blogImage: { type: String, required: true },
    content: { type: String, required: true, maxLength: 10000 },
    user: 
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
  },
  {
    timestamps: true
  }
);

blogSchema.pre('remove', async function(next) {
    try{
      //find a user
      let user = await.User.findById(this.userId)
      //remove the blog id from their list of blog entries
      user.blogs.remove(this.id);
      //save that user
      await user.save();
      //return next
      return next();
    } catch (err) {
      return next(err);
    }

});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;